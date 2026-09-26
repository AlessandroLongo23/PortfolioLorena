import { en } from './en';
import { it } from './it';

export type * from './types';
export type Content = typeof en;

export const locales = ['en', 'it'] as const;
export type Locale = (typeof locales)[number];

const byLocale: Record<Locale, Content> = { en, it };

export const getContent = (locale: Locale) => byLocale[locale];

export const siteUrl = 'https://portfolio-lorena-delta.vercel.app';

/** English lives at the root, Italian under /it. Slugs are shared. */
export const localeFromPath = (pathname: string): Locale =>
	/^\/it(\/|$)/.test(pathname) ? 'it' : 'en';

/** Prefix an internal href with the locale. Keeps hashes and query strings. */
export function localize(href: string, locale: Locale) {
	if (locale === 'en' || !href.startsWith('/')) return href;
	return href === '/' ? '/it' : href.startsWith('/#') ? `/it${href.slice(1)}` : `/it${href}`;
}

/** The same page in the other language. */
export function switchLocale(pathname: string, to: Locale) {
	const bare = pathname.replace(/^\/it(?=\/|$)/, '') || '/';
	return localize(bare, to);
}
