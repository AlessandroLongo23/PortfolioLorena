// Current-locale helpers for components. The URL decides the locale; reactive through `page`.
import { page } from '$app/state';
import { getContent, localeFromPath, localize, type Locale } from '$lib/content';

export const i18n = {
	get locale(): Locale {
		return localeFromPath(page.url.pathname);
	},
	/** Copy for the current locale. */
	get c() {
		return getContent(this.locale);
	},
	/** Internal href in the current locale. */
	href(path: string) {
		return localize(path, this.locale);
	}
};
