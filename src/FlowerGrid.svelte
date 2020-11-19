<script lang='ts'>
  import Flower from './Flower.svelte'
  import type { Genome } from './network/network';

  export let flowers: Array<Genome>

  let selected: Genome;
  const selectFlower = genome => {
    if (selected) {
      if (selected.id === genome.id) {
        selected = undefined
      } else {
        console.log('parent1: ', selected)
        console.log('parent2: ', genome)
        flowers = selected.cross(genome, 4)
        selected = undefined
      }
    } else {
      selected = genome
    }
  }
</script>

<div class='flower-grid'>
  {#each flowers as genome (genome.id)}
    <Flower
      {genome}
      on:click={() => selectFlower(genome)}/>
  {/each}
</div>

<style>
  .flower-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>