<script lang="ts">
	import { LinkedinLogoIcon, EnvelopeSimpleIcon } from 'phosphor-svelte';

	const currentYear = new Date().getFullYear();
</script>

<footer class="mt-auto border-t border-border bg-surface">
	<div class="mx-auto max-w-5xl px-6 py-10">
		<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
			<!-- Left: Copyright -->
			<div class="text-center md:text-left">
				<p class="text-xs text-ink-subtle">
					&copy; {currentYear} Lorena Trapanese
				</p>
			</div>

			<!-- Center: Social Links -->
			<div class="flex items-center gap-3">
				<a
					href="https://www.linkedin.com/in/lorena-trapanese-0698682b0/"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center justify-center rounded-full p-2 text-ink-subtle transition-colors hover:bg-highlight hover:text-ink"
					aria-label="LinkedIn Profile"
				>
					<LinkedinLogoIcon size={20} weight="regular" />
				</a>
				<a
					href="mailto:trapaneselorena01@gmail.com"
					rel="external"
					class="flex items-center justify-center rounded-full p-2 text-ink-subtle transition-colors hover:bg-highlight hover:text-ink"
					aria-label="Send Email"
				>
					<EnvelopeSimpleIcon size={20} weight="regular" />
				</a>
			</div>

			<!-- Right: Built with badge -->
			<div class="flex items-center gap-1.5 text-xs text-ink-subtle">
				<span>Built with</span>
				<a
					href="https://svelte.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium text-ink-muted transition-colors hover:text-ink"
				>
					Svelte
				</a>
			</div>
		</div>
	</div>
</footer>
