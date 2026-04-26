import { PUBLIC_SUPABASE_URL } from '$env/static/public';

export const MEDIA_BUCKET = 'portfolio-media';

const PUBLIC_URL_PREFIX = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/`;

/**
 * Resolves a storage path (e.g. "experiences/sapiens/logo.png") to a public URL.
 * Falls back to legacy paths for backwards compatibility during migration.
 */
export function resolveMediaUrl(path: string | null | undefined): string {
	if (!path) return '';
	if (/^https?:\/\//.test(path)) return path;
	if (path.startsWith('/')) return path; // legacy /static asset
	return PUBLIC_URL_PREFIX + path.replace(/^\/+/, '');
}

export function generateStoragePath(folder: string, filename: string): string {
	const ext = filename.includes('.') ? filename.split('.').pop()!.toLowerCase() : 'bin';
	const id = crypto.randomUUID();
	const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
	return `${cleanFolder}/${id}.${ext}`;
}
