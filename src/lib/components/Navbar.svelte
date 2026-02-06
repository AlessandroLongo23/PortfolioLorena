<script lang="ts">
	import { List, X } from 'phosphor-svelte';

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:window onscroll={handleScroll} />

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
		? 'bg-white/80 backdrop-blur-lg shadow-sm'
		: 'bg-transparent'}"
>
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<!-- Logo -->
		<a href="/" class="text-xl font-semibold tracking-tight text-midnight">
			Lorena Trapanese
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden items-center gap-8 md:flex">
			<a
				href="/#work"
				class="text-sm text-ink-muted transition-colors hover:text-ink"
			>
				Work
			</a>
			<a
				href="/about"
				class="text-sm text-ink-muted transition-colors hover:text-ink"
			>
				About
			</a>
			<a
				href="/resume-eng.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="rounded-full bg-midnight px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
			>
				Resume
			</a>
		</div>

		<!-- Mobile Menu Button -->
		<button
			type="button"
			class="flex items-center justify-center md:hidden"
			onclick={toggleMobileMenu}
			aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileMenuOpen}
		>
			{#if mobileMenuOpen}
				<X size={24} weight="bold" class="text-ink" />
			{:else}
				<List size={24} weight="bold" class="text-ink" />
			{/if}
		</button>
	</nav>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div
			class="border-t border-border bg-white/95 backdrop-blur-lg md:hidden"
		>
			<div class="flex flex-col gap-4 px-6 py-6">
				<a
					href="/#work"
					class="text-base text-ink-muted transition-colors hover:text-ink"
					onclick={closeMobileMenu}
				>
					Work
				</a>
				<a
					href="/about"
					class="text-base text-ink-muted transition-colors hover:text-ink"
					onclick={closeMobileMenu}
				>
					About
				</a>
				<a
					href="/resume-eng.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-2 inline-block rounded-full bg-midnight px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-700"
					onclick={closeMobileMenu}
				>
					Resume
				</a>
			</div>
		</div>
	{/if}
</header>
