import { experienceSchema } from '$lib/schemas/experience';
import { caseProjectSchema } from '$lib/schemas/case-project';

function parseJSON<T>(value: FormDataEntryValue | null, fallback: T): T {
	if (typeof value !== 'string' || value.trim() === '') return fallback;
	try {
		return JSON.parse(value) as T;
	} catch {
		return fallback;
	}
}

export function parseExperienceForm(formData: FormData) {
	const star = parseJSON<unknown | null>(formData.get('star'), null);
	const tags = parseJSON<string[]>(formData.get('tags'), []);
	const isSummary = String(formData.get('is_summary_card') ?? 'false') === 'true';
	const logoPath = String(formData.get('logo_path') ?? '').trim() || null;
	const coverPath = String(formData.get('cover_image_path') ?? '').trim() || null;

	return experienceSchema.safeParse({
		slug: String(formData.get('slug') ?? '').trim(),
		title: String(formData.get('title') ?? '').trim(),
		role: String(formData.get('role') ?? '').trim(),
		duration: String(formData.get('duration') ?? '').trim(),
		focus: String(formData.get('focus') ?? '').trim(),
		tags,
		visual_style: String(formData.get('visual_style') ?? ''),
		brand_color: String(formData.get('brand_color') ?? ''),
		logo_path: logoPath,
		cover_image_path: coverPath,
		is_summary_card: isSummary,
		star,
		sort_order: Number(formData.get('sort_order') ?? 0)
	});
}

export function parseCaseProjectForm(formData: FormData) {
	const tags = parseJSON<string[]>(formData.get('tags'), []);
	const preview = parseJSON(formData.get('preview'), null);
	const media = parseJSON(formData.get('media'), []);

	return caseProjectSchema.safeParse({
		slug: String(formData.get('slug') ?? '').trim(),
		title: String(formData.get('title') ?? '').trim(),
		category: String(formData.get('category') ?? '').trim(),
		year: String(formData.get('year') ?? '').trim() || null,
		tags,
		brand_color: String(formData.get('brand_color') ?? ''),
		description: String(formData.get('description') ?? '').trim(),
		preview,
		media,
		sort_order: Number(formData.get('sort_order') ?? 0)
	});
}
