

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.cf3a014b.js","_app/immutable/chunks/scheduler.2cf724bb.js","_app/immutable/chunks/index.4ad772fd.js","_app/immutable/chunks/singletons.f4356de5.js","_app/immutable/chunks/index.6c355e8e.js"];
export const stylesheets = [];
export const fonts = [];
