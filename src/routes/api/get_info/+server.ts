import { searchAnnotationWithSubkey, searchAnnotationWithMatching, searchFlanT5, searchPHEE2Test, searchUIE, searchMistral7B } from '$lib/db/search.js';
import type { Row } from 'postgres';
import { rowListToNewRecordList, rowListToRecordList } from '$lib/db/common';
import { DataSource, ModelType } from '$lib/datatypes.js';
import { pheeToNewRecord } from '$lib/data_conversion/phee_to_newrecord.js';

export async function GET ({ url }) {
    let key = url.searchParams.get('key');
    let subkey = url.searchParams.get('subkey');
    let target = url.searchParams.get('target');
    let exclude = url.searchParams.get('exclude');
    const source = url.searchParams.get('source');
    const model = url.searchParams.get('model');

    if (key == null) {
        return new Response(JSON.stringify({ error: "Missing key parameter" }), { status: 400 });
    }
    if (source == null) {
        return new Response(JSON.stringify({ error: "Missing source parameter" }), { status: 400 });
    }
    if (model == null) {
        return new Response(JSON.stringify({ error: "Missing model parameter" }), { status: 400 });
    }
    
    let result : Row[] = [];
    subkey = subkey ?? '';
    target = target ?? '';
    exclude = exclude ?? 'false';
    let sourceInt = source ? parseInt(source) : DataSource.PHEE_TRAIN_SET;
    let modelInt = model ? parseInt(model) : ModelType.HUMAN;

    switch (sourceInt) {
        case DataSource.PHEE_TRAIN_SET:
            if (target == '') {
                result = await searchAnnotationWithSubkey(key, subkey);
            }
            else {
                result = await searchAnnotationWithMatching(key, subkey, target, exclude == 'true');
            }

            return new Response(JSON.stringify(rowListToRecordList(result).map(rec => pheeToNewRecord(rec))), { status: 200 });
        
        case DataSource.PHEE2_TEST_SET:
            return searchPHEETest(modelInt, key, subkey, target, exclude == 'true');
    }
}

async function searchPHEETest(model: ModelType, key: string, subkey: string, target: string, exclude: boolean) {
    const noParentKey = ['age', 'gender', 'population', 'race', 'drug', 'route', 'dosage', 'time elapsed', 'duration', 'frequency', 'combination drug'];
    let result : Row[] = [];
    let searchKey = key;
    if (key.toLowerCase() === 'any') searchKey = '';
    switch (model) {     
        case ModelType.FLANT5:
            searchKey = searchKey.toLowerCase();
            if (subkey != '' && subkey.toLowerCase() != 'any') {
                if (noParentKey.includes(subkey.toLowerCase())) {
                    searchKey = subkey.toLowerCase();
                } else {
                    searchKey = searchKey + ' ' + subkey.toLowerCase();
                } 
            }
            result = await searchFlanT5(searchKey, target, exclude);
            return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });
        
        case ModelType.UIE:
            searchKey = searchKey.toLowerCase();
            if (subkey != '' && subkey.toLowerCase() != 'any') {
                if (noParentKey.includes(subkey.toLowerCase())) {
                    searchKey = subkey.toLowerCase();
                } else {
                    searchKey = searchKey + ' ' + subkey.toLowerCase();
                } 
            }
            result = await searchUIE(searchKey, target, exclude);
            return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });
        
        case ModelType.HUMAN:
            if (subkey != '') {
                searchKey = searchKey + '.' + subkey;
            }

            result = await searchPHEE2Test(searchKey, target, exclude);
            return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });
        
        case ModelType.MISTRAL7B:
            if (subkey != '') {
                searchKey = searchKey + '.' + subkey;
            }
            result = await searchMistral7B(searchKey, target, exclude);
            return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });   
        default:
            return new Response(JSON.stringify({ error: "Invalid source parameter" }), { status: 400 });
    }
}