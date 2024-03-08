<script lang="ts">
  import type { annotation_segment } from "$lib/interfaces";
  import AnnotationSegment from "./AnnotationSegment.svelte";
  export let isAnnotation: boolean = false;
  export let annotation: string = '';
  export let text: string = '';
  export let start : number;
  export let end : number;
  export let children: annotation_segment[] = [];  // start, end, AnnotationSegment, event_colour
  export let popupToggle: boolean = false;
  export let event_colour : number = 0;

  const event_styles = [
    "bg-event_0 rounded border-black border",
    "bg-event_1 rounded border-black border",
    "bg-event_2 rounded border-black border",
    "bg-event_3 rounded border-black border",
    "bg-event_4 rounded border-black border",
    "bg-event_5 rounded border-black border",
    "bg-event_6 rounded border-black border",
    "bg-event_7 rounded border-black border",
    "bg-event_8 rounded border-black border",
    "bg-event_9 rounded border-black border",
  ];
  $: segmentStyling = event_styles[event_colour];


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
    event_colour = event_colour;
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
  <span class="px-2 py-1 {isAnnotation ? segmentStyling: ''}" role="presentation">
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
              popupToggle={popupToggle} 
              event_colour={children[i].event_colour}/>
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
