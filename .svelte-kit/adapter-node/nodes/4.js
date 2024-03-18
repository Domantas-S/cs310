

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/annotate/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.3bbc1d52.js","_app/immutable/chunks/scheduler.2cf724bb.js","_app/immutable/chunks/index.4ad772fd.js","_app/immutable/chunks/functions.3f1032b4.js","_app/immutable/chunks/index.6c355e8e.js","_app/immutable/chunks/FLAN-T5_to_newrecord.c3058d58.js"];
export const stylesheets = ["_app/immutable/assets/4.a597b77c.css","_app/immutable/assets/functions.4f1e9ba5.css"];
export const fonts = [];
