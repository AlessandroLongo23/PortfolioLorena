<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft, MagnifyingGlass } from 'phosphor-svelte';
</script>

<svelte:head>
	<title>Page Not Found | Lorena Trapanese</title>
</svelte:head>

<section class="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16">
	<div class="mx-auto max-w-md text-center">
		<div
			class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
		>
			<MagnifyingGlass size={40} weight="light" class="text-slate-400" />
		</div>

		<h1 class="mb-4 text-6xl font-bold text-ink">
			{page.status}
		</h1>

		<p class="mb-8 text-lg text-ink-muted">
			{#if page.error?.message}
				{page.error.message}
			{:else}
				The page you're looking for doesn't exist or has been moved.
			{/if}
		</p>

		<a
			href="/"
			class="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-hover"
		>
			<ArrowLeft size={20} weight="bold" />
			Back to Home
		</a>
	</div>
</section>
