
export async function GET ({ url, locals: { dbCon } }) {
    const key = url.searchParams.get('key');
    const subkey = url.searchParams.get('subkey');
    if (key == null) {
        return new Response(JSON.stringify({ error: "Missing key parameter" }), { status: 400 });
    }
    let result;
    if (subkey == null) {
        result = await dbCon.query(`select record_id, info, context from get_info($1) join dev2 ON record_id=dev2.id`, [key]);
    } else {
        result = await dbCon.query(`select record_id, info, context from get_info($1, $2) join dev2 ON record_id=dev2.id`, [key, subkey]);
    }
    return new Response(JSON.stringify(result.rows), { status: 200 })
}