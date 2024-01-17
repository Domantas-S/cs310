<script lang="ts">
  import type { annotation_segment } from "$lib/interfaces";
  import AnnotationSegment from "./AnnotationSegment.svelte";
  export let isAnnotation: boolean = false;
  export let annotation: string = '';
  export let text: string = '';
  export let start : number;
  export let end : number;
  export let children: annotation_segment[] = [];  // start, end, AnnotationSegment

  let textSpliced: string[] = [];
  
  $: {
    isAnnotation = isAnnotation;
    annotation = annotation;
    text = text;
    start = start;
    end = end;
    children = children;
    textSpliced = spliceText();
  }

  function spliceText() { // correctly split text among parent and children
    let textSpliced = [];
    if (!isAnnotation || children.length === 0) return [text];

    children.sort((a, b) => a.start - b.start);  // sort children by start index

    let last = 0
    for (let i = 0; i < children.length; i++) {
      if (children[i].start >= start + last) {  // if there is text between children
        let slice = text.slice(last, children[i].start - start) || '';
        textSpliced.push(slice);  // push text between last and current child
      }
      last = children[i].end - start;  // update last index
    }
    textSpliced.push(text.slice(last)); // push last part of text
    
    console.log(textSpliced);
    return textSpliced;
  }


  let x = 0;
  let y = 0;
  const offset = 5;
  let parent;

  function handleMouseMove(event) {
    const rect = parent.getBoundingClientRect();
    x = event.clientX - rect.left + offset;
    y = event.clientY - rect.top + offset;
  }
</script>

<svelte:options accessors={true}/>

<div class="group relative flex flex-row align-middle" bind:this={parent}>
  <span class:rounded={isAnnotation} class="px-2 py-1" on:mousemove={handleMouseMove} role="presentation">
    <span class="flex">
      {#each textSpliced as part, i}
        {part}
        {#if children[i]}
          <div class="px-2">
            <AnnotationSegment start={children[i].start} end={children[i].end} text={children[i].text} annotation={children[i].annotation_type} isAnnotation={children[i].is_annotation}/>
          </div>
          {/if}
      {/each}
    </span>
  </span>
  {#if isAnnotation}
    <div class="absolute p-1 text-xs text-white bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50" style="left: {x}px; top: {y}px;">
      {annotation}
    </div>
  {/if}
</div>

<style>
  .rounded {
    border-radius: 0.25rem;
    background-color: #32f22c;
    border: black 1px solid;
  }
</style>