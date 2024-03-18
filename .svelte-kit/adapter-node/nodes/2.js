

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.e1596632.js","_app/immutable/chunks/scheduler.2cf724bb.js","_app/immutable/chunks/index.4ad772fd.js","_app/immutable/chunks/navigation.6c38cc0e.js","_app/immutable/chunks/singletons.f4356de5.js","_app/immutable/chunks/index.6c355e8e.js"];
export const stylesheets = [];
export const fonts = [];
