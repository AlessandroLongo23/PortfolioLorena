/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import { readFile, stat } from 'node:fs/promises';
import { resolve as resolvePath, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { experiences, caseProjects, skills, timeline, type MediaBlock } from '../src/lib/data';

config();

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = 'portfolio-media';

if (!SUPABASE_URL || !SERVICE_ROLE) {
	console.error('Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
	process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
	auth: { autoRefreshToken: false, persistSession: false }
});

const ROOT = resolvePath(fileURLToPath(import.meta.url), '..', '..');
const STATIC_DIR = resolvePath(ROOT, 'static');

const MIME: Record<string, string> = {
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	webp: 'image/webp',
	gif: 'image/gif',
	svg: 'image/svg+xml',
	mp4: 'video/mp4',
	webm: 'video/webm',
	mov: 'video/quicktime'
};

let uploadCount = 0;
let recordCount = 0;

async function uploadFromStatic(staticPath: string, destPath: string): Promise<string> {
	const cleanStatic = staticPath.replace(/^\//, '');
	const absolute = resolvePath(STATIC_DIR, cleanStatic);
	try {
		await stat(absolute);
	} catch {
		console.warn(`  ! file not found, leaving path as-is: ${staticPath}`);
		return staticPath;
	}
	const buffer = await readFile(absolute);
	const ext = extname(absolute).slice(1).toLowerCase();
	const contentType = MIME[ext] ?? 'application/octet-stream';

	const { error } = await supabase.storage.from(BUCKET).upload(destPath, buffer, {
		contentType,
		upsert: true,
		cacheControl: '3600'
	});
	if (error) {
		console.error(`  upload failed for ${destPath}:`, error.message);
		throw error;
	}
	uploadCount++;
	console.log(`  ↑ ${staticPath} → ${destPath}`);
	return destPath;
}

async function seedExperiences() {
	console.log('\nSeeding experiences...');
	for (let i = 0; i < experiences.length; i++) {
		const exp = experiences[i];
		console.log(` · ${exp.slug}`);

		let logoPath: string | null = null;
		let coverPath: string | null = null;

		if (exp.logo) {
			const ext = extname(exp.logo).slice(1) || 'png';
			logoPath = await uploadFromStatic(exp.logo, `experiences/${exp.slug}/logo.${ext}`);
		}
		if (exp.coverImage) {
			const ext = extname(exp.coverImage).slice(1) || 'png';
			coverPath = await uploadFromStatic(exp.coverImage, `experiences/${exp.slug}/cover.${ext}`);
		}

		const { error } = await supabase.from('experiences').upsert(
			{
				slug: exp.slug,
				title: exp.title,
				role: exp.role,
				duration: exp.duration,
				focus: exp.focus,
				tags: exp.tags,
				visual_style: exp.visualStyle,
				brand_color: exp.brandColor,
				logo_path: logoPath,
				cover_image_path: coverPath,
				is_summary_card: exp.isSummaryCard ?? false,
				star: exp.star ?? null,
				sort_order: i
			},
			{ onConflict: 'slug' }
		);
		if (error) {
			console.error(`  insert failed:`, error.message);
			throw error;
		}
		recordCount++;
	}
}

async function uploadMediaSrc(slug: string, src: string, cache: Map<string, string>): Promise<string> {
	if (cache.has(src)) return cache.get(src)!;
	const filename = basename(src);
	const dest = `projects/${slug}/${filename}`;
	const newPath = await uploadFromStatic(src, dest);
	cache.set(src, newPath);
	return newPath;
}

async function rewriteMediaBlock(
	slug: string,
	block: MediaBlock,
	cache: Map<string, string>
): Promise<MediaBlock> {
	if (block.kind === 'gallery') {
		const images = await Promise.all(
			block.images.map(async (img) => ({
				...img,
				src: await uploadMediaSrc(slug, img.src, cache)
			}))
		);
		return { ...block, images };
	}
	const newSrc = await uploadMediaSrc(slug, block.src, cache);
	if (block.kind === 'video') {
		const poster = block.poster ? await uploadMediaSrc(slug, block.poster, cache) : undefined;
		return { ...block, src: newSrc, ...(poster ? { poster } : {}) };
	}
	return { ...block, src: newSrc };
}

async function seedCaseProjects() {
	console.log('\nSeeding case projects...');
	for (let i = 0; i < caseProjects.length; i++) {
		const proj = caseProjects[i];
		console.log(` · ${proj.slug}`);
		const cache = new Map<string, string>();

		const previewSrc = await uploadMediaSrc(proj.slug, proj.preview.src, cache);
		const preview =
			proj.preview.kind === 'video'
				? { kind: 'video' as const, src: previewSrc, ...(proj.preview.poster ? { poster: await uploadMediaSrc(proj.slug, proj.preview.poster, cache) } : {}) }
				: { kind: 'image' as const, src: previewSrc, alt: proj.preview.alt };

		const media: MediaBlock[] = [];
		for (const block of proj.media) {
			media.push(await rewriteMediaBlock(proj.slug, block, cache));
		}

		const { error } = await supabase.from('case_projects').upsert(
			{
				slug: proj.slug,
				title: proj.title,
				category: proj.category,
				year: proj.year ?? null,
				tags: proj.tags,
				brand_color: proj.brandColor,
				description: proj.description,
				preview,
				media,
				sort_order: i
			},
			{ onConflict: 'slug' }
		);
		if (error) {
			console.error(`  insert failed:`, error.message);
			throw error;
		}
		recordCount++;
	}
}

async function seedSkills() {
	console.log('\nSeeding skills...');
	// Replace strategy: simpler than case-insensitive upsert against unique(lower(name)) index
	const { error: deleteError } = await supabase.from('skills').delete().not('id', 'is', null);
	if (deleteError) throw deleteError;

	const rows = skills.map((s, i) => ({ name: s.name, category: s.category, sort_order: i }));
	const { error } = await supabase.from('skills').insert(rows);
	if (error) throw error;
	recordCount += rows.length;
	console.log(` · ${rows.length} skills inserted`);
}

async function seedTimeline() {
	console.log('\nSeeding timeline...');
	const { error: deleteError } = await supabase.from('timeline_events').delete().not('id', 'is', null);
	if (deleteError) throw deleteError;

	const rows = timeline.map((t, i) => ({
		year: t.year,
		title: t.title,
		description: t.description,
		sort_order: i
	}));
	const { error } = await supabase.from('timeline_events').insert(rows);
	if (error) throw error;
	recordCount += rows.length;
	console.log(` · ${rows.length} timeline events inserted`);
}

async function main() {
	console.log(`Seeding Supabase project: ${SUPABASE_URL}`);
	await seedExperiences();
	await seedCaseProjects();
	await seedSkills();
	await seedTimeline();
	console.log(`\nDone — ${recordCount} records, ${uploadCount} files uploaded.`);
}

main().catch((err) => {
	console.error('\nSeed failed:', err);
	process.exit(1);
});
