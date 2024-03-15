<script lang="ts">
    import type { extractedAnnotation, newRecord } from "$lib/types/types";
    import { generateSegments2 } from "$lib/scripts/segment_generation";
    import AnnotationSegment from "./AnnotationSegment.svelte";
    import type { annotation_segment } from "$lib/interfaces";
    export let data: newRecord;
    export let popupToggle = false;
   
    let extractedAnnotations = [] as extractedAnnotation[];
    let extractedAnnotationsForSegmentation = [] as [string, number, number, number][];

    let groupedSegments : annotation_segment[][] = [];

    $: { 
        data = data;
        popupToggle = popupToggle;

        try{
            extractedAnnotations = extractAnnotations(data);
            extractedAnnotationsForSegmentation = extractedAnnotations.map(annotation => [annotation.annotation, annotation.start, annotation.start + annotation.text.length, annotation.event_num])
            extractedAnnotationsForSegmentation.sort((a, b) => a[1] - b[1] || b[2] - a[2]);
            let groupedAnnotations = extractedAnnotationsForSegmentation.reduce((acc: [string, number, number, number][][], annotation) => {
                const eventNum = annotation[3]; // assuming the event_num is at index 3
                if (!acc[eventNum]) {
                    acc[eventNum] = [];
                }
                acc[eventNum].push(annotation);
                return acc;
                }, []);
            groupedSegments = groupedAnnotations.map((eventAnnotations: [string, number, number, number][]) => generateSegments2(data.context, eventAnnotations));

        }
        catch(e){
            console.error("Error extracting annotations: ", e);
            extractedAnnotations = [];
            extractedAnnotationsForSegmentation = [];
            groupedSegments = [];
        }
    }


    function extractAnnotations(data : newRecord) : extractedAnnotation[]{
        let extractedAnnotations : extractedAnnotation[] = [];
        for (let i = 0; i < data.events.length; i++){
            for (let annotation of data.events[i].annotations){
                try {
                    if (!annotation.text || annotation.text.length === 0){
                        throw new Error(`Annotation text is empty!\n Record: ${data.context}\nAnnotation: ${annotation.text}`);
                    }

                    if (annotation.start && annotation.start >= 0){ // if the annotation has a start index, use it
                        // check that the start index matches the annotated text
                        if (data.context.slice(annotation.start, annotation.start + annotation.text.length) !== annotation.text){
                            throw new Error(`Start index does not match annotated text!\n Record: ${data.context}\nAnnotation: ${annotation.text}`);
                        }

                        extractedAnnotations.push({
                            annotation: annotation.annotation,
                            start: annotation.start,
                            text: annotation.text,
                            event_num: i,
                            event_type: data.events[i].type,
                        });
                    }
                    else {   // no start index, provided so assume start index = first occurence of annotated text in record
                        let start = data.context.indexOf(annotation.text);
                        if (start >= 0){
                            extractedAnnotations.push({
                                annotation: annotation.annotation,
                                start: start,
                                text: annotation.text,
                                event_num: i,
                                event_type: data.events[i].type,
                            });
                        }
                        else {
                            throw new Error(`Cannot find annotation text in record!\n Record: ${data.context}\nAnnotation: ${annotation.text}`);
                        }
                    }
            } catch (e) {
                console.error("Error extracting annotations: " + JSON.stringify(annotation), e);
            }
        }
        }
        return extractedAnnotations;
    }


</script>


<div class="justify-center items-center">
    {#if !extractedAnnotations || extractedAnnotations.length === 0 || !groupedSegments || groupedSegments.length === 0}
        <div class="flex flex-wrap flex-row text-center">    
            <p style="color: red;">There was a problem extracting annotations.</p>
            {#if data.context}
                <p>{data.context}</p>
            {/if}
        </div>
    {:else}
        {#key groupedSegments}
            {#each groupedSegments as eventSegments, eventNum (eventNum)}
                <div class="flex flex-wrap flex-row items-center justify-center">
                    <span class="badge bg-primary-500 text-white">{eventNum + 1}</span>
                    <span class="px-0.5"/>
                    {#each eventSegments as segment}
                        <AnnotationSegment 
                            start={segment.start} 
                            end={segment.end} 
                            text={segment.text} 
                            isAnnotation={segment.is_annotation} 
                            annotation={segment.annotation_type} 
                            children={segment.children} 
                            popupToggle={popupToggle}
                            event_colour={segment.event_colour}/>
                    {/each}
                </div>
                {#if eventNum < groupedSegments.length - 1}
                    <div class="py-2"/>
                    <hr class="w-full bg-primary-300"/>
                    <div class="py-2"/>
                {/if}
            {/each}
        {/key}
        
    {/if}
</div>