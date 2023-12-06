import sql from '$lib/db/db';

export async function GET ({ url }) {
    const { keyword } = Object.fromEntries(url.searchParams);
    if (keyword == null) {
        return new Response(JSON.stringify({ error: "Missing key parameter" }), { status: 400 });
    }
    const result = await sql`select record_id, info, context from get_info(${keyword}) join dev2 ON record_id=dev2.id`;
    
    return new Response(JSON.stringify(result), { status: 200 });
}
