<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		email: string;
	}

	let { email }: Props = $props();

	const links = [
		{ href: '/admin', label: 'Dashboard' },
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
			<a href="/admin" class="text-lg font-semibold tracking-tight">Admin</a>
			<nav class="flex flex-wrap gap-4 text-sm">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class="transition-colors hover:text-zinc-900 {isActive(link.href)
							? 'font-semibold text-zinc-900'
							: 'text-zinc-500'}"
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
					class="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-zinc-700 transition-colors hover:bg-zinc-100"
				>
					Esci
				</button>
			</form>
		</div>
	</div>
</header>
