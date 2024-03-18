import { c as create_ssr_component, b as subscribe, f as createEventDispatcher, e as escape, h as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { g as getModalStore } from "../../../chunks/functions.js";
import "@iconify/icons-material-symbols/file-upload.js";
import { A as AnnotatedRecord2 } from "../../../chunks/AnnotatedRecord2.js";
import { w as writable } from "../../../chunks/index.js";
import { M as ModelType, m as modelTypeToString } from "../../../chunks/datatypes.js";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import "fs";
const storeHighlightJs = writable(void 0);
const cBase = "overflow-hidden shadow";
const cHeader = "text-xs text-white/50 uppercase flex justify-between items-center p-2 pl-4";
const cPre = "whitespace-pre-wrap break-all p-4 pt-1";
function languageFormatter(lang) {
  if (lang === "js")
    return "javascript";
  if (lang === "ts")
    return "typescript";
  if (lang === "shell")
    return "terminal";
  return lang;
}
const CodeBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let $storeHighlightJs, $$unsubscribe_storeHighlightJs;
  $$unsubscribe_storeHighlightJs = subscribe(storeHighlightJs, (value) => $storeHighlightJs = value);
  createEventDispatcher();
  let { language = "plaintext" } = $$props;
  let { code = "" } = $$props;
  let { lineNumbers = false } = $$props;
  let { background = "bg-neutral-900/90" } = $$props;
  let { blur = "" } = $$props;
  let { text = "text-sm" } = $$props;
  let { color = "text-white" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { shadow = "shadow" } = $$props;
  let { button = "btn btn-sm variant-soft !text-white" } = $$props;
  let { buttonLabel = "Copy" } = $$props;
  let { buttonCopied = "👍" } = $$props;
  let formatted = false;
  let displayCode = code;
  if ($$props.language === void 0 && $$bindings.language && language !== void 0)
    $$bindings.language(language);
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.lineNumbers === void 0 && $$bindings.lineNumbers && lineNumbers !== void 0)
    $$bindings.lineNumbers(lineNumbers);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0)
    $$bindings.blur(blur);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.button === void 0 && $$bindings.button && button !== void 0)
    $$bindings.button(button);
  if ($$props.buttonLabel === void 0 && $$bindings.buttonLabel && buttonLabel !== void 0)
    $$bindings.buttonLabel(buttonLabel);
  if ($$props.buttonCopied === void 0 && $$bindings.buttonCopied && buttonCopied !== void 0)
    $$bindings.buttonCopied(buttonCopied);
  {
    if ($storeHighlightJs !== void 0) {
      displayCode = $storeHighlightJs.highlight(code, { language }).value.trim();
      formatted = true;
    }
  }
  {
    if (lineNumbers) {
      displayCode = displayCode.replace(/^/gm, () => {
        return '<span class="line"></span>	';
      });
      formatted = true;
    }
  }
  classesBase = `${cBase} ${background} ${blur} ${text} ${color} ${rounded} ${shadow} ${$$props.class ?? ""}`;
  $$unsubscribe_storeHighlightJs();
  return ` ${language && code ? `<div class="${"codeblock " + escape(classesBase, true)}" data-testid="codeblock"> <header class="${"codeblock-header " + escape(cHeader, true)}"> <span class="codeblock-language">${escape(languageFormatter(language))}</span>  <button class="${"codeblock-btn " + escape(button, true)}">${escape(buttonLabel)}</button></header>  <pre class="${"codeblock-pre " + escape(cPre, true)}"><code class="${"codeblock-code language-" + escape(language, true) + " lineNumbers"}">${formatted ? `<!-- HTML_TAG_START -->${displayCode}<!-- HTML_TAG_END -->` : `${escape(code.trim())}`}</code></pre></div>` : ``}`;
});
const githubDark = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  hljs.registerLanguage("json", json);
  storeHighlightJs.set(hljs);
  const exampleOutput = {
    "id": "X1234567_1",
    "context": "A French woman experienced sleep apnea after taking ibuprofen for 2 weeks.",
    "events": [
      {
        "type": "Adverse_event",
        "annotations": [
          {
            "annotation": "Trigger",
            "text": "after taking ibuprofen for 2 weeks"
          },
          {
            "annotation": "Effect",
            "text": "sleep apnea"
          },
          {
            "annotation": "Treatment",
            "text": "ibuprofen"
          },
          {
            "annotation": "Treatment.Drug",
            "text": "ibuprofen"
          },
          {
            "annotation": "Subject",
            "text": "A French woman"
          },
          {
            "annotation": "Subject.Gender",
            "text": "woman"
          }
        ]
      }
    ]
  };
  ModelType.FLANT5;
  let text = "";
  let result = exampleOutput;
  getModalStore();
  {
    {
      text = text;
      result = result;
    }
  }
  return `<div class="container mx-auto"><h1 class="h1" data-svelte-h="svelte-1gb6muz">Live Record Annotations</h1> <div class="py-3"></div> <div class="card grid grid-rows-1 grid-cols-3 divide-x divide-solid gap-x-5 p-3" data-svelte-h="svelte-mv93wo"><div class="px-5"><div class="py-1 px-5 text-center rounded-lg hover:bg-surface-500 hover:text-white"><span class="badge bg-primary-500 text-white">1</span> <span class="flex-auto">Enter a medical record in the box below</span></div></div> <div class="px-5"><div class="py-1 px-5 text-center rounded-lg hover:bg-surface-500 hover:text-white"><span class="badge bg-primary-500 text-white">2</span> <span class="flex-auto">Select which model to use for annotations</span></div></div>  <div class="px-5"><div class="py-1 px-5 text-center rounded-lg hover:bg-surface-500 hover:text-white"><span class="badge bg-primary-500 text-white">3</span> <span class="flex-auto">Click &quot;Annotate&quot; to see the results</span></div></div></div> <div class="py-5"></div> <div class="grid grid-cols-5 space-x-5"><div class="card p-5 col-span-2"><textarea class="textarea" rows="8" cols="50" placeholder="Enter a medical record here" ${""}>${escape(text || "")}</textarea> <div class="py-3 col-span-1"> <div class="py-1"></div> <div class="px-5"><p class="text-sm italic" data-svelte-h="svelte-1uavv4p">Select model for annotations:</p> <select class="select" id="model"><option${add_attribute("value", ModelType.FLANT5, 0)}>${escape(modelTypeToString(ModelType.FLANT5))}</option><option${add_attribute("value", ModelType.UIE, 0)}>${escape(modelTypeToString(ModelType.UIE))}</option></select> <div class="py-2"></div>   <div class="py-2"></div> <div class="flex justify-center"><button class="btn variant-filled-primary rounded-md w-full bg-primary-600 text-white" ${""}>Annotate</button></div></div> ${``}</div></div> <div class="container card p-4 col-span-3"><div data-svelte-h="svelte-1lrlru7"><h3 class="h3">Results</h3></div> <div class="py-3"></div> <div>${validate_component(AnnotatedRecord2, "AnnotatedRecord2").$$render($$result, { data: result }, {}, {})} <div class="py-3"></div> ${validate_component(CodeBlock, "CodeBlock").$$render(
    $$result,
    {
      code: JSON.stringify(result),
      text: "text-xs",
      language: "json"
    },
    {},
    {}
  )}</div></div></div></div>`;
});
export {
  Page as default
};
