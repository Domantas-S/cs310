import { c as create_ssr_component, e as escape, d as each, v as validate_component } from "./ssr.js";
function generateSegments2(context, annotations) {
  let segments = [];
  let prevAnnotationRange = { start: 0, end: 0 };
  let prevAnnotation = null;
  for (let i = 0; i < annotations.length - 1; i++) {
    if (annotations[i][1] === annotations[i + 1][1] && annotations[i][2] === annotations[i + 1][2]) {
      annotations[i][0] += ", " + annotations[i + 1][0];
      annotations.splice(i + 1, 1);
    }
  }
  for (let i = 0; i < annotations.length; i++) {
    const [annotation, start, end, event_colour] = annotations[i];
    if (start > prevAnnotationRange.end) {
      segments.push(
        {
          // add text between annotations
          start: prevAnnotationRange.end,
          end: start,
          text: context.slice(prevAnnotationRange.end, start),
          is_annotation: false,
          annotation_type: "",
          children: [],
          event_colour
        }
      );
      segments.push(
        {
          // add new parent annotation
          start,
          end,
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
    } else if (start === prevAnnotationRange.end) {
      segments.push(
        {
          start,
          end,
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
    } else {
      if (prevAnnotation) {
        addChild(annotations[i], prevAnnotation);
      } else {
        console.error("prevAnnotation is null!");
      }
    }
  }
  if (prevAnnotationRange.end < context.length) {
    segments.push(
      {
        start: prevAnnotationRange.end,
        end: context.length,
        text: context.slice(prevAnnotationRange.end),
        is_annotation: false,
        annotation_type: "",
        children: [],
        event_colour: 0
        // dummy/default value. not used since is_annotation is false
      }
    );
  }
  return segments;
  function addChild(newAnnotation, parent) {
    const [annotation, start, end, event_colour] = newAnnotation;
    if (parent.children.length === 0) {
      parent.children.push({
        start,
        end,
        text: context.slice(start, end),
        is_annotation: true,
        annotation_type: annotation,
        children: [],
        event_colour
      });
      if (end > parent.end) {
        parent.end = end;
      }
    } else {
      let found = false;
      for (let i = 0; i < parent.children.length; i++) {
        const child = parent.children[i];
        if (start >= child.start && start < child.end) {
          addChild(newAnnotation, child);
          found = true;
          break;
        }
      }
      if (!found) {
        parent.children.push({
          start,
          end,
          text: context.slice(start, end),
          is_annotation: true,
          annotation_type: annotation,
          children: [],
          event_colour
        });
        if (end > parent.end) {
          parent.end = end;
        }
      }
    }
  }
}
const AnnotationSegment_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let segmentStyling;
  let { isAnnotation = false } = $$props;
  let { annotation = "" } = $$props;
  let { text = "" } = $$props;
  let { start } = $$props;
  let { end } = $$props;
  let { children = [] } = $$props;
  let { popupToggle = false } = $$props;
  let { event_colour = 0 } = $$props;
  let textSpliced = [];
  function spliceText() {
    let textSpliced2 = [];
    if (!isAnnotation || children.length === 0)
      return [text];
    children.sort((a, b) => a.start - b.start);
    let last = 0;
    for (let i = 0; i < children.length; i++) {
      if (children[i].start >= start + last) {
        let slice = text.slice(last, children[i].start - start) || "";
        textSpliced2.push(slice);
      }
      last = children[i].end - start;
    }
    textSpliced2.push(text.slice(last));
    return textSpliced2;
  }
  function annotationStyle() {
    const subjectSubkeys = ["age", "gender", "population", "race"];
    const treatmenSubkeys = [
      "drug",
      "route",
      "dosage",
      "time elapsed",
      "duration",
      "frequency",
      "combination.drug"
    ];
    let style = "";
    if (isAnnotation) {
      let search = annotation.toLowerCase().split(",")[0];
      if (subjectSubkeys.includes(search)) {
        return "bg-red-300 rounded border-black border";
      }
      if (treatmenSubkeys.includes(search)) {
        return "bg-yellow-300 rounded border-black border";
      }
    }
    if (isAnnotation) {
      let formattedAnn = annotation.toLowerCase().replace(" ", ".").trim().split(",")[0].split(".");
      switch (formattedAnn[0]) {
        case "subject":
          style = "bg-red-600";
          if (formattedAnn[1])
            style = "bg-red-300";
          break;
        case "effect":
          style = "bg-purple-400";
          break;
        case "treatment":
          style = "bg-yellow-600";
          if (formattedAnn[1])
            style = "bg-yellow-300";
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
  if ($$props.isAnnotation === void 0 && $$bindings.isAnnotation && isAnnotation !== void 0)
    $$bindings.isAnnotation(isAnnotation);
  if ($$props.annotation === void 0 && $$bindings.annotation && annotation !== void 0)
    $$bindings.annotation(annotation);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.start === void 0 && $$bindings.start && start !== void 0)
    $$bindings.start(start);
  if ($$props.end === void 0 && $$bindings.end && end !== void 0)
    $$bindings.end(end);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  if ($$props.popupToggle === void 0 && $$bindings.popupToggle && popupToggle !== void 0)
    $$bindings.popupToggle(popupToggle);
  if ($$props.event_colour === void 0 && $$bindings.event_colour && event_colour !== void 0)
    $$bindings.event_colour(event_colour);
  segmentStyling = annotationStyle();
  {
    {
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
  }
  return ` <div class="group relative flex flex-row align-middle"><span class="${"px-2 py-1 " + escape(segmentStyling, true)}" role="presentation"><span class="flex items-center">${each(textSpliced, (part, i) => {
    return `${escape(part)} ${children[i] ? `<div class="px-1">${validate_component(AnnotationSegment_1, "AnnotationSegment").$$render(
      $$result,
      {
        start: children[i].start,
        end: children[i].end,
        text: children[i].text,
        annotation: children[i].annotation_type,
        isAnnotation: children[i].is_annotation,
        popupToggle,
        event_colour: children[i].event_colour
      },
      {},
      {}
    )} </div>` : ``}`;
  })}</span></span> ${isAnnotation ? `<div class="${"absolute " + escape(children.length > 0 ? "bottom-full" : "top-full", true) + " right-0 p-1 text-xs text-white bg-black " + escape(
    popupToggle ? "opacity-100" : "opacity-0 group-hover:opacity-100",
    true
  ) + " transition-opacity duration-200 z-50"}">${escape(annotation)}</div>` : ``}</div>`;
});
function extractAnnotations(data2) {
  let extractedAnnotations2 = [];
  for (let i = 0; i < data2.events.length; i++) {
    for (let annotation of data2.events[i].annotations) {
      try {
        if (!annotation.text || annotation.text.length === 0) {
          throw new Error(`Annotation text is empty!
 Record: ${data2.context}
Annotation: ${annotation.text}`);
        }
        if (annotation.start && annotation.start >= 0) {
          if (data2.context.slice(annotation.start, annotation.start + annotation.text.length) !== annotation.text) {
            throw new Error(`Start index does not match annotated text!
 Record: ${data2.context}
Annotation: ${annotation.text}`);
          }
          extractedAnnotations2.push({
            annotation: annotation.annotation,
            start: annotation.start,
            text: annotation.text,
            event_num: i,
            event_type: data2.events[i].type
          });
        } else {
          let start = data2.context.indexOf(annotation.text);
          if (start >= 0) {
            extractedAnnotations2.push({
              annotation: annotation.annotation,
              start,
              text: annotation.text,
              event_num: i,
              event_type: data2.events[i].type
            });
          } else {
            throw new Error(`Cannot find annotation text in record!
 Record: ${data2.context}
Annotation: ${annotation.text}`);
          }
        }
      } catch (e) {
        console.error("Error extracting annotations: " + JSON.stringify(annotation), e);
      }
    }
  }
  return extractedAnnotations2;
}
const AnnotatedRecord2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { popupToggle = false } = $$props;
  let extractedAnnotations = [];
  let extractedAnnotationsForSegmentation = [];
  let groupedSegments = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.popupToggle === void 0 && $$bindings.popupToggle && popupToggle !== void 0)
    $$bindings.popupToggle(popupToggle);
  {
    {
      data = data;
      popupToggle = popupToggle;
      try {
        extractedAnnotations = extractAnnotations(data);
        extractedAnnotationsForSegmentation = extractedAnnotations.map((annotation) => [
          annotation.annotation,
          annotation.start,
          annotation.start + annotation.text.length,
          annotation.event_num
        ]);
        extractedAnnotationsForSegmentation.sort((a, b) => a[1] - b[1] || b[2] - a[2]);
        let groupedAnnotations = extractedAnnotationsForSegmentation.reduce(
          (acc, annotation) => {
            const eventNum = annotation[3];
            if (!acc[eventNum]) {
              acc[eventNum] = [];
            }
            acc[eventNum].push(annotation);
            return acc;
          },
          []
        );
        groupedSegments = groupedAnnotations.map((eventAnnotations) => generateSegments2(data.context, eventAnnotations));
      } catch (e) {
        console.error("Error extracting annotations: ", e);
        extractedAnnotations = [];
        extractedAnnotationsForSegmentation = [];
        groupedSegments = [];
      }
    }
  }
  return `<div class="justify-center items-center">${!extractedAnnotations || extractedAnnotations.length === 0 || !groupedSegments || groupedSegments.length === 0 ? `<div class="flex flex-wrap flex-row text-center"><p style="color: red;" data-svelte-h="svelte-4f2vt9">There was a problem extracting annotations.</p> ${data.context ? `<p>${escape(data.context)}</p>` : ``}</div>` : `${each(groupedSegments, (eventSegments, eventNum) => {
    return `<div class="flex flex-wrap flex-row items-center justify-center"><span class="badge bg-primary-500 text-white">${escape(eventNum + 1)}</span> <span class="px-0.5"></span> ${each(eventSegments, (segment) => {
      return `${validate_component(AnnotationSegment_1, "AnnotationSegment").$$render(
        $$result,
        {
          start: segment.start,
          end: segment.end,
          text: segment.text,
          isAnnotation: segment.is_annotation,
          annotation: segment.annotation_type,
          children: segment.children,
          popupToggle,
          event_colour: segment.event_colour
        },
        {},
        {}
      )}`;
    })}</div> ${eventNum < groupedSegments.length - 1 ? `<div class="py-2"></div> <hr class="w-full bg-primary-300"> <div class="py-2"></div>` : ``}`;
  })}`}</div>`;
});
export {
  AnnotatedRecord2 as A
};
