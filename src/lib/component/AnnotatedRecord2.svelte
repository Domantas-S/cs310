<script lang="ts">
    import type { extractedAnnotation, newRecord } from "$lib/types/types";
    import { generateSegments2 } from "$lib/scripts/segment_generation";
    import AnnotationSegment from "./AnnotationSegment.svelte";
    import type { annotation_segment } from "$lib/interfaces";
    export let data: newRecord;
    export let popupToggle = false;
   
    let extractedAnnotations = [] as extractedAnnotation[];
    let extractedAnnotationsForSegmentation = [] as [string, number, number, number][];

    let segments : annotation_segment[] = [];

    $: { 
        data = data;
        popupToggle = popupToggle;
        try{
            extractedAnnotations = extractAnnotations(data);
            extractedAnnotationsForSegmentation = extractedAnnotations.map(annotation => [annotation.annotation, annotation.start, annotation.start + annotation.text.length, annotation.event_num])
            extractedAnnotationsForSegmentation.sort((a, b) => a[1] - b[1] || b[2] - a[2]);
            segments = generateSegments2(data.context, extractedAnnotationsForSegmentation);
        }
        catch(e){
            console.error("Error extracting annotations: ", e);
            extractedAnnotations = [];
            extractedAnnotationsForSegmentation = [];
            segments = [];
        }
    }


    function extractAnnotations(data : newRecord) : extractedAnnotation[]{
        let extractedAnnotations : extractedAnnotation[] = [];
        for (let i = 0; i < data.events.length; i++){
            for (const annotation of data.events[i].annotations){
                try {
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


<div class="flex flex-wrap flex-row justify-center items-center">
    {#if !extractedAnnotations || extractedAnnotations.length === 0 || !segments || segments.length === 0}
        <div class="text-center">    
            <p style="color: red;">There was a problem extracting annotations.</p>
            {#if data.context}
                <p>{data.context}</p>
            {/if}
        </div>
    {:else}
        {#each segments as segment}
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
    {/if}
</div>