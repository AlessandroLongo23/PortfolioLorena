<script lang="ts">
	import { page } from '$app/state';
	import AdminNav from '$lib/components/admin/AdminNav.svelte';

	let { children, data } = $props();

	const isLogin = $derived(page.url.pathname === '/admin/login');
</script>

<svelte:head>
	<title>Admin · Portfolio Lorena</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="min-h-screen bg-zinc-50 text-zinc-900">
	{#if !isLogin && data.user}
		<AdminNav email={data.user.email ?? ''} />
	{/if}

	<main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>
