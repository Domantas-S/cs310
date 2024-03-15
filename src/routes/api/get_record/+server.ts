import { DataSource, type ModelType } from "$lib/datatypes.js";
import type { Row } from 'postgres';
import { rowListToNewRecordList } from "$lib/db/common";
import { getRecordByIDandModelPHEE } from "$lib/db/search.js";

export async function GET ({ url }) {
    const id = url.searchParams.get('id');
    if (id == null) {
        return new Response(JSON.stringify({ error: "Missing id parameter" }), { status: 400 });
    }
    let source = url.searchParams.get('source');
    if (source == null) {
        return new Response(JSON.stringify({ error: "Missing source parameter" }), { status: 400 });
    }
    let model = url.searchParams.get('model');
    if (model == null) {
        return new Response(JSON.stringify({ error: "Missing model parameter" }), { status: 400 });
    }

    const sourceInt : DataSource = parseInt(source);
    const modelInt : ModelType = parseInt(model);
    let result : Row[] = [];
    switch (sourceInt) {
        case DataSource.PHEE2_TEST_SET:
            result = await getRecordByIDandModelPHEE(id, modelInt);
            return new Response(JSON.stringify(rowListToNewRecordList(result)[0]), { status: 200 });   // only one record should be returned
        case DataSource.PHEE_TRAIN_SET:
            return new Response(JSON.stringify({ error: "PHEE_TRAIN_SET not supported" }), { status: 400 });
        default:
            return new Response(JSON.stringify({ error: "Invalid source parameter" }), { status: 400 });
    }
}