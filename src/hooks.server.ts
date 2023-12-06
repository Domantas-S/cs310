// import { connectToDB } from "$lib/db/db";
// import type { Handle } from "@sveltejs/kit";

// export const handle = (async ({ event, resolve }) => {
//     const dbCon = await connectToDB();
//     event.locals = { dbCon: dbCon };
//     const response = await resolve(event);
//     dbCon.release();
//     return response;
    
// }) satisfies Handle;