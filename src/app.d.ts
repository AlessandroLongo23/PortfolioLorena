// See https://svelte.dev/docs/kit/types#app.d.ts
import type { Locale } from '$lib/content';

declare global {
	namespace App {
		interface PageData {
			locale: Locale;
		}
	}
}

export {};
