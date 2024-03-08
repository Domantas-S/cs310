// generate segments by iterating through annotations and adding AnnotationSegments for each annotation

import type { annotation_segment } from "$lib/interfaces";

// if an annotation starts in another annotation (contains part or all of it), then store the inner annotation as a child of the outer annotation
export function generateSegments2(context: string, annotations: [string, number, number, number][]) { // assume annotations are stored in order
    let segments: annotation_segment[] = [];
    let prevAnnotationRange = { start: 0, end: 0 };
    let prevAnnotation: annotation_segment | null = null;

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
                text: context.slice(prevAnnotationRange.end, start),
                is_annotation: false,
                annotation_type: "",
                children: [],
                event_colour
            }
            );
            segments.push({  // add new parent annotation
                start: start,
                end: end,
                text: context.slice(start, end),
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
                text: context.slice(start, end),
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
            if (prevAnnotation) {
                addChild(annotations[i], prevAnnotation);
            }
            else {
                console.error("prevAnnotation is null!");
            }

        }
    }

    // all annotations have been added, add any remaining text after last annotation
    if (prevAnnotationRange.end < context.length) {
        segments.push({
            start: prevAnnotationRange.end,
            end: context.length,
            text: context.slice(prevAnnotationRange.end),
            is_annotation: false,
            annotation_type: "",
            children: [],
            event_colour: 0 // dummy/default value. not used since is_annotation is false
        }
        );
    }
    return segments;


    function addChild(newAnnotation: [string, number, number, number], parent: annotation_segment) {
        const [annotation, start, end, event_colour] = newAnnotation;
        if (parent.children.length === 0) { // no more children so just add it
            parent.children.push({
                start: start,
                end: end,
                text: context.slice(start, end),
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
                    text: context.slice(start, end),
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