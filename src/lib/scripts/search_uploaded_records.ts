import type { newRecord } from "$lib/types/types";

export function searchUploadedRecords(records: newRecord[], key: string, subkey: string, target: string, exclude: boolean) {
    const noParentKey = ['age', 'gender', 'population', 'race', 'drug', 'route', 'dosage', 'time elapsed', 'duration', 'frequency', 'combination drug'];
    let searchKey = key.toLowerCase();
    if (key == 'Any' && !exclude){
        return records;
    }
    if (subkey != '' && subkey.toLowerCase() != 'any') {
        if (noParentKey.includes(subkey.toLowerCase())) {
            searchKey = subkey.toLowerCase();
        } else {
            searchKey = searchKey + ' ' + subkey.toLowerCase();
        } 
    }

    let matchedRecords = [];
    for (const record of records) {
        let matched = false;
        for (const event of record.events) {
            if (event.annotations.some(annotation => annotation.annotation.toLowerCase().includes(searchKey) && annotation.text.includes(target))) {
                if (!exclude) {
                    matchedRecords.push(record);
                    matched = true;
                    break;
                }
            }
        }
        if (!matched && exclude) {  // if exclude is true and no match is found, add the record
            matchedRecords.push(record);
        }

    }
    return matchedRecords;
}