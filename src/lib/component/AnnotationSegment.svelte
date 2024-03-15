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
  $: segmentStyling = annotationStyle();


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

  function annotationStyle() {
    const subjectSubkeys = ['age', 'gender', 'population', 'race']; // with flant5 and uie, they don't include the word subject or treatment before the subkeys
    const treatmenSubkeys = ['drug', 'route', 'dosage', 'time elapsed', 'duration', 'frequency', 'combination.drug'];
    let style = '';
  
    if (isAnnotation){  // handle subkeys that do not have the word subject or treatment before them (when realistically they should)
      let search = annotation.toLowerCase().split(',')[0];
      if (subjectSubkeys.includes(search)){
        return "bg-red-300 rounded border-black border";
      }
      if (treatmenSubkeys.includes(search)){
        return "bg-yellow-300 rounded border-black border";
      }
    }

    if (isAnnotation) {
      let formattedAnn = annotation.toLowerCase().replace(' ', '.').trim().split(',')[0].split('.');

      switch (formattedAnn[0]) {
        case "subject":
          style = "bg-red-600";
          if (formattedAnn[1]) style = "bg-red-300"; // if it's a sub-argument, colour lighter
          break;
        case "effect":
          style = "bg-purple-400";
          // if (formattedAnn[1]) style = "bg-purple-300"; // if it's a sub-argument, colour lighter
          break;
        case "treatment":
          style = "bg-yellow-600";
          if (formattedAnn[1]) style = "bg-yellow-300"; // if it's a sub-argument, colour lighter
          break;
        case "trigger":
          style = "bg-cyan-400";
          break;
        case "speculated":
          style = "bg-orange-300";
          break;
        case "negated":
          style = "bg-indigo-300";
          break;
        case "severity":
          style = "bg-green-400";
          break;
        
        default:
          style = "bg-gray-300";
      }
      style += " rounded border-black border";
    }
    return style;
  }

</script>

<svelte:options accessors={true}/>

<div class="group relative flex flex-row align-middle">
  <span class="px-2 py-1 {segmentStyling}" role="presentation">
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
