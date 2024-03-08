import { searchAnnotation, searchAnnotationWithSubkey, searchAnnotationWithMatching, searchFlanT5, searchWithTable, searchPHEE2Test, searchUIE, searchMistral7B } from '$lib/db/search.js';
import type { Row } from 'postgres';
import { rowListToNewRecordList, rowListToRecordList } from '$lib/db/common';
import { DataSource } from '$lib/datatypes.js';
import { pheeToNewRecord } from '$lib/data_conversion/phee_to_newrecord.js';

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
    let sourceInt = source ? parseInt(source) : DataSource.PHEE_TRAIN_SET;
    let searchKey = key;

    if (sourceInt !== DataSource.PHEE_TRAIN_SET && sourceInt !== DataSource.MIXTRAL_8X7B_INSTRUCT) {
        searchKey = '';
    }
    switch (sourceInt) {
        case DataSource.PHEE_TRAIN_SET:
            if (target == '') {
                result = await searchAnnotationWithSubkey(key, subkey);
            }
            else {
                result = await searchAnnotationWithMatching(key, subkey, target, exclude == 'true');
            }

            return new Response(JSON.stringify(rowListToRecordList(result).map(rec => pheeToNewRecord(rec))), { status: 200 });

        case DataSource.FLANT5:
            searchKey = key.toLowerCase();
            if (subkey != '') {
                searchKey = searchKey + ' ' + subkey.toLowerCase();
            }
            result = await searchFlanT5(searchKey, target);
            return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });
        
        case DataSource.UIE:
            searchKey = key.toLowerCase();
            if (subkey != '') {
                searchKey = searchKey + ' ' + subkey.toLowerCase();
            }
            result = await searchUIE(searchKey, target);
            return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });
        
        case DataSource.PHEE2_TEST_SET:
            if (subkey != '') {
                searchKey = searchKey + '.' + subkey;
            }

            result = await searchPHEE2Test(searchKey, target);
            return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });
        
        case DataSource.MISTRAL7B:
            if (subkey != '') {
                searchKey = searchKey + '.' + subkey;
            }
            result = await searchMistral7B(searchKey, target);
            return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });   
        default:
            return new Response(JSON.stringify({ error: "Invalid source parameter" }), { status: 400 });
    }
}