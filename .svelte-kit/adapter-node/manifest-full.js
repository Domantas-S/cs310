export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon_old.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.88a5b929.js","app":"_app/immutable/entry/app.3ea29054.js","imports":["_app/immutable/entry/start.88a5b929.js","_app/immutable/chunks/scheduler.2cf724bb.js","_app/immutable/chunks/singletons.f4356de5.js","_app/immutable/chunks/index.6c355e8e.js","_app/immutable/entry/app.3ea29054.js","_app/immutable/chunks/scheduler.2cf724bb.js","_app/immutable/chunks/index.4ad772fd.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/analysis",
				pattern: /^\/analysis\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/annotate",
				pattern: /^\/annotate\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/annotate",
				pattern: /^\/api\/annotate\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/annotate/_server.ts.js'))
			},
			{
				id: "/api/example_records",
				pattern: /^\/api\/example_records\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/example_records/_server.ts.js'))
			},
			{
				id: "/api/export",
				pattern: /^\/api\/export\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/export/_server.ts.js'))
			},
			{
				id: "/api/get_info",
				pattern: /^\/api\/get_info\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/get_info/_server.ts.js'))
			},
			{
				id: "/api/get_record",
				pattern: /^\/api\/get_record\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/get_record/_server.ts.js'))
			},
			{
				id: "/api/search_records",
				pattern: /^\/api\/search_records\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/search_records/_server.ts.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
