import { searchAnnotation, searchAnnotationWithSubkey, searchAnnotationWithMatching } from '$lib/db/search.js';
import type { Row } from 'postgres';
import { rowListToRecordList } from '$lib/db/common';
import { DataSource } from '$lib/datatypes.js';

export async function GET ({ url }) {
    const key = url.searchParams.get('key');
    let subkey = url.searchParams.get('subkey');
    let target = url.searchParams.get('target');
    let exclude = url.searchParams.get('exclude');
    let source = url.searchParams.get('source');
    if (key == null) {
        return new Response(JSON.stringify({ error: "Missing key parameter" }), { status: 400 });
    }
    let result : Row[] = [];
    subkey = subkey ?? '';
    target = target ?? '';
    exclude = exclude ?? 'false';

    if (target == '') {
        result = await searchAnnotationWithSubkey(key, subkey);
    }
    else {
        result = await searchAnnotationWithMatching(key, subkey, target, exclude == 'true');
    }

    return new Response(JSON.stringify(rowListToRecordList(result)), { status: 200 });
}