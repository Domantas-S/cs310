import { DataSource } from "$lib/datatypes.js";
import type { Row } from 'postgres';
import { rowListToRecordList } from "$lib/db/common";
import { getRecordByIDandSource } from "$lib/db/search.js";

export async function GET ({ url }) {
    const id = url.searchParams.get('id');
    if (id == null) {
        return new Response(JSON.stringify({ error: "Missing id parameter" }), { status: 400 });
    }
    const source = url.searchParams.get('source');
    if (source == null) {
        return new Response(JSON.stringify({ error: "Missing source parameter" }), { status: 400 });
    }
    let result : Row[] = [];

    switch (source) {
        case DataSource.HUMAN_ANNOTATED.toString():
            result = await getRecordByIDandSource(id, DataSource.HUMAN_ANNOTATED);
            break;
        case DataSource.MIXTRAL_8X7B_INSTRUCT.toString():
            result = await getRecordByIDandSource(id, DataSource.MIXTRAL_8X7B_INSTRUCT);
            break;
        default:
            return new Response(JSON.stringify({ error: "Invalid source parameter" }), { status: 400 });
    }
    return new Response(JSON.stringify(rowListToRecordList(result)[0]), { status: 200 });   // only one record should be returned
}