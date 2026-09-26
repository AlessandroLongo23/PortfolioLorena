export type LightboxItem = { src: string; alt: string; caption?: string };

export const lightbox = $state({
	items: [] as LightboxItem[],
	index: 0,
	open: false,
	title: ''
});

export function openLightbox(items: LightboxItem[], index = 0, title = '') {
	lightbox.items = items;
	lightbox.index = index;
	lightbox.title = title;
	lightbox.open = true;
}
