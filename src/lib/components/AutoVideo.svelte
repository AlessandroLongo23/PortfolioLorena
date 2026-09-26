<script lang="ts">
	// Silent loop that plays only while on screen, with a pause control.
	import { i18n } from '$lib/i18n.svelte';

	let { src, poster, ratio, label }: { src: string; poster: string; ratio: string; label: string } =
		$props();

	let video: HTMLVideoElement | undefined = $state();
	let paused = $state(false);

	$effect(() => {
		if (!video) return;
		const v = video;
		const io = new IntersectionObserver(
			([e]) => (e.isIntersecting && !paused ? v.play().catch(() => {}) : v.pause()),
			{ threshold: 0.4 }
		);
		io.observe(v);
		return () => io.disconnect();
	});

	function toggle() {
		if (!video) return;
		paused = !paused;
		if (paused) video.pause();
		else video.play().catch(() => {});
	}
</script>

<div class="vid" style="aspect-ratio:{ratio}">
	<video bind:this={video} {src} {poster} muted loop playsinline preload="metadata" aria-label={label}
	></video>
	<button class="sound" onclick={toggle} aria-pressed={paused}>
		{paused ? i18n.c.ui.work.play : i18n.c.ui.work.pause}
	</button>
</div>

<style>
	.vid {
		position: relative;
		width: 100%;
		background: #000;
		box-shadow: var(--book-shadow);
	}
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.sound {
		position: absolute;
		right: 10px;
		bottom: 10px;
		padding: 6px 10px;
		background: rgba(10, 12, 11, 0.7);
		color: #edede8;
		border: 1px solid rgba(237, 237, 232, 0.35);
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		cursor: pointer;
		backdrop-filter: blur(6px);
	}
	.sound:hover {
		border-color: #edede8;
	}
</style>
