<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		email: string;
	}

	let { email }: Props = $props();

	const links = [
		{ href: '/admin/experiences', label: 'Esperienze' },
		{ href: '/admin/projects', label: 'Progetti' },
		{ href: '/admin/skills', label: 'Competenze' },
		{ href: '/admin/timeline', label: 'Timeline' }
	];

	function isActive(href: string) {
		if (href === '/admin') return page.url.pathname === '/admin';
		return page.url.pathname.startsWith(href);
	}
</script>

<header class="border-b border-zinc-200 bg-white">
	<div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
		<div class="flex flex-wrap items-center gap-6">
			<nav class="flex flex-wrap gap-4 text-sm">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class="border-b-2 pb-1 transition-colors hover:text-zinc-900 {isActive(link.href)
							? 'border-black font-semibold text-zinc-900'
							: 'border-transparent text-zinc-500'}"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>

		<div class="flex items-center gap-4 text-sm">
			<span class="text-zinc-500">{email}</span>
			<form method="POST" action="/admin/logout">
				<button
					type="submit"
					class="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 font-medium text-red-600 transition-colors hover:bg-red-50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
						<polyline points="16 17 21 12 16 7" />
						<line x1="21" y1="12" x2="9" y2="12" />
					</svg>
					Esci
				</button>
			</form>
		</div>
	</div>
</header>
