import sql from '$lib/db/db';

export async function GET ({ url }) {
    const key = url.searchParams.get('key');
    const subkey = url.searchParams.get('subkey');
    if (key == null) {
        return new Response(JSON.stringify({ error: "Missing key parameter" }), { status: 400 });
    }
    let result;
    if (subkey == null) {
        result = await sql`select record_id, info, context from get_info(${key}) join dev2 ON record_id=dev2.id`;
    } else {
        result = await sql`select record_id, info, context from get_info(${key}, ${subkey}) join dev2 ON record_id=dev2.id`;
    }
    return new Response(JSON.stringify(result), { status: 200 });
}