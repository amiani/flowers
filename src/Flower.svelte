<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from "svelte";
  import drawFlower from './drawFlower'
  import makeNet from "./network/makeNet";

  export let genome


  let canvas
  let ctx: CanvasRenderingContext2D
  let width = 200
  let height = 200
  let selected = false
  let hover = false

  onMount(() => {
    ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)
    const net = makeNet(genome.connections, genome.genes)
    const flowerData = drawFlower(net, ctx, width, height)
    ctx.putImageData(flowerData, 0, 0)
  })

	const dispatch = createEventDispatcher();
  const handleFlowerClick = e => {
    selected = !selected
    dispatch('click')
  }
</script>

<div
  class='container'
  class:selected
  class:hover
  on:mouseenter={()=>hover = !hover}
  on:mouseleave={()=>hover = !hover}
  on:click={handleFlowerClick}
  style="width:{width}px; height:{height}px;">
  <canvas
    class='flower-canvas'
    bind:this={canvas}
    {width}
    {height} />
</div>

<style>
  .container {
    border: 4px black solid;
  }
  .hover {
    border-color: dodgerblue;
  }
  .selected {
    border-color: fuchsia;
  }
</style>