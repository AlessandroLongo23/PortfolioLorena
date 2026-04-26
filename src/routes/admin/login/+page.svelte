<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loading = $state(false);
</script>

<div class="mx-auto mt-16 max-w-sm">
	<header class="mb-8 text-center">
		<h1 class="text-2xl font-bold tracking-tight">Accesso amministratore</h1>
		<p class="mt-1 text-sm text-zinc-500">Accedi con le tue credenziali per gestire il portfolio.</p>
	</header>

	<form
		method="POST"
		class="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<div class="space-y-1">
			<label for="email" class="block text-sm font-medium text-zinc-700">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				autocomplete="email"
				required
				value={form?.email ?? ''}
				class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			/>
		</div>

		<div class="space-y-1">
			<label for="password" class="block text-sm font-medium text-zinc-700">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				autocomplete="current-password"
				required
				class="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
			/>
		</div>

		{#if form?.error}
			<p class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{form.error}</p>
		{/if}

		<button
			type="submit"
			disabled={loading}
			class="block w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
		>
			{loading ? 'Accesso in corso...' : 'Accedi'}
		</button>
	</form>
</div>
