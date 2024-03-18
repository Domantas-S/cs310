

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/analysis/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.8918cfbb.js","_app/immutable/chunks/scheduler.2cf724bb.js","_app/immutable/chunks/index.4ad772fd.js","_app/immutable/chunks/functions.3f1032b4.js","_app/immutable/chunks/index.6c355e8e.js","_app/immutable/chunks/FLAN-T5_to_newrecord.c3058d58.js","_app/immutable/chunks/stores.e0b078e4.js"];
export const stylesheets = ["_app/immutable/assets/3.0ee313cd.css","_app/immutable/assets/functions.4f1e9ba5.css"];
export const fonts = [];
