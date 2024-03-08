import type { DataSource } from "$lib/datatypes.js";
import type { Row } from 'postgres';
import { rowListToNewRecordList, rowListToRecordList } from "$lib/db/common";
import { getRecordByIDandSource } from "$lib/db/search.js";

export async function GET ({ url }) {
    const id = url.searchParams.get('id');
    if (id == null) {
        return new Response(JSON.stringify({ error: "Missing id parameter" }), { status: 400 });
    }
    let source = url.searchParams.get('source');
    if (source == null) {
        return new Response(JSON.stringify({ error: "Missing source parameter" }), { status: 400 });
    }
    const sourceInt : DataSource = parseInt(source);
    let result : Row[] = [];

    result = await getRecordByIDandSource(id, sourceInt);
    return new Response(JSON.stringify(rowListToNewRecordList(result)[0]), { status: 200 });   // only one record should be returned
}