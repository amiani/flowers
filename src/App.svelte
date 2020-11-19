<script lang="ts">
	import FlowerGrid from './FlowerGrid.svelte'
	import genome from './network/IdentityNet';
	import type { Genome } from './network/network';

	const flowers = Array<Genome>(3)
		.fill(genome)
		.map(g => g.mutate())
</script>

<main>
	<FlowerGrid {flowers} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>