<script lang="ts">
	interface Props {
		open: boolean;
		title?: string;
		message?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		danger?: boolean;
		onconfirm?: () => void;
		oncancel?: () => void;
	}

	let {
		open = $bindable(false),
		title = 'Confermi?',
		message = 'Questa azione non può essere annullata.',
		confirmLabel = 'Conferma',
		cancelLabel = 'Annulla',
		danger = false,
		onconfirm,
		oncancel
	}: Props = $props();

	function close() {
		open = false;
		oncancel?.();
	}

	function confirm() {
		open = false;
		onconfirm?.();
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
		role="dialog"
		aria-modal="true"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') close();
		}}
		tabindex="-1"
	>
		<div class="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
			<h2 class="text-lg font-semibold">{title}</h2>
			<p class="mt-2 text-sm text-zinc-600">{message}</p>
			<div class="mt-6 flex justify-end gap-3">
				<button
					type="button"
					onclick={close}
					class="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
				>
					{cancelLabel}
				</button>
				<button
					type="button"
					onclick={confirm}
					class="rounded-md px-4 py-2 text-sm font-medium text-white {danger
						? 'bg-red-600 hover:bg-red-700'
						: 'bg-zinc-900 hover:bg-zinc-800'}"
				>
					{confirmLabel}
				</button>
			</div>
		</div>
	</div>
{/if}
