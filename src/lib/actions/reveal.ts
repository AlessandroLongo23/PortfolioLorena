// Fades an element up the first time it scrolls into view.
export function reveal(node: HTMLElement, delay = 0) {
	if (typeof IntersectionObserver === 'undefined') return;
	// Content already on screen at load stays put; only what is below the fold animates.
	if (node.getBoundingClientRect().top < window.innerHeight * 0.92) return;
	node.classList.add('reveal');
	if (delay) node.style.setProperty('--delay', `${delay}s`);

	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('is-in');
					io.disconnect();
				}
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
	);
	io.observe(node);

	return { destroy: () => io.disconnect() };
}
