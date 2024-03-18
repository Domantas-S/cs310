import { c as create_ssr_component, f as createEventDispatcher, e as escape, d as each, h as add_attribute, t as onDestroy, p as spread, r as escape_object, g as getContext, s as setContext, b as subscribe, u as set_store_value, v as validate_component, w as null_to_empty, m as missing_component } from "../../../chunks/ssr.js";
import { M as ModelType, m as modelTypeToString, D as DataSource, d as dataSourceToString } from "../../../chunks/datatypes.js";
import { c as checkIconState, a as generateIcon, g as getModalStore } from "../../../chunks/functions.js";
import dataIcon from "@iconify/icons-material-symbols/code.js";
import notesIcon from "@iconify/icons-material-symbols/notes.js";
import compareIcon from "@iconify/icons-material-symbols/compare.js";
import { w as writable, r as readable } from "../../../chunks/index.js";
import { g as getToastStore } from "../../../chunks/stores.js";
import contentCopy from "@iconify/icons-material-symbols/content-copy.js";
import { A as AnnotatedRecord2 } from "../../../chunks/AnnotatedRecord2.js";
import "fs";
import closeIcon from "@iconify/icons-material-symbols/close.js";
import plusIcon from "@iconify/icons-material-symbols/add.js";
import "@iconify/icons-material-symbols/visibility.js";
import "@iconify/icons-material-symbols/file-upload.js";
import infoIcon from "@iconify/icons-material-symbols/info.js";
const leftArrow = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>`;
const rightArrow = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>`;
const leftAngles = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>`;
const rightAngles = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>`;
const cBase = "flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4";
const cLabel = "w-full md:w-auto";
const Paginator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesButtonActive;
  let classesBase;
  let classesLabel;
  let classesSelect;
  let classesControls;
  const dispatch = createEventDispatcher();
  let { settings = {
    page: 0,
    limit: 5,
    size: 0,
    amounts: [1, 2, 5, 10]
  } } = $$props;
  let { disabled = false } = $$props;
  let { showPreviousNextButtons = true } = $$props;
  let { showFirstLastButtons = false } = $$props;
  let { showNumerals = false } = $$props;
  let { maxNumerals = 1 } = $$props;
  let { justify = "justify-between" } = $$props;
  let { select = "select min-w-[150px]" } = $$props;
  let { amountText = "Items" } = $$props;
  let { regionControl = "btn-group" } = $$props;
  let { controlVariant = "variant-filled" } = $$props;
  let { controlSeparator = "" } = $$props;
  let { active = "variant-filled-primary" } = $$props;
  let { buttonClasses = "!px-3 !py-1.5 fill-current" } = $$props;
  let { buttonTextPrevious = leftArrow } = $$props;
  let { buttonTextNext = rightArrow } = $$props;
  let { buttonTextFirst = leftAngles } = $$props;
  let { buttonTextLast = rightAngles } = $$props;
  let { separatorText = "of" } = $$props;
  let { labelFirst = "First page" } = $$props;
  let { labelPrevious = "Previous page" } = $$props;
  let { labelNext = "Next page" } = $$props;
  let { labelLast = "Last page" } = $$props;
  let lastPage = Math.max(0, Math.ceil(settings.size / settings.limit - 1));
  let controlPages = getNumerals();
  function onChangeLength() {
    dispatch("amount", settings.limit);
    lastPage = Math.max(0, Math.ceil(settings.size / settings.limit - 1));
    if (settings.page > lastPage) {
      settings.page = lastPage;
    }
    controlPages = getNumerals();
  }
  function getFullNumerals() {
    const pages = [];
    for (let index = 0; index <= lastPage; index++) {
      pages.push(index);
    }
    return pages;
  }
  function getNumerals() {
    const pages = [];
    const isWithinLeftSection = settings.page < maxNumerals + 2;
    const isWithinRightSection = settings.page > lastPage - (maxNumerals + 2);
    if (lastPage <= maxNumerals * 2 + 1)
      return getFullNumerals();
    pages.push(0);
    if (!isWithinLeftSection)
      pages.push(-1);
    if (isWithinLeftSection || isWithinRightSection) {
      const sectionStart = isWithinLeftSection ? 1 : lastPage - (maxNumerals + 2);
      const sectionEnd = isWithinRightSection ? lastPage - 1 : maxNumerals + 2;
      for (let i = sectionStart; i <= sectionEnd; i++) {
        pages.push(i);
      }
    } else {
      for (let i = settings.page - maxNumerals; i <= settings.page + maxNumerals; i++) {
        pages.push(i);
      }
    }
    if (!isWithinRightSection)
      pages.push(-1);
    pages.push(lastPage);
    return pages;
  }
  function updateSize(size) {
    lastPage = Math.max(0, Math.ceil(size / settings.limit - 1));
    controlPages = getNumerals();
  }
  if ($$props.settings === void 0 && $$bindings.settings && settings !== void 0)
    $$bindings.settings(settings);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.showPreviousNextButtons === void 0 && $$bindings.showPreviousNextButtons && showPreviousNextButtons !== void 0)
    $$bindings.showPreviousNextButtons(showPreviousNextButtons);
  if ($$props.showFirstLastButtons === void 0 && $$bindings.showFirstLastButtons && showFirstLastButtons !== void 0)
    $$bindings.showFirstLastButtons(showFirstLastButtons);
  if ($$props.showNumerals === void 0 && $$bindings.showNumerals && showNumerals !== void 0)
    $$bindings.showNumerals(showNumerals);
  if ($$props.maxNumerals === void 0 && $$bindings.maxNumerals && maxNumerals !== void 0)
    $$bindings.maxNumerals(maxNumerals);
  if ($$props.justify === void 0 && $$bindings.justify && justify !== void 0)
    $$bindings.justify(justify);
  if ($$props.select === void 0 && $$bindings.select && select !== void 0)
    $$bindings.select(select);
  if ($$props.amountText === void 0 && $$bindings.amountText && amountText !== void 0)
    $$bindings.amountText(amountText);
  if ($$props.regionControl === void 0 && $$bindings.regionControl && regionControl !== void 0)
    $$bindings.regionControl(regionControl);
  if ($$props.controlVariant === void 0 && $$bindings.controlVariant && controlVariant !== void 0)
    $$bindings.controlVariant(controlVariant);
  if ($$props.controlSeparator === void 0 && $$bindings.controlSeparator && controlSeparator !== void 0)
    $$bindings.controlSeparator(controlSeparator);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.buttonClasses === void 0 && $$bindings.buttonClasses && buttonClasses !== void 0)
    $$bindings.buttonClasses(buttonClasses);
  if ($$props.buttonTextPrevious === void 0 && $$bindings.buttonTextPrevious && buttonTextPrevious !== void 0)
    $$bindings.buttonTextPrevious(buttonTextPrevious);
  if ($$props.buttonTextNext === void 0 && $$bindings.buttonTextNext && buttonTextNext !== void 0)
    $$bindings.buttonTextNext(buttonTextNext);
  if ($$props.buttonTextFirst === void 0 && $$bindings.buttonTextFirst && buttonTextFirst !== void 0)
    $$bindings.buttonTextFirst(buttonTextFirst);
  if ($$props.buttonTextLast === void 0 && $$bindings.buttonTextLast && buttonTextLast !== void 0)
    $$bindings.buttonTextLast(buttonTextLast);
  if ($$props.separatorText === void 0 && $$bindings.separatorText && separatorText !== void 0)
    $$bindings.separatorText(separatorText);
  if ($$props.labelFirst === void 0 && $$bindings.labelFirst && labelFirst !== void 0)
    $$bindings.labelFirst(labelFirst);
  if ($$props.labelPrevious === void 0 && $$bindings.labelPrevious && labelPrevious !== void 0)
    $$bindings.labelPrevious(labelPrevious);
  if ($$props.labelNext === void 0 && $$bindings.labelNext && labelNext !== void 0)
    $$bindings.labelNext(labelNext);
  if ($$props.labelLast === void 0 && $$bindings.labelLast && labelLast !== void 0)
    $$bindings.labelLast(labelLast);
  classesButtonActive = (page) => {
    return page === settings.page ? `${active} pointer-events-none` : "";
  };
  {
    onChangeLength();
  }
  {
    updateSize(settings.size);
  }
  classesBase = `${cBase} ${justify} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel}`;
  classesSelect = `${select}`;
  classesControls = `${regionControl} ${controlVariant} ${controlSeparator}`;
  return `<div class="${"paginator " + escape(classesBase, true)}" data-testid="paginator"> ${settings.amounts.length ? `<label class="${"paginator-label " + escape(classesLabel, true)}"><select class="${"paginator-select " + escape(classesSelect, true)}" ${disabled ? "disabled" : ""} aria-label="Select Amount">${each(settings.amounts, (amount) => {
    return `<option${add_attribute("value", amount, 0)}>${escape(amount)} ${escape(amountText)}</option>`;
  })}</select></label>` : ``}  <div class="${"paginator-controls " + escape(classesControls, true)}"> ${showFirstLastButtons ? `<button type="button"${add_attribute("aria-label", labelFirst, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || settings.page === 0 ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextFirst}<!-- HTML_TAG_END --></button>` : ``}  ${showPreviousNextButtons ? `<button type="button"${add_attribute("aria-label", labelPrevious, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || settings.page === 0 ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextPrevious}<!-- HTML_TAG_END --></button>` : ``}  ${showNumerals === false ? ` <button type="button" class="${escape(buttonClasses, true) + " pointer-events-none !text-sm"}">${escape(settings.page * settings.limit + 1)}-${escape(Math.min(settings.page * settings.limit + settings.limit, settings.size))} <span class="opacity-50">${escape(separatorText)} ${escape(settings.size)}</span></button>` : ` ${each(controlPages, (page) => {
    return `<button type="button" class="${escape(buttonClasses, true) + " " + escape(classesButtonActive(page), true)}">${escape(page >= 0 ? page + 1 : "...")} </button>`;
  })}`}  ${showPreviousNextButtons ? `<button type="button"${add_attribute("aria-label", labelNext, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || (settings.page + 1) * settings.limit >= settings.size ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextNext}<!-- HTML_TAG_END --></button>` : ``}  ${showFirstLastButtons ? `<button type="button"${add_attribute("aria-label", labelLast, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || (settings.page + 1) * settings.limit >= settings.size ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextLast}<!-- HTML_TAG_END --></button>` : ``}</div></div>`;
});
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const state = {
    // Last icon name
    name: "",
    // Loading status
    loading: null,
    // Destroyed status
    destroyed: false
  };
  let mounted = false;
  let data;
  const onLoad = (icon) => {
    if (typeof $$props.onLoad === "function") {
      $$props.onLoad(icon);
    }
    const dispatch = createEventDispatcher();
    dispatch("load", { icon });
  };
  function loaded() {
  }
  onDestroy(() => {
    state.destroyed = true;
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  });
  {
    {
      const iconData = checkIconState($$props.icon, state, mounted, loaded, onLoad);
      data = iconData ? generateIcon(iconData.data, $$props) : null;
      if (data && iconData.classes) {
        data.attributes["class"] = (typeof $$props["class"] === "string" ? $$props["class"] + " " : "") + iconData.classes.join(" ");
      }
    }
  }
  return `${data ? `${data.svg ? `<svg${spread([escape_object(data.attributes)], {})}><!-- HTML_TAG_START -->${data.body}<!-- HTML_TAG_END --></svg>` : `<span${spread([escape_object(data.attributes)], {})}></span>`}` : ``}`;
});
const STATE = {};
function useState(newState, opts) {
  const currentState = getContext(STATE);
  const _newState = typeof newState === "function" ? newState(currentState) : newState;
  const nextState = { ...currentState, ..._newState };
  if (opts?.expandable)
    nextState.isParentExpanded = nextState.expanded;
  setContext(STATE, nextState);
  return currentState;
}
const JSONArrow_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".container.svelte-1qd6nto{display:inline-block;transform:translate(calc(0px - var(--li-identation)), -50%);position:absolute;top:50%;padding-right:100%}.arrow.svelte-1qd6nto{transform-origin:25% 50%;position:relative;line-height:1.1em;font-size:0.75em;margin-left:0;transition:150ms;color:var(--arrow-color);user-select:none;font-family:'Courier New', Courier, monospace;display:block}.expanded.svelte-1qd6nto{transform:rotateZ(90deg) translateX(-3px)}",
  map: null
};
const JSONArrow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $expandable, $$unsubscribe_expandable;
  let $expanded, $$unsubscribe_expanded;
  const { expanded: _expanded, expandable } = useState();
  $$unsubscribe_expandable = subscribe(expandable, (value) => $expandable = value);
  let { expanded = _expanded } = $$props;
  $$unsubscribe_expanded = subscribe(expanded, (value) => $expanded = value);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  $$result.css.add(css$8);
  $$unsubscribe_expandable();
  $$unsubscribe_expanded();
  return `${$expandable ? ` <span class="container svelte-1qd6nto"><span class="${["arrow svelte-1qd6nto", $expanded ? "expanded" : ""].join(" ").trim()}">${escape("▶")}</span></span>` : ``}`;
});
const Summary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  useState({ displayMode: "summary" });
  return `${slots.default ? slots.default({}) : ``}`;
});
const Expandable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { expanded } = $$props;
  let { key } = $$props;
  const expandable = writable(false);
  useState(({ keyPath, level }) => {
    if (key !== "[[Entries]]") {
      keyPath = [...keyPath, key];
      level = level + 1;
    }
    return { keyPath, level, expanded, expandable };
  });
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  return `${slots.default ? slots.default({}) : ``}`;
});
const JSONNested_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".root.svelte-19drypg{display:inline-block;position:relative}.indent.svelte-19drypg{padding-left:var(--li-identation)}.label.svelte-19drypg{position:relative}",
  map: null
};
const JSONNested = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let child_expanded;
  let $expanded, $$unsubscribe_expanded;
  let $expandable, $$unsubscribe_expandable;
  let { keys } = $$props;
  let { shouldShowColon = void 0 } = $$props;
  let { expandKey = (key) => key } = $$props;
  let { defaultExpanded = false } = $$props;
  const { isParentExpanded, displayMode, root, expanded, expandable, keyPath, level, shouldExpandNode } = useState({ root: false }, { expandable: true });
  $$unsubscribe_expanded = subscribe(expanded, (value) => $expanded = value);
  $$unsubscribe_expandable = subscribe(expandable, (value) => $expandable = value);
  set_store_value(expandable, $expandable = true, $expandable);
  if (displayMode !== "summary") {
    if (!defaultExpanded) {
      const controlled = shouldExpandNode({ keyPath, level });
      if (controlled !== void 0) {
        defaultExpanded = controlled;
      }
    }
  }
  if ($$props.keys === void 0 && $$bindings.keys && keys !== void 0)
    $$bindings.keys(keys);
  if ($$props.shouldShowColon === void 0 && $$bindings.shouldShowColon && shouldShowColon !== void 0)
    $$bindings.shouldShowColon(shouldShowColon);
  if ($$props.expandKey === void 0 && $$bindings.expandKey && expandKey !== void 0)
    $$bindings.expandKey(expandKey);
  if ($$props.defaultExpanded === void 0 && $$bindings.defaultExpanded && defaultExpanded !== void 0)
    $$bindings.defaultExpanded(defaultExpanded);
  $$result.css.add(css$7);
  child_expanded = keys.map(() => writable(false));
  $$unsubscribe_expanded();
  $$unsubscribe_expandable();
  return `${displayMode === "summary" ? `${slots.summary ? slots.summary({}) : ``}` : ` <span class="root svelte-19drypg">${root ? `${validate_component(JSONArrow, "JSONArrow").$$render($$result, { expanded }, {}, {})}` : ``} ${validate_component(Summary, "Summary").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.preview ? slots.preview({ root }) : ``}`;
    }
  })}</span> ${$expanded ? ` <ul>${each(keys, (key, index) => {
    return ` <li class="${["svelte-19drypg", $expanded ? "indent" : ""].join(" ").trim()}">${validate_component(Expandable, "Expandable").$$render(
      $$result,
      {
        key: expandKey(key),
        expanded: child_expanded[index]
      },
      {},
      {
        default: () => {
          return ` <span class="label svelte-19drypg">${validate_component(JSONArrow, "JSONArrow").$$render($$result, {}, {}, {})}${slots.item_key ? slots.item_key({ key, index }) : ``}${!shouldShowColon || shouldShowColon(key) ? `<span class="operator" data-svelte-h="svelte-135sc5v">:</span>` : ``} </span>${slots.item_value ? slots.item_value({ key, index }) : ``} `;
        }
      }
    )} </li>`;
  })}</ul>` : ``}`}`;
});
const PreviewList_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".comma.svelte-150ffaa{margin-left:-0.5em;margin-right:0.5em}",
  map: null
};
const PreviewList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { list } = $$props;
  let { hasMore } = $$props;
  let { label = void 0 } = $$props;
  let { prefix = void 0 } = $$props;
  let { postfix = void 0 } = $$props;
  let { root = false } = $$props;
  const { showPreview } = useState();
  if ($$props.list === void 0 && $$bindings.list && list !== void 0)
    $$bindings.list(list);
  if ($$props.hasMore === void 0 && $$bindings.hasMore && hasMore !== void 0)
    $$bindings.hasMore(hasMore);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.prefix === void 0 && $$bindings.prefix && prefix !== void 0)
    $$bindings.prefix(prefix);
  if ($$props.postfix === void 0 && $$bindings.postfix && postfix !== void 0)
    $$bindings.postfix(postfix);
  if ($$props.root === void 0 && $$bindings.root && root !== void 0)
    $$bindings.root(root);
  $$result.css.add(css$6);
  return `${root || showPreview ? `${prefix ? `${label ? `<span class="label">${escape(label)}</span>` : ``}<span class="operator">${escape(prefix)}</span>` : ``} ${each(list, (item, index) => {
    return `${slots.item ? slots.item({ item, index }) : ``} ${index < list.length - 1 ? `<span class="comma operator svelte-150ffaa" data-svelte-h="svelte-vbp4a2">,</span>` : ``}`;
  })} ${hasMore ? `<span class="comma operator svelte-150ffaa" data-svelte-h="svelte-vbp4a2">,</span> <span class="operator" data-svelte-h="svelte-obkcif">…</span>` : ``} ${postfix ? `<span class="operator">${escape(postfix)}</span>` : ``}` : ``}`;
});
const JSONObjectNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let keys;
  let previewKeys;
  let { value } = $$props;
  let { summary } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.summary === void 0 && $$bindings.summary && summary !== void 0)
    $$bindings.summary(summary);
  keys = Object.getOwnPropertyNames(value);
  previewKeys = keys.slice(0, 5);
  return `${validate_component(JSONNested, "JSONNested").$$render($$result, { keys }, {}, {
    item_value: ({ key }) => {
      return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: value[key] }, {}, {})}`;
    },
    item_key: ({ key }) => {
      return `<span class="property">${escape(key)}</span>`;
    },
    preview: ({ root }) => {
      return `${validate_component(PreviewList, "PreviewList").$$render(
        $$result,
        {
          list: previewKeys,
          hasMore: previewKeys.length < keys.length,
          prefix: summary ? `${summary} {` : "{",
          postfix: "}",
          root
        },
        {},
        {
          item: ({ item }) => {
            return `<span class="property">${escape(item)}</span><span class="operator">${escape(": ")}</span>${validate_component(JSONNode, "JSONNode").$$render($$result, { value: value[item] }, {}, {})}`;
          }
        }
      )} `;
    },
    summary: () => {
      return `<span class="label">${escape(summary ?? "{…}")}</span>`;
    }
  })}`;
});
const JSONArrayNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let keys;
  let preview;
  let { value } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  keys = Object.getOwnPropertyNames(value);
  preview = value.slice(0, 5);
  return `${validate_component(JSONNested, "JSONNested").$$render($$result, { keys }, {}, {
    item_value: ({ key }) => {
      return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: value[key] }, {}, {})}`;
    },
    item_key: ({ key }) => {
      return `<span class="property">${escape(String(key))}</span>`;
    },
    preview: ({ root }) => {
      return `${validate_component(PreviewList, "PreviewList").$$render(
        $$result,
        {
          list: preview,
          hasMore: preview.length < value.length,
          label: "(" + value.length + ") ",
          prefix: "[",
          postfix: "]",
          root
        },
        {},
        {
          item: ({ item }) => {
            return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: item }, {}, {})}`;
          }
        }
      )} `;
    },
    summary: () => {
      return `<span class="label">Array(${escape(value.length)})</span>`;
    }
  })}`;
});
const ENTRIES$1 = "[[Entries]]";
const JSONIterableArrayNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let previewItems;
  let { value } = $$props;
  let { nodeType } = $$props;
  let indexes = [];
  let items = [];
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.nodeType === void 0 && $$bindings.nodeType && nodeType !== void 0)
    $$bindings.nodeType(nodeType);
  {
    {
      let _indexes = [];
      let _items = [];
      let i = 0;
      for (const entry of value) {
        _indexes.push(i++);
        _items.push(entry);
      }
      indexes = _indexes;
      items = _items;
    }
  }
  previewItems = items.slice(0, 5);
  return `${validate_component(JSONNested, "JSONNested").$$render(
    $$result,
    {
      keys: [ENTRIES$1, "size"],
      shouldShowColon: (key) => key !== ENTRIES$1
    },
    {},
    {
      item_value: ({ key }) => {
        return `${key === ENTRIES$1 ? `${validate_component(JSONNested, "JSONNested").$$render($$result, { keys: indexes, defaultExpanded: true }, {}, {
          item_value: ({ key: index }) => {
            return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: items[index] }, {}, {})}`;
          },
          item_key: ({ key: index }) => {
            return `<span class="property">${escape(index)}</span>`;
          }
        })}` : `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: value[key] }, {}, {})}`} `;
      },
      item_key: ({ key }) => {
        return `<span${add_attribute("class", key === ENTRIES$1 ? "internal" : "property", 0)}>${escape(key)}</span>`;
      },
      preview: ({ root }) => {
        return `${validate_component(PreviewList, "PreviewList").$$render(
          $$result,
          {
            list: previewItems,
            hasMore: previewItems.length < items.length,
            label: `${nodeType}(${indexes.length}) `,
            prefix: "{",
            postfix: "}",
            root
          },
          {},
          {
            item: ({ item }) => {
              return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: item }, {}, {})}`;
            }
          }
        )} `;
      },
      summary: () => {
        return `<span class="label">${escape(nodeType)}(${escape(indexes.length)})</span>`;
      }
    }
  )}`;
});
const ENTRIES = "[[Entries]]";
const JSONIterableMapNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let previewKeys;
  let { value } = $$props;
  useState();
  let indexes = [];
  let keys = [];
  let values = [];
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  {
    {
      let _indexes = [];
      let _keys = [];
      let _values = [];
      let i = 0;
      for (const entry of value) {
        _indexes.push(i++);
        _keys.push(entry[0]);
        _values.push(entry[1]);
      }
      indexes = _indexes;
      keys = _keys;
      values = _values;
    }
  }
  previewKeys = Array.from(value.keys()).slice(0, 5);
  return `${validate_component(JSONNested, "JSONNested").$$render(
    $$result,
    {
      keys: [ENTRIES, "size"],
      shouldShowColon: (key) => key !== ENTRIES
    },
    {},
    {
      item_value: ({ key }) => {
        return `${key === ENTRIES ? `${validate_component(JSONNested, "JSONNested").$$render(
          $$result,
          {
            keys: indexes,
            expandKey: (index) => keys[index],
            defaultExpanded: true
          },
          {},
          {
            item_value: ({ key: index }) => {
              return `${validate_component(JSONNested, "JSONNested").$$render($$result, { keys: ["key", "value"] }, {}, {
                item_value: ({ key: name }) => {
                  return `${validate_component(JSONNode, "JSONNode").$$render(
                    $$result,
                    {
                      value: name === "key" ? keys[index] : values[index]
                    },
                    {},
                    {}
                  )}`;
                },
                item_key: ({ key: name }) => {
                  return `<span class="property">${escape(name)}</span>`;
                },
                preview: () => {
                  return `<span class="operator">${escape("{ ")}</span>${validate_component(JSONNode, "JSONNode").$$render($$result, { value: keys[index] }, {}, {})}<span class="operator">${escape(" => ")}</span>${validate_component(JSONNode, "JSONNode").$$render($$result, { value: values[index] }, {}, {})}<span class="operator">${escape(" }")}</span>`;
                }
              })} `;
            },
            item_key: ({ key: index }) => {
              return `<span class="property">${escape(index)}</span>`;
            }
          }
        )}` : `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: value[key] }, {}, {})}`} `;
      },
      item_key: ({ key }) => {
        return `<span${add_attribute("class", key === ENTRIES ? "internal" : "property", 0)}>${escape(key)}</span>`;
      },
      preview: ({ root }) => {
        return `${validate_component(PreviewList, "PreviewList").$$render(
          $$result,
          {
            list: previewKeys,
            hasMore: previewKeys.length < value.size,
            label: `Map(${keys.length}) `,
            prefix: `{`,
            postfix: "}",
            root
          },
          {},
          {
            item: ({ item }) => {
              return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: item }, {}, {})}<span class="operator">${escape(" => ")}</span>${validate_component(JSONNode, "JSONNode").$$render($$result, { value: value.get(item) }, {}, {})}`;
            }
          }
        )} `;
      },
      summary: () => {
        return `<span color="label">Map(${escape(keys.length)})</span>`;
      }
    }
  )}`;
});
const JSONValueNode_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".Date.svelte-l95iub{color:var(--date-color)}.BigInt.svelte-l95iub{color:var(--number-color)}.Number.svelte-l95iub{color:var(--number-color)}.Boolean.svelte-l95iub{color:var(--boolean-color)}.Null.svelte-l95iub{color:var(--null-color)}.Undefined.svelte-l95iub{color:var(--undefined-color)}.Symbol.svelte-l95iub{color:var(--symbol-color)}",
  map: null
};
const JSONValueNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value, nodeType } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.nodeType === void 0 && $$bindings.nodeType && nodeType !== void 0)
    $$bindings.nodeType(nodeType);
  $$result.css.add(css$5);
  return `<span class="${escape(null_to_empty(nodeType), true) + " svelte-l95iub"}">${escape(value)} </span>`;
});
const ErrorStack_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".indent.svelte-1u08yw6{padding-left:var(--li-identation)}",
  map: null
};
const ErrorStack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $expandable, $$unsubscribe_expandable;
  let $expanded, $$unsubscribe_expanded;
  let { stack } = $$props;
  const { expanded, expandable } = useState();
  $$unsubscribe_expanded = subscribe(expanded, (value) => $expanded = value);
  $$unsubscribe_expandable = subscribe(expandable, (value) => $expandable = value);
  set_store_value(expandable, $expandable = true, $expandable);
  if ($$props.stack === void 0 && $$bindings.stack && stack !== void 0)
    $$bindings.stack(stack);
  $$result.css.add(css$4);
  $$unsubscribe_expandable();
  $$unsubscribe_expanded();
  return ` <span>${$expanded ? `${each(stack, (line, index) => {
    let appendNewLine = index < stack.length - 1;
    return ` <span class="${["svelte-1u08yw6", index > 0 ? "indent" : ""].join(" ").trim()}">${validate_component(JSONNode, "JsonNode").$$render(
      $$result,
      {
        value: line + (appendNewLine ? "\\n" : "")
      },
      {},
      {}
    )}<span class="operator">${escape(appendNewLine ? " +" : "")}</span></span><br>`;
  })}` : `<span>${validate_component(JSONNode, "JsonNode").$$render($$result, { value: stack[0] + "…" }, {}, {})}</span>`} </span>`;
});
const ErrorNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let stack;
  let { value } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  stack = value.stack.split("\n");
  return `${validate_component(JSONNested, "JsonNested").$$render($$result, { keys: ["message", "stack"] }, {}, {
    item_value: ({ key }) => {
      return `${key === "stack" ? `${validate_component(ErrorStack, "ErrorStack").$$render($$result, { stack }, {}, {})}` : `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: value[key] }, {}, {})}`} `;
    },
    item_key: ({ key }) => {
      return `<span class="property">${escape(key)}</span>`;
    },
    preview: () => {
      return `<span class="label">Error: ${escape(String(value.message))}</span>`;
    },
    summary: () => {
      return `<span class="label">Error: ${escape(String(value.message))}</span>`;
    }
  })}`;
});
function objType(obj, shouldTreatIterableAsObject) {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  if (type === "Object") {
    if (!shouldTreatIterableAsObject && typeof obj[Symbol.iterator] === "function") {
      return "Iterable";
    }
    return obj.constructor.name;
  }
  return type;
}
const JSONStringNode_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "span.svelte-1fvwa9c{color:var(--string-color);word-break:break-all;word-wrap:break-word}",
  map: null
};
const JSONStringNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let serialised;
  let { value } = $$props;
  const map = { "\n": "\\n", "	": "\\t", "\r": "\\r" };
  const { displayMode } = useState();
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css$3);
  serialised = value.replace(/[\n\t\r]/g, (_) => map[_]);
  return `${displayMode === "summary" ? `<span class="svelte-1fvwa9c">&quot;${escape(serialised.slice(0, 30) + (serialised.length > 30 ? "…" : ""))}&quot;</span>` : `<span class="svelte-1fvwa9c">&quot;${escape(serialised)}&quot;</span>`}`;
});
const JSONFunctionNode_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".i.svelte-1eamqdt{font-style:italic}.fn.svelte-1eamqdt,.i.svelte-1eamqdt{color:var(--function-color)}",
  map: null
};
const FUNCTION = "[[Function]]";
const PROTO = "[[Prototype]]";
function parseFunction(str2) {
  const match = str2.match(/^(?:(async)\s+)?(?:function)?(\*)?\s*([^(]+)?(\([^)]*\))\s*(=>)?/);
  const isAsync = match?.[1];
  const isGenerator = match?.[2];
  const fnName = match?.[3];
  const args = match?.[4];
  const isArrow = match?.[5];
  const classMatch = str2.match(/^class\s+([^\s]+)/);
  const isClass = classMatch?.[1];
  return {
    args,
    isAsync,
    isGenerator,
    fnName,
    isArrow,
    isClass
  };
}
function getPreview1({ isGenerator, isAsync, isClass }) {
  if (isClass)
    return `class ${isClass}`;
  return (isAsync ? "async " : "") + "ƒ" + (isGenerator ? "*" : "");
}
function getPreview2({ isAsync, isArrow, fnName, args }) {
  return (isArrow && isAsync ? "async" : "") + " " + (fnName ?? "") + args + (isArrow ? " => …" : "");
}
function toString(value2) {
  try {
    return value2.toString();
  } catch {
    switch (value2.constructor.name) {
      case "AsyncFunction":
        return "async function () {}";
      case "AsyncGeneratorFunction":
        return "async function * () {}";
      case "GeneratorFunction:":
        return "function * () {}";
      default:
        return "function () {}";
    }
  }
}
const JSONFunctionNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let str;
  let ctx;
  let keys;
  let { value } = $$props;
  function getValue(key) {
    if (key === PROTO)
      return value.__proto__;
    return value[key];
  }
  function filterKeys(key) {
    if (key === FUNCTION)
      return true;
    return getValue(key);
  }
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css$2);
  str = toString(value);
  ctx = parseFunction(str);
  keys = ["length", "name", "prototype", FUNCTION, PROTO].filter(filterKeys);
  return `${validate_component(JSONNested, "JSONNested").$$render($$result, { keys }, {}, {
    item_value: ({ key }) => {
      return `${key === FUNCTION ? `<span class="i svelte-1eamqdt">${escape(str)}</span>` : `${key === "prototype" ? `${validate_component(JSONObjectNode, "JsonObjectNode").$$render($$result, { value: getValue(key) }, {}, {})}` : `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: getValue(key) }, {}, {})}`}`}`;
    },
    item_key: ({ key }) => {
      return `<span${add_attribute(
        "class",
        key === FUNCTION || key === PROTO ? "internal" : "property",
        0
      )}>${escape(key)}</span>`;
    },
    preview: () => {
      return `${!ctx.isArrow ? `<span class="fn i svelte-1eamqdt">${escape(getPreview1(ctx))}</span>` : ``}${!ctx.isClass ? `<span class="i svelte-1eamqdt">${escape(getPreview2(ctx))}</span>` : ``}`;
    },
    summary: () => {
      return `<span class="i svelte-1eamqdt" data-svelte-h="svelte-migemc">ƒ</span>`;
    }
  })}`;
});
const STORE_VALUE = "$value";
const JSONSvelteStoreNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let objectKeys;
  let keys;
  let previewKeys;
  let storeValue;
  let isWritableStore;
  let $value, $$unsubscribe_value;
  let { value } = $$props;
  $$unsubscribe_value = subscribe(value, (value2) => $value = value2);
  function getValue(key) {
    if (key === STORE_VALUE)
      return storeValue;
    return value[key];
  }
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  objectKeys = Object.getOwnPropertyNames(value);
  keys = [STORE_VALUE, ...objectKeys];
  previewKeys = objectKeys.slice(0, 5);
  storeValue = $value;
  isWritableStore = typeof value.set === "function";
  $$unsubscribe_value();
  return `${validate_component(JSONNested, "JSONNested").$$render($$result, { keys }, {}, {
    item_value: ({ key }) => {
      return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: getValue(key) }, {}, {})} `;
    },
    item_key: ({ key }) => {
      return `<span${add_attribute("class", key === STORE_VALUE ? "internal" : "property", 0)}>${escape(key)}</span>`;
    },
    preview: ({ root }) => {
      return `${validate_component(PreviewList, "PreviewList").$$render(
        $$result,
        {
          list: previewKeys,
          hasMore: previewKeys.length < objectKeys.length,
          prefix: "{",
          postfix: "}",
          root
        },
        {},
        {
          item: ({ item }) => {
            return `<span class="property">${escape(item)}</span><span class="operator">${escape(": ")}</span>${validate_component(JSONNode, "JSONNode").$$render($$result, { value: value[item] }, {}, {})}`;
          }
        }
      )} `;
    },
    summary: () => {
      return `<span class="label">${escape(isWritableStore ? "writable(" : "readable(")}${validate_component(JSONNode, "JSONNode").$$render($$result, { value: storeValue }, {}, {})}${escape(")")}</span>`;
    }
  })}`;
});
const TO_STRING_TAG = "Symbol(Symbol.toStringTag)";
const TypedArrayNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let keys;
  let preview;
  let { value } = $$props;
  let { nodeType } = $$props;
  const internalKeys = ["buffer", "byteLength", "byteOffset", "length", TO_STRING_TAG];
  function getValue(key) {
    if (key === TO_STRING_TAG) {
      return value[Symbol.toStringTag];
    }
    return value[key];
  }
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.nodeType === void 0 && $$bindings.nodeType && nodeType !== void 0)
    $$bindings.nodeType(nodeType);
  keys = [...Object.getOwnPropertyNames(value), ...internalKeys];
  preview = value.slice(0, 5);
  return `${validate_component(JSONNested, "JSONNested").$$render($$result, { keys }, {}, {
    item_value: ({ key }) => {
      return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: getValue(key) }, {}, {})}`;
    },
    item_key: ({ key }) => {
      return `<span${add_attribute("class", internalKeys.includes(key) ? "internal" : "property", 0)}>${escape(String(key))}</span>`;
    },
    preview: ({ root }) => {
      return `${validate_component(PreviewList, "PreviewList").$$render(
        $$result,
        {
          list: preview,
          hasMore: preview.length < value.length,
          label: nodeType + "(" + value.length + ") ",
          prefix: "[",
          postfix: "]",
          root
        },
        {},
        {
          item: ({ item }) => {
            return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: item }, {}, {})}`;
          }
        }
      )} `;
    },
    summary: () => {
      return `<span class="label">${escape(nodeType)}(${escape(value.length)})</span>`;
    }
  })}`;
});
const RegExpNode_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".regex.svelte-17k1wqt{color:var(--regex-color)}",
  map: null
};
const RegExpNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let str;
  let { value } = $$props;
  const keys = [
    "lastIndex",
    "dotAll",
    "flags",
    "global",
    "hasIndices",
    "ignoreCase",
    "multiline",
    "source",
    "sticky",
    "unicode"
  ];
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css$1);
  str = value.toString();
  return `${validate_component(JSONNested, "JSONNested").$$render($$result, { keys }, {}, {
    item_value: ({ key }) => {
      return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value: value[key] }, {}, {})}`;
    },
    item_key: ({ key }) => {
      return `<span class="internal">${escape(String(key))}</span>`;
    },
    preview: () => {
      return `<span class="regex svelte-17k1wqt">${escape(str)}</span>`;
    },
    summary: () => {
      return `<span class="regex svelte-17k1wqt">${escape(str)}</span>`;
    }
  })}`;
});
const JSONNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let componentType;
  let props;
  let $nodeType, $$unsubscribe_nodeType;
  let { value } = $$props;
  const nodeType = writable();
  $$unsubscribe_nodeType = subscribe(nodeType, (value2) => $nodeType = value2);
  const { shouldTreatIterableAsObject } = useState();
  function getComponentAndProps(nodeType2, value2) {
    switch (nodeType2) {
      case "Object":
        if (typeof value2.subscribe === "function")
          return [JSONSvelteStoreNode];
        return [JSONObjectNode];
      case "Error":
        return [ErrorNode];
      case "Array":
        return [JSONArrayNode];
      case "Map":
        return [JSONIterableMapNode];
      case "Iterable":
      case "Set":
        return [JSONIterableArrayNode, { nodeType: nodeType2 }];
      case "Number":
        return [JSONValueNode, { nodeType: nodeType2 }];
      case "String":
        return [JSONStringNode];
      case "Boolean":
        return [
          JSONValueNode,
          {
            nodeType: nodeType2,
            value: value2 ? "true" : "false"
          }
        ];
      case "Date":
        return [
          JSONValueNode,
          {
            nodeType: nodeType2,
            value: value2.toISOString()
          }
        ];
      case "Null":
        return [JSONValueNode, { nodeType: nodeType2, value: "null" }];
      case "Undefined":
        return [JSONValueNode, { nodeType: nodeType2, value: "undefined" }];
      case "Function":
      case "AsyncFunction":
      case "AsyncGeneratorFunction":
      case "GeneratorFunction":
        return [JSONFunctionNode];
      case "Symbol":
        return [
          JSONValueNode,
          {
            nodeType: nodeType2,
            value: value2.toString()
          }
        ];
      case "BigInt":
        return [
          JSONValueNode,
          {
            nodeType: nodeType2,
            value: String(value2) + "n"
          }
        ];
      case "ArrayBuffer":
        return [
          JSONValueNode,
          {
            nodeType: nodeType2,
            value: `ArrayBuffer(${value2.byteLength})`
          }
        ];
      case "BigInt64Array":
      case "BigUint64Array":
      case "Float32Array":
      case "Float64Array":
      case "Int8Array":
      case "Int16Array":
      case "Int32Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Uint16Array":
      case "Uint32Array":
        return [TypedArrayNode, { nodeType: nodeType2 }];
      case "RegExp":
        return [RegExpNode];
      default:
        return [JSONObjectNode, { summary: nodeType2 }];
    }
  }
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  set_store_value(nodeType, $nodeType = objType(value, shouldTreatIterableAsObject), $nodeType);
  [componentType, props] = getComponentAndProps($nodeType, value);
  $$unsubscribe_nodeType();
  return `${validate_component(componentType || missing_component, "svelte:component").$$render($$result, Object.assign({}, { value }, props), {}, {})}`;
});
function getShouldExpandNode({ defaultExpandedPaths, defaultExpandedLevel }) {
  const defaultExpandedPathsParts = defaultExpandedPaths.map((path) => path.split("."));
  function matchPath(keyPath) {
    outer:
      for (const parts of defaultExpandedPathsParts) {
        if (keyPath.length > parts.length)
          continue;
        const length = Math.min(keyPath.length, parts.length);
        for (let i = 0; i < length; i++) {
          if (parts[i] !== "*" && parts[i] !== String(keyPath[i]))
            continue outer;
        }
        return true;
      }
    return false;
  }
  return function({ keyPath, level }) {
    return level <= defaultExpandedLevel || matchPath(keyPath);
  };
}
const Root_svelte_svelte_type_style_lang = "";
const css = {
  code: "ul.svelte-16cw61f{--string-color:var(--json-tree-string-color, #cb3f41);--symbol-color:var(--json-tree-symbol-color, #cb3f41);--boolean-color:var(--json-tree-boolean-color, #112aa7);--function-color:var(--json-tree-function-color, #112aa7);--number-color:var(--json-tree-number-color, #3029cf);--label-color:var(--json-tree-label-color, #871d8f);--property-color:var(--json-tree-property-color, #000000);--arrow-color:var(--json-tree-arrow-color, #727272);--operator-color:var(--json-tree-operator-color, #727272);--null-color:var(--json-tree-null-color, #8d8d8d);--undefined-color:var(--json-tree-undefined-color, #8d8d8d);--date-color:var(--json-tree-date-color, #8d8d8d);--internal-color:var(--json-tree-internal-color, grey);--regex-color:var(--json-tree-regex-color, var(--string-color));--li-identation:var(--json-tree-li-indentation, 1em);--li-line-height:var(--json-tree-li-line-height, 1.3);font-size:var(--json-tree-font-size, 12px);font-family:var(--json-tree-font-family, 'Courier New', Courier, monospace)}ul.svelte-16cw61f li{line-height:var(--li-line-height);display:var(--li-display, list-item);list-style:none}ul.svelte-16cw61f,ul.svelte-16cw61f ul{padding:0;margin:0}ul.svelte-16cw61f{margin-left:var(--li-identation)}ul.svelte-16cw61f{cursor:default}ul.svelte-16cw61f .label{color:var(--label-color)}ul.svelte-16cw61f .property{color:var(--property-color)}ul.svelte-16cw61f .internal{color:var(--internal-color)}ul.svelte-16cw61f .operator{color:var(--operator-color)}",
  map: null
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let shouldExpandNode;
  let { value } = $$props;
  let { shouldShowPreview = true } = $$props;
  let { shouldTreatIterableAsObject = false } = $$props;
  let { defaultExpandedPaths = [] } = $$props;
  let { defaultExpandedLevel = 0 } = $$props;
  const expanded = writable(true);
  useState({
    expanded,
    isParentExpanded: readable(true),
    root: true,
    shouldExpandNode: (opts) => shouldExpandNode(opts),
    level: 0,
    keyPath: [],
    showPreview: shouldShowPreview,
    shouldTreatIterableAsObject
  });
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.shouldShowPreview === void 0 && $$bindings.shouldShowPreview && shouldShowPreview !== void 0)
    $$bindings.shouldShowPreview(shouldShowPreview);
  if ($$props.shouldTreatIterableAsObject === void 0 && $$bindings.shouldTreatIterableAsObject && shouldTreatIterableAsObject !== void 0)
    $$bindings.shouldTreatIterableAsObject(shouldTreatIterableAsObject);
  if ($$props.defaultExpandedPaths === void 0 && $$bindings.defaultExpandedPaths && defaultExpandedPaths !== void 0)
    $$bindings.defaultExpandedPaths(defaultExpandedPaths);
  if ($$props.defaultExpandedLevel === void 0 && $$bindings.defaultExpandedLevel && defaultExpandedLevel !== void 0)
    $$bindings.defaultExpandedLevel(defaultExpandedLevel);
  $$result.css.add(css);
  shouldExpandNode = getShouldExpandNode({
    defaultExpandedPaths,
    defaultExpandedLevel
  });
  return `<ul class="svelte-16cw61f">${validate_component(Expandable, "Expandable").$$render($$result, { key: "$", expanded }, {}, {
    default: () => {
      return `${validate_component(JSONNode, "JSONNode").$$render($$result, { value }, {}, {})}`;
    }
  })} </ul>`;
});
const defaultButtonColor = "bg-primary-800";
const hoverButtonColor = "bg-primary-400";
const CopyButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getToastStore();
  let { data } = $$props;
  let buttonColor = defaultButtonColor;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<button${add_attribute("class", `absolute top-2 right-2 p-2 btn-icon btn-icon-sm ${buttonColor} hover:${hoverButtonColor}`, 0)} ${""}>${validate_component(Icon, "Icon").$$render($$result, { icon: contentCopy }, {}, {})}</button>`;
});
const JSONRecord = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = {} } = $$props;
  const value = { record: data };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="card rounded p-4 text-left" style="background-color: whitesmoke; position: relative;">${validate_component(CopyButton, "CopyButton").$$render($$result, { data: value }, {}, {})} <div style="--json-tree-font-size: 14px; --json-tree-li-indentation: 2em">${validate_component(Root, "JSONTree").$$render($$result, { value }, {}, {})}</div></div>`;
});
const ModelSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { model = ModelType.HUMAN } = $$props;
  let { exclude = [] } = $$props;
  let { disabled = false } = $$props;
  let allModels = [ModelType.HUMAN, ModelType.FLANT5, ModelType.UIE, ModelType.MISTRAL7B];
  let availableModels = allModels.filter((model2) => !exclude.includes(model2));
  if ($$props.model === void 0 && $$bindings.model && model !== void 0)
    $$bindings.model(model);
  if ($$props.exclude === void 0 && $$bindings.exclude && exclude !== void 0)
    $$bindings.exclude(exclude);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  {
    {
      model = model;
      exclude = exclude;
      disabled = disabled;
      console.log("ModelSelector: model = ", model);
    }
  }
  return `<select class="select" id="model" ${disabled ? "disabled" : ""}>${each(availableModels, (m) => {
    return `<option${add_attribute("value", m, 0)}>${escape(modelTypeToString(m))}</option>`;
  })}<option${add_attribute("value", null, 0)} disabled data-svelte-h="svelte-pqqc5h">More to come...</option></select>`;
});
const CompareRecords = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const blankRecord = {
    "id": "0",
    "context": "No record to display",
    "events": []
  };
  let { data = blankRecord } = $$props;
  let { source } = $$props;
  let { originalModel } = $$props;
  let comparisonData = null;
  let comparisonModel = originalModel;
  let { popupToggle = false } = $$props;
  async function getComparisonRecord() {
    const response = await fetch("/api/get_record?id=" + data.id + "&source=" + source + "&model=" + comparisonModel, { method: "GET" });
    if (response.ok) {
      try {
        comparisonData = await response.json();
      } catch (e) {
        console.error("Error retrieving comparison record! This record likely does not exist in this source.\n" + e);
        comparisonData = null;
      }
    } else {
      comparisonData = null;
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.originalModel === void 0 && $$bindings.originalModel && originalModel !== void 0)
    $$bindings.originalModel(originalModel);
  if ($$props.popupToggle === void 0 && $$bindings.popupToggle && popupToggle !== void 0)
    $$bindings.popupToggle(popupToggle);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        data = data;
        source = source;
        originalModel = originalModel;
        popupToggle = popupToggle;
        comparisonModel = comparisonModel;
        getComparisonRecord();
      }
    }
    $$rendered = `<div class="flex space-x-3"><div class="border rounded border-gray-300 p-1 text-center space-y-1"><h5>${escape(modelTypeToString(originalModel))}</h5> ${validate_component(AnnotatedRecord2, "AnnotatedRecord2").$$render($$result, { data, popupToggle }, {}, {})}</div> <span class="divider-vertical"></span> <div class="border rounded border-gray-300 p-1 text-center space-y-1">${validate_component(ModelSelector, "ModelSelector").$$render(
      $$result,
      { model: comparisonModel },
      {
        model: ($$value) => {
          comparisonModel = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${comparisonData == null ? `${validate_component(AnnotatedRecord2, "AnnotatedRecord2").$$render($$result, { data: blankRecord, popupToggle }, {}, {})}` : `${validate_component(AnnotatedRecord2, "AnnotatedRecord2").$$render($$result, { data: comparisonData, popupToggle }, {}, {})}`}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const Record = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { info } = $$props;
  let { currentRecord } = $$props;
  let { totalRecords } = $$props;
  let { raw = false } = $$props;
  let { source } = $$props;
  let { model } = $$props;
  let { popupToggle = false } = $$props;
  let { compareToggle = false } = $$props;
  if ($$props.info === void 0 && $$bindings.info && info !== void 0)
    $$bindings.info(info);
  if ($$props.currentRecord === void 0 && $$bindings.currentRecord && currentRecord !== void 0)
    $$bindings.currentRecord(currentRecord);
  if ($$props.totalRecords === void 0 && $$bindings.totalRecords && totalRecords !== void 0)
    $$bindings.totalRecords(totalRecords);
  if ($$props.raw === void 0 && $$bindings.raw && raw !== void 0)
    $$bindings.raw(raw);
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.model === void 0 && $$bindings.model && model !== void 0)
    $$bindings.model(model);
  if ($$props.popupToggle === void 0 && $$bindings.popupToggle && popupToggle !== void 0)
    $$bindings.popupToggle(popupToggle);
  if ($$props.compareToggle === void 0 && $$bindings.compareToggle && compareToggle !== void 0)
    $$bindings.compareToggle(compareToggle);
  {
    {
      info = info;
      currentRecord = currentRecord;
      totalRecords = totalRecords;
      raw = raw;
      popupToggle = popupToggle;
      compareToggle = compareToggle;
      source = source;
      model = model;
    }
  }
  return `<div class="border rounded border-gray-300 p-4"><div class="flex grid grid-cols-3"><p class="flex justify-begin"><i>${escape(`${currentRecord} / ${totalRecords}`)}</i></p> <p><strong>${escape(info.events[0].type)}</strong></p> <div class="flex justify-end space-x-2">${!raw ? ` <button class="btn-icon btn-icon-sm variant-filled" ${source === DataSource.USER_ANNOTATED ? "disabled" : ""}>${validate_component(Icon, "Icon").$$render($$result, { icon: compareIcon }, {}, {})}</button>  <button class="btn-icon btn-icon-sm variant-filled">${validate_component(Icon, "Icon").$$render($$result, { icon: notesIcon }, {}, {})}</button>` : ``} <button class="btn-icon btn-icon-sm variant-filled">${validate_component(Icon, "Icon").$$render($$result, { icon: dataIcon }, {}, {})}</button></div></div> <div class="py-2"></div>  ${!raw && !compareToggle ? `${validate_component(AnnotatedRecord2, "AnnotatedRecord2").$$render($$result, { data: info, popupToggle }, {}, {})}` : `${compareToggle ? `${validate_component(CompareRecords, "CompareRecords").$$render(
    $$result,
    {
      data: info,
      source,
      originalModel: model,
      popupToggle
    },
    {},
    {}
  )}` : `${validate_component(JSONRecord, "JsonRecord").$$render($$result, { data: info }, {}, {})}`}`} <div class="py-2"></div> <div class="flex justify-between"><p>ID: ${escape(info.id)}</p> <p>${escape(dataSourceToString(source))} - ${escape(modelTypeToString(model))}</p></div></div>`;
});
const queries = writable([
  // initialise with an empty query
  {
    id: 0,
    key: "",
    subkey: "",
    searchTerm: "",
    exclude: false
  }
]);
function updateQuery(id, query) {
  queries.update((queries2) => {
    const index = queries2.findIndex((query2) => query2.id === id);
    if (index === -1)
      return queries2;
    queries2[index] = query;
    return queries2;
  });
}
const Query = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { destroy = false } = $$props;
  const keysWithNoSubkeys = ["Effect", "Negated", "Severity", "Speculated", "Trigger"];
  let query = {
    id,
    key: "",
    subkey: "",
    searchTerm: "",
    exclude: false
  };
  let disableSubkey = true;
  const setDisableSubkey = (val) => {
    disableSubkey = val;
    query.subkey = "";
    updateQuery(query.id, query);
  };
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.destroy === void 0 && $$bindings.destroy && destroy !== void 0)
    $$bindings.destroy(destroy);
  {
    {
      destroy = destroy;
      updateQuery(query.id, query);
    }
  }
  return `<form class="flex space-x-2"><div class="flex flex-col space-y-2"><label class="label" for="Key" data-svelte-h="svelte-rv7d9j">Key</label> <select class="select"><option value="" disabled selected data-svelte-h="svelte-1ifgcru">Select Key</option>${each(
    [
      "Subject",
      "Treatment",
      "Effect",
      "Negated",
      "Severity",
      "Speculated",
      "Trigger",
      "Any"
    ],
    (key) => {
      return `<option${add_attribute("value", key, 0)}>${escape(key)}</option>`;
    }
  )}</select></div> <div class="flex flex-col space-y-2"><label class="label" for="Subkey" data-svelte-h="svelte-119itop">Subkey</label> <select class="select" ${disableSubkey ? "disabled" : ""}><option value="Any" disabled selected data-svelte-h="svelte-cemrf5">Any</option>${keysWithNoSubkeys.includes(query.key) ? `${escape(setDisableSubkey(true))}` : `${query.key === "Subject" ? `${escape(setDisableSubkey(false))} ${each(["Any", "Age", "Disorder", "Gender", "Population", "Race"], (k) => {
    return `<option${add_attribute("value", k, 0)}>${escape(k)}</option>`;
  })}` : `${query.key === "Treatment" ? `${escape(setDisableSubkey(false))} ${each(
    [
      "Any",
      "Combination",
      "Disorder",
      "Dosage",
      "Drug",
      "Duration",
      "Freq",
      "Route",
      "Time Elapsed"
    ],
    (k) => {
      return `<option${add_attribute("value", k, 0)}>${escape(k)}</option>`;
    }
  )}` : ``}`}`}</select></div> <div class="flex flex-col space-y-2"><label class="label" for="Filters" data-svelte-h="svelte-nlkson">Filters</label> <input class="input" type="text" placeholder="Key term"${add_attribute("value", query.searchTerm, 0)}> <div class="flex flex-row h-full justify-center items-center space-x-2"><input class="checkbox" type="checkbox" id="exclude" name="exclude"${add_attribute("checked", query.exclude, 1)}> <p class="label" data-svelte-h="svelte-1eg269x">Exclude</p></div></div> <div class="flex flex-col justify-center items-center"><button type="button" class="btn-icon btn-icon-sm variant-filled justify-center flex-col">${validate_component(Icon, "Icon").$$render($$result, { icon: closeIcon }, {}, {})}</button></div></form>`;
});
const SourceSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { source = DataSource.PHEE_TRAIN_SET } = $$props;
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  return `<select class="select" id="source"><option${add_attribute("value", DataSource.PHEE2_TEST_SET, 0)} data-svelte-h="svelte-zo0ddl">PHEE Test Set</option><option${add_attribute("value", DataSource.USER_ANNOTATED, 0)} data-svelte-h="svelte-vquugr">Uploaded dataset</option></select>`;
});
const BulkAnnotate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { results = [] } = $$props;
  getToastStore();
  let { model } = $$props;
  if ($$props.results === void 0 && $$bindings.results && results !== void 0)
    $$bindings.results(results);
  if ($$props.model === void 0 && $$bindings.model && model !== void 0)
    $$bindings.model(model);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        results = results;
        model = model;
      }
    }
    $$rendered = `<div class="card p-2 text-sm variant-filled-secondary" data-popup="popupHover" data-svelte-h="svelte-tkjaqz"><p>Upload a text file with each<br>record delimited by a new line.</p> <div class="arrow variant-filled-secondary"></div></div> <div class="card justify-center p-3"> <div class=""><div class="flex justify-center"><div><p class="italic" data-svelte-h="svelte-aems2g">Upload</p> <input class="input" type="file" ${""}></div> <div class="px-1"></div> <div class="flex items-center justify-end self-end py-1"><button class="btn-icon btn-icon-sm variant-filled [&>*]:pointer-events-none">${validate_component(Icon, "Icon").$$render($$result, { icon: infoIcon }, {}, {})}</button></div> <div class="px-10"></div> <div><label for="inputFile" class="italic" data-svelte-h="svelte-t2taff">Or select an example file</label> <select class="select" id="inputFile"><option value="" data-svelte-h="svelte-1vbnolo">None</option><option value="example1.txt" data-svelte-h="svelte-39t3vp">Example-1</option></select></div></div> <div class="px-2 py-2"></div> <div class="flex items-center px-2"><label for="modelSelector" class="italic" data-svelte-h="svelte-qm739h">Select a model</label> ${validate_component(ModelSelector, "ModelSelector").$$render(
      $$result,
      {
        exclude: [ModelType.HUMAN, ModelType.MISTRAL7B],
        model
      },
      {
        model: ($$value) => {
          model = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="px-10"><button class="btn variant-filled" ${"disabled"}>Annotate</button></div></div>  </div> ${``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
function searchUploadedRecords(records, key, subkey, target, exclude) {
  const noParentKey = ["age", "gender", "population", "race", "drug", "route", "dosage", "time elapsed", "duration", "frequency", "combination drug"];
  let searchKey = key.toLowerCase();
  if (key == "Any" && !exclude) {
    return records;
  }
  if (subkey != "" && subkey.toLowerCase() != "any") {
    if (noParentKey.includes(subkey.toLowerCase())) {
      searchKey = subkey.toLowerCase();
    } else {
      searchKey = searchKey + " " + subkey.toLowerCase();
    }
  }
  let matchedRecords = [];
  for (const record of records) {
    let matched = false;
    for (const event of record.events) {
      if (event.annotations.some((annotation) => annotation.annotation.toLowerCase().includes(searchKey) && annotation.text.includes(target))) {
        if (!exclude) {
          matchedRecords.push(record);
          matched = true;
          break;
        }
      }
    }
    if (!matched && exclude) {
      matchedRecords.push(record);
    }
  }
  return matchedRecords;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $queries, $$unsubscribe_queries;
  $$unsubscribe_queries = subscribe(queries, (value) => $queries = value);
  let { data } = $$props;
  let results = [];
  let raw = false;
  let popupToggle = false;
  let source = DataSource.PHEE2_TEST_SET;
  let searchModel = ModelType.HUMAN;
  let annotateModel = ModelType.FLANT5;
  let customResults = [];
  let queriedCustomResults = customResults;
  let targetResults = [];
  let paginatedResults = [];
  let paginagedCustomResults = [];
  let paginationSettingsCustom = {
    page: 0,
    limit: 50,
    size: customResults.length,
    amounts: [10, 20, 50, 100]
  };
  let paginationSettings = {
    page: 0,
    limit: 50,
    size: targetResults.length,
    amounts: [10, 20, 50, 100]
  };
  async function execQuery(key, subkey, searchTerm = "", exclude = false, source2, model) {
    if (key === "") {
      return [];
    }
    if (source2 === DataSource.USER_ANNOTATED) {
      return searchUploadedRecords(customResults, key, subkey, searchTerm, exclude);
    }
    const response = await fetch("/api/get_info?key=" + key + "&subkey=" + subkey + "&target=" + searchTerm + "&exclude=" + exclude + "&source=" + source2 + "&model=" + model, { method: "GET" });
    const data2 = await response.json();
    return data2;
  }
  getModalStore();
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        popupToggle = popupToggle;
      }
    }
    {
      {
        (async () => {
          if ($queries.length === 0) {
            results = [];
            return;
          }
          let queryResults = await execQuery($queries[0].key, $queries[0].subkey, $queries[0].searchTerm, $queries[0].exclude, source, searchModel);
          let intersection = new Set(queryResults.map((record) => record.id));
          if (intersection.size === 0) {
            results = [];
            return;
          }
          for (let i = 1; i < $queries.length; i++) {
            if ($queries[i].key === "")
              continue;
            queryResults = await execQuery($queries[i].key, $queries[i].subkey, $queries[i].searchTerm, $queries[i].exclude, source, searchModel);
            let set = new Set(queryResults.map((record) => record.id));
            intersection = new Set([...intersection].filter((x) => set.has(x)));
          }
          results = queryResults.filter((record) => intersection.has(record.id));
        })();
      }
    }
    paginationSettings.size = results.length;
    paginatedResults = results.slice(paginationSettings.page * paginationSettings.limit, paginationSettings.page * paginationSettings.limit + paginationSettings.limit);
    {
      {
        (async () => {
          if (source === DataSource.USER_ANNOTATED) {
            queriedCustomResults = searchUploadedRecords(customResults, $queries[0].key, $queries[0].subkey, $queries[0].searchTerm, $queries[0].exclude);
          }
          for (let i = 1; i < $queries.length; i++) {
            if ($queries[i].key === "")
              continue;
            let queryResults = searchUploadedRecords(queriedCustomResults, $queries[i].key, $queries[i].subkey, $queries[i].searchTerm, $queries[i].exclude);
            let intersection = new Set(queryResults.map((record) => record.id));
            if (intersection.size === 0) {
              queriedCustomResults = [];
              return;
            }
            let set = new Set(queryResults.map((record) => record.id));
            intersection = new Set([...intersection].filter((x) => set.has(x)));
            queriedCustomResults = queryResults.filter((record) => intersection.has(record.id));
          }
        })();
      }
    }
    paginationSettingsCustom.size = queriedCustomResults.length;
    paginagedCustomResults = queriedCustomResults.slice(paginationSettingsCustom.page * paginationSettingsCustom.limit, paginationSettingsCustom.page * paginationSettingsCustom.limit + paginationSettingsCustom.limit);
    $$rendered = `<div class="container mx-auto"><div data-svelte-h="svelte-w6jyuw"><h1 class="h1">Bulk Annotate and Search</h1> <div class="py-1"></div> <p>Annotate and search through datasets of medical records.</p> <div class="py-5"></div></div>  <div class="card justify-center p-4 mx-20"><div class="flex items-center"><label class="flex-none font-bold" for="source" data-svelte-h="svelte-vqq8sl">Dataset:</label> <div class="px-2"></div> ${validate_component(SourceSelector, "SourceSelector").$$render(
      $$result,
      { source },
      {
        source: ($$value) => {
          source = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="px-8"></div> <label class="flex-none font-bold" for="model" data-svelte-h="svelte-5ssaot">LLM model:</label> <div class="px-2"></div> ${validate_component(ModelSelector, "ModelSelector").$$render(
      $$result,
      {
        disabled: source === DataSource.USER_ANNOTATED,
        model: searchModel
      },
      {
        model: ($$value) => {
          searchModel = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="py-2"></div> ${source === DataSource.USER_ANNOTATED ? `${validate_component(BulkAnnotate, "BulkAnnotate").$$render(
      $$result,
      {
        results: customResults,
        model: annotateModel
      },
      {
        results: ($$value) => {
          customResults = $$value;
          $$settled = false;
        },
        model: ($$value) => {
          annotateModel = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}</div></div> <div class="p-5"></div> <div class="container h-full mx-auto flex justify-center items-center"><div>${each($queries, (query) => {
      return `${validate_component(Query, "Query").$$render(
        $$result,
        { id: query.id },
        {
          id: ($$value) => {
            query.id = $$value;
            $$settled = false;
          }
        },
        {}
      )} <div class="py-2"></div>`;
    })} <div class="flex justify-center py-5"><button class="btn-sm variant-filled rounded flex justify-items-center items-center bg-primary-600 text-white">${validate_component(Icon, "Icon").$$render($$result, { icon: plusIcon }, {}, {})} <p data-svelte-h="svelte-1sboyj3">Add query</p></button></div></div></div> <div class="py-10"></div> ${source == DataSource.PHEE2_TEST_SET && results.length > 0 || source == DataSource.USER_ANNOTATED && customResults.length > 0 ? `<div class="container h-full mx-auto justify-center items-center text-center"> <div class="flex justify-between items-center" data-svelte-h="svelte-auvh3o"><hr class="w-full border-gray-300"> <h2 class="h-full px-4">Results</h2> <hr class="w-full border-gray-300"></div> <div class="py-5"></div>  <div class="flex h-full"><p class="justify-begin"><strong>${escape(source === DataSource.PHEE2_TEST_SET ? paginationSettings.size : paginationSettingsCustom.size)} records retrieved</strong></p> <div class="flex-grow"></div> <div class="flex justify-end"><button class="btn variant-filled rounded px-10" data-svelte-h="svelte-1lujj6q">Toggle Annotations</button> <div class="px-2"></div> <button class="btn variant-filled rounded px-10" data-svelte-h="svelte-1uohe86">Toggle Raw</button> <div class="px-2"></div> <button class="btn variant-filled rounded px-10" data-svelte-h="svelte-1m61ww8">Export</button></div></div> <div class="py-2"></div> ${source === DataSource.PHEE2_TEST_SET ? `${validate_component(Paginator, "Paginator").$$render(
      $$result,
      {
        showFirstLastButtons: true,
        showPreviousNextButtons: true,
        settings: paginationSettings
      },
      {
        settings: ($$value) => {
          paginationSettings = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="py-2"></div>   ${each(paginatedResults, (row, index) => {
      return `${validate_component(Record, "Record").$$render(
        $$result,
        {
          info: row,
          currentRecord: paginationSettings.page * paginationSettings.limit + index + 1,
          totalRecords: paginationSettings.size,
          raw,
          popupToggle,
          source,
          model: searchModel
        },
        {},
        {}
      )} <div class="py-5"></div>`;
    })}` : `${validate_component(Paginator, "Paginator").$$render(
      $$result,
      {
        showFirstLastButtons: true,
        showPreviousNextButtons: true,
        settings: paginationSettingsCustom
      },
      {
        settings: ($$value) => {
          paginationSettingsCustom = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="py-2"></div>   ${each(paginagedCustomResults, (row, index) => {
      return `${validate_component(Record, "Record").$$render(
        $$result,
        {
          info: row,
          currentRecord: paginationSettingsCustom.page * paginationSettingsCustom.limit + index + 1,
          totalRecords: paginationSettingsCustom.size,
          raw,
          popupToggle,
          source,
          model: annotateModel
        },
        {},
        {}
      )} <div class="py-5"></div>`;
    })}`}</div>` : `<div class="container h-full mx-auto flex justify-center items-center" data-svelte-h="svelte-b1mdiv"><h3>No results: the query returned no records or a custom dataset has not been uploaded</h3></div>`}`;
  } while (!$$settled);
  $$unsubscribe_queries();
  return $$rendered;
});
export {
  Page as default
};
