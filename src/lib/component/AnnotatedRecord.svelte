<script lang="ts">
    import type { record, annotation, common, event, subject, treatment, annotation_segment } from "$lib/interfaces";
	import { generateSegments2 } from "$lib/scripts/segment_generation";
    import AnnotationSegment from "./AnnotationSegment.svelte";
    export let data: record;
    export let popupToggle = false;
   
    let annotations = [] as [string, number, number, number][];

    let segments : annotation_segment[] = [];

    $: { 
        data = data;
        popupToggle = popupToggle;
        try{
            annotations = extractAnnotations(data).sort((a, b) => a[1] - b[1] || b[2] - a[2]);
            segments = generateSegments2(data.context, annotations);
        }
        catch(e){
            console.error("Error extracting annotations: ", e);
            annotations = [];
            segments = [];
        }
    }


    // Return an array of [annotation, start_char, end_char] for each annotation 
    function extractAnnotations(record: record) : [string, number, number, number][] {
        let annotations : [string, number, number, number][] = [];  // [annotation, start_char, end_char, event_index]

        for (let i = 0; i < record.annotations.length; i++) {
            const e = record.annotations[i];

            if (e.Effect) {
                annotations.push(...parseCommon("Effect", e.Effect).map(a => [...a, i] as [string, number, number, number]));
            }
            if (e.Trigger) {
                annotations.push(...parseCommon("Trigger", e.Trigger).map(a => [...a, i] as [string, number, number, number]));
            }
            if (e.Negated) {
                annotations.push(...parseCommon("Negated", e.Negated).map(a => [...a, i] as [string, number, number, number]));
            }
            if (e.Severity) {
                annotations.push(...parseCommon("Severity", e.Severity).map(a => [...a, i] as [string, number, number, number]));
            }
            if (e.Speculated) {
                annotations.push(...parseCommon("Speculated", e.Speculated).map(a => [...a, i] as [string, number, number, number]));
            }
            if (e.Subject) {
                annotations.push(...parseSubject("Subject", e.Subject).map(a => [...a, i] as [string, number, number, number]));
            }
            if (e.Treatment) {
                annotations.push(...parseTreatment("Treatment", e.Treatment).map(a => [...a, i] as [string, number, number, number]));
            }
        }
        // sort annotations by start_char
        annotations.sort((a, b) => a[1] - b[1]);
        return annotations;
    }

    function parseCommon(name : string, obj : common){
        let annotations : [string, number, number][] = [];
        for (let i = 0; i < obj.text.length; i++) {
            annotations.push([name, obj.start[i][0], obj.start[i][0] + obj.text[i][0].length]);
        }
        return annotations;
    }

    function parseSubject(name: string, obj : subject){
        let annotations : [string, number, number][] = [];
        
        if (obj.Age){
            annotations.push(...parseCommon(name + ".Age", obj.Age));
        }

        if (obj.Disorder){
            annotations.push(...parseCommon(name + ".Disorder", obj.Disorder));
        }

        if (obj.Gender) {
            annotations.push(...parseCommon(name + ".Gender", obj.Gender));
        }

        if (obj.Population) {
            annotations.push(...parseCommon(name + ".Population", obj.Population));
        }

        if (obj.Race) {
            annotations.push(...parseCommon(name + ".Race", obj.Race));
        }

        return annotations;
    }

    function parseTreatment(name: string, obj : treatment) {
        let annotations : [string, number, number][] = [];

        if (obj.Combination) {
            for (let i = 0; i < obj.Combination.length; i++) {

                if (obj.Combination[i].Drug) {
                    annotations.push(...parseCommon(name + ".Combination.Drug", obj.Combination[i].Drug));
                }

                if (obj.Combination[i].Trigger) {
                    annotations.push(...parseCommon(name + ".Combination.Trigger", obj.Combination[i].Trigger));
                }
            }
        }

        if (obj.Drug) {
            annotations.push(...parseCommon(name + ".Drug", obj.Drug));
        }

        if (obj.Disorder) {
            annotations.push(...parseCommon(name + ".Disorder", obj.Disorder));
        }

        if (obj.Dosage) {
            annotations.push(...parseCommon(name + ".Dosage", obj.Dosage));
        }

        if (obj.Duration) {
            annotations.push(...parseCommon(name + ".Duration", obj.Duration));
        }

        if (obj.Trigger) {
            annotations.push(...parseCommon(name + ".Trigger", obj.Trigger));
        }

        if (obj.Route) {
            annotations.push(...parseCommon(name + ".Freq", obj.Route));
        }
        
        if (obj.Time_elapsed) {
            annotations.push(...parseCommon(name + ".Time_elapsed", obj.Time_elapsed));
        }

        if (obj.Freq) {
            annotations.push(...parseCommon(name + ".Freq", obj.Freq));
        }
        
        return annotations;

    }

</script>

<div class="flex flex-wrap flex-row justify-center items-center">
    {#if !annotations || annotations.length === 0 || !segments || segments.length === 0}
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

