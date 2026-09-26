<script lang="ts">
	// Lorena's "book" object: a cover with a spine shadow and a page edge.
	// With `preview`, a muted clip plays over the cover while hovered.
	let {
		src,
		alt,
		preview,
		active = false,
		size = 'md'
	}: {
		src: string;
		alt: string;
		preview?: { src: string; poster: string };
		active?: boolean;
		size?: 'md' | 'lg';
	} = $props();

	let video: HTMLVideoElement | undefined = $state();

	$effect(() => {
		if (!video) return;
		if (active) video.play().catch(() => {});
		else {
			video.pause();
			video.currentTime = 0;
		}
	});
</script>

<div class="book {size}" class:active>
	<img {src} {alt} loading="lazy" decoding="async" />
	{#if preview}
		<video
			bind:this={video}
			src={preview.src}
			poster={preview.poster}
			muted
			loop
			playsinline
			preload="none"
			aria-hidden="true"
		></video>
	{/if}
</div>

<style>
	.book {
		position: relative;
		display: inline-block;
		line-height: 0;
		transition: transform 0.45s var(--ease);
	}
	.book.active {
		transform: translateY(-8px) rotate(-1deg);
	}
	img,
	video {
		height: var(--h);
		width: auto;
		max-width: 100%;
		box-shadow: var(--book-shadow);
		border: 1px solid var(--rule);
	}
	.md {
		--h: clamp(300px, 34vw, 400px);
	}
	.lg {
		--h: clamp(340px, 46vw, 560px);
	}
	video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.35s ease;
	}
	.active video {
		opacity: 1;
	}
	/* spine */
	.book::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 15px;
		z-index: 2;
		background: linear-gradient(
			90deg,
			rgba(0, 0, 0, 0.3),
			rgba(0, 0, 0, 0.1) 45%,
			rgba(255, 255, 255, 0.16) 78%,
			rgba(0, 0, 0, 0.06)
		);
		pointer-events: none;
	}
	/* page edge */
	.book::after {
		content: '';
		position: absolute;
		top: 5px;
		bottom: 5px;
		right: -7px;
		width: 7px;
		z-index: -1;
		background: repeating-linear-gradient(90deg, #e6e5df 0 1px, #c9c8c0 1px 2px);
		border-radius: 0 2px 2px 0;
		box-shadow: 2px 2px 6px -3px rgba(0, 0, 0, 0.5);
	}
</style>
