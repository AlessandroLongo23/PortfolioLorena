<script lang="ts">
	import ExperienceDetail from '$lib/components/ExperienceDetail.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let project = $derived(data.experience);
</script>

<svelte:head>
	<title>{project.title} | Lorena Trapanese</title>
	<meta name="description" content="{project.focus}." />
</svelte:head>

<ExperienceDetail experience={project} />
