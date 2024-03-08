import type { record, event, common, valued_common_str, valued_common_bool, subject, treatment, combination } from '$lib/interfaces';
import type { newRecord } from '$lib/types/types';
import type { Row } from 'postgres';

// credit: Typescript documentation, src 
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

export function rowListToRecordList(rows: Row[]): record[] {
    const result : record[] = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        result.push(rowToRecord(row));
    }
    return result;
}

export function rowToRecord(row: Row): record {
    return {
        id : row.id,
        context : row.context,
        is_mult_event : row.is_mult_event,
        annotations : rowToEvents(row),
    };
}

function rowToEvents(row : Row) : event[] {
    const events = row.annotations[0].events;
    const result : event[] = [];
    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        let obj : event = {
            event_type : event.event_type,
            event_id : event.event_id,
        };
        for (let field in event){
            if (field == "Effect" || field == "Trigger" ) {
                obj[field] = objToCommon(event[field]);
            } else if (field == "Negated" ||  field == "Speculated" ) {
                obj[field] = objToValuedCommonBool(event[field]);
            } else if (field == "Severity") {
                obj[field] = objToValuedCommonstr(event[field]);
            } else if (field == "Subject") {
                obj[field] = objToSubject(event[field]);
            } else if (field == "Treatment") {
                obj[field] = objToTreatment(event[field]);
            }
        }
        result.push(obj);
    }
    return result;

}

function objToCommon(data : any) : common | undefined {
    if (!data) return undefined;
    return {
        text : data.text != null ? data.text : 'Missing common text',
        start : data.start != null ? data.start : 0,
        entity_id : data.entity_id != null ? data.entity_id : 'Missing common entity_id',
    };
}

function objToValuedCommonBool(data : any) : valued_common_bool | undefined{
    if (!data) return  undefined;
    return {
        text : data.text != null ? data.text : 'Missing common text',
        start : data.start != null ? data.start : 0,
        entity_id : data.entity_id != null ? data.entity_id : 'Missing common entity_id',
        value : data.value != null ? data.value : false,
    };
}

function objToValuedCommonstr(data : any) : valued_common_str | undefined{
    if (!data) return  undefined;
    return {
        text : data.text != null ? data.text : 'Missing common text',
        start : data.start != null ? data.start : 0,
        entity_id : data.entity_id != null ? data.entity_id : 'Missing common entity_id',
        value : data.value != null ? data.value : 'Missing common value',
    };
}

function objToSubject(data : any) : subject | undefined{
    if (!data) return  undefined;
    let res : any = {};
    Object.assign(res, objToCommon(data));
    for (let field in data) {
        if (['Age', 'Disorder', 'Gender', 'Population', 'Race'].includes(field)){
            res[field] = objToCommon(data[field]);
        }
    }
    return res as subject;
}

function objToTreatment(data : any) : treatment | undefined {
    if (!data) return  undefined;
    let res : any = objToCommon(data);
    for (let field in data) {
        if (['Drug', 'Disorder', 'Dosage', 'Duration', 'Trigger', 'Route', 'Time_elapsed', 'Freq'].includes(field)){
            res[field] = objToCommon(data[field]);
        } else if (field == 'Combination') {
            res[field] = objToCombination(data[field]);
        }
    }
    return res as treatment;
}

function objToCombination(data : any) : combination[] | undefined {
    if (!data) return  undefined;
    const result : combination[] = [];
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        let res : combination = {
            event_type : obj.event_type,
            event_id : obj.event_id,
        };
        for (let field in obj) {
            if (field == 'Drug' || field == 'Trigger') {
                res[field] = objToCommon(obj[field]);
            }
        }
        result.push(res);
    }
    return result;
}

export function getAnnotationText(record : record, key : string, subkey : string) : any {
    const events = record.annotations;
    const result : any = [];
    let e : any;
    if (key == 'Any' || key == '') {
        return 'find all annotations?';
    }

    if (subkey == 'Any') {
        return 'find all annotations?';
    }

    for (e of events) {
        // console.log(e);
        // console.log(key, subkey);
        if (e[key as keyof event] != null) {
            if (subkey == '') {
                result.push(e[key].text);
            } else if (e[key as keyof event][subkey as keyof common] != null) {
                // console.log('Accessing', key, subkey, JSON.stringify(e));
                result.push(e[key][subkey].text);
            }
        }
    }
    return result;
}

export function rowListToNewRecordList(rows: Row[]): newRecord[] {
    const result : newRecord[] = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        result.push(rowToNewRecord(row));
    }
    return result;
}

export function rowToNewRecord(row: Row): newRecord {
    return {
        id : row.id,
        context : row.context,
        events : row.events,
    };
}