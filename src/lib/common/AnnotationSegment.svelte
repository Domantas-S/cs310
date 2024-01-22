<script lang="ts">
  import type { annotation_segment } from "$lib/interfaces";
  import AnnotationSegment from "./AnnotationSegment.svelte";
  export let isAnnotation: boolean = false;
  export let annotation: string = '';
  export let text: string = '';
  export let start : number;
  export let end : number;
  export let children: annotation_segment[] = [];  // start, end, AnnotationSegment
  export let popupToggle: boolean = false;

  let textSpliced: string[] = [];
  
  $: {
    isAnnotation = isAnnotation;
    annotation = annotation;
    text = text;
    start = start;
    end = end;
    children = children;
    textSpliced = spliceText();
    popupToggle = popupToggle;
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
    
    return textSpliced;
  }

</script>

<svelte:options accessors={true}/>

<div class="group relative flex flex-row align-middle">
  <span class:rounded={isAnnotation} class="px-2 py-1" role="presentation">
    <span class="flex items-center">
      {#each textSpliced as part, i}
        {part}
        {#if children[i]}
          <div class="px-1">
            <AnnotationSegment 
              start={children[i].start} 
              end={children[i].end} 
              text={children[i].text} 
              annotation={children[i].annotation_type} 
              isAnnotation={children[i].is_annotation}
              popupToggle={popupToggle} />
          </div>
        {/if}
      {/each}
    </span>
  </span>
  {#if isAnnotation}
   <div class="absolute 
      {children.length > 0 ? "bottom-full" : "top-full"} 
      right-0 
      p-1 
      text-xs 
      text-white 
      bg-black 
      {popupToggle ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
      transition-opacity 
      duration-200 
      z-50">

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