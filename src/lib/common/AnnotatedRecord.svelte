<script lang="ts">
    import type { record, annotation, common, event, subject, treatment, annotation_segment } from "$lib/interfaces";
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
            segments = generateSegments2(annotations);
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

    // generate segments by iterating through annotations and adding AnnotationSegments for each annotation
    // if an annotation starts in another annotation (contains part or all of it), then store the inner annotation as a child of the outer annotation
    function generateSegments2(annotations : [string, number, number, number][]) { // assume annotations are stored in order
        let segments : annotation_segment[] = [];
        let prevAnnotationRange = {start: 0, end: 0};
        let prevAnnotation : annotation_segment | null = null;

        // combine annotations that have the same start and end indices
        for (let i = 0; i < annotations.length - 1; i++) {
            if (annotations[i][1] === annotations[i + 1][1] && annotations[i][2] === annotations[i + 1][2]) {
                annotations[i][0] += ", " + annotations[i + 1][0];
                annotations.splice(i + 1, 1);
            }
        }

        for (let i = 0; i < annotations.length; i++) { // main code
            const [annotation, start, end, event_colour] = annotations[i];

            if (start > prevAnnotationRange.end) {   // gap between annotations
                segments.push({  // add text between annotations
                            start: prevAnnotationRange.end,
                            end: start,
                            text: data.context.slice(prevAnnotationRange.end, start),
                            is_annotation: false,
                            annotation_type: "",
                            children: [],
                            event_colour
                        }
                );
                segments.push({  // add new parent annotation
                            start: start,
                            end: end,
                            text: data.context.slice(start, end),
                            is_annotation: true,
                            annotation_type: annotation,
                            children: [],
                            event_colour
                        }
                );

                prevAnnotationRange.start = start;
                prevAnnotationRange.end = end;
                prevAnnotation = segments[segments.length - 1];
            }
            else if (start === prevAnnotationRange.end) { // next annotation starts at end of previous annotation
                segments.push({
                            start: start,
                            end: end,
                            text: data.context.slice(start, end),
                            is_annotation: true,
                            annotation_type: annotation,
                            children: [],
                            event_colour
                        }
                );
                prevAnnotationRange.start = start;
                prevAnnotationRange.end = end;
                prevAnnotation = segments[segments.length - 1];
            }
            else {  // next annotation starts in previous annotation. check if it overlaps with another child annotation
                if(prevAnnotation) {
                    addChild(annotations[i], prevAnnotation);
                }
                else{
                    console.error("prevAnnotation is null!");
                }
                
            }
        }

        // all annotations have been added, add any remaining text after last annotation
        if (prevAnnotationRange.end < data.context.length) {
            segments.push({
                        start: prevAnnotationRange.end,
                        end: data.context.length,
                        text: data.context.slice(prevAnnotationRange.end),
                        is_annotation: false,
                        annotation_type: "",
                        children: [],
                        event_colour: 0 // dummy/default value. not used since is_annotation is false
                    }
            );
        }
        return segments;


        function addChild(newAnnotation : [string, number, number, number], parent : annotation_segment) {
            const [annotation, start, end, event_colour] = newAnnotation;
            if (parent.children.length === 0) { // no more children so just add it
                parent.children.push({
                    start: start,
                    end: end,
                    text: data.context.slice(start, end),
                    is_annotation: true,
                    annotation_type: annotation,
                    children: [],
                    event_colour
                });
                
                if (end > parent.end) { // extending the range of the parent annotation (since child annotation extends out of parent annotation)
                    parent.end = end;
                }
            }
            else {  // check if newAnnotation overlaps with any children, REMEMBER, ANNOATIONS ARE SORTED BY START INDEX
                let found = false;
                for (let i = 0; i < parent.children.length; i++) {
                    const child = parent.children[i];
                    if (start >= child.start && start < child.end) { // newAnnotation starts in child annotation
                        addChild(newAnnotation, child); // recursively add newAnnotation as a child of the child annotation
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    parent.children.push({
                                start: start,
                                end: end,
                                text: data.context.slice(start, end),
                                is_annotation: true,
                                annotation_type: annotation,
                                children: [],
                                event_colour
                            });

                    if (end > parent.end) { // extending the range of the parent annotation (since child annotation extends out of parent annotation)
                        parent.end = end;
                    }
                }

            }
        }
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

