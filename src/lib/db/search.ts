import { DataSource, ModelType } from "$lib/datatypes";
import sql from "./db";

export async function searchRecord(keyword : string) {
    const result = await sql`select * from phee where position(lower(${keyword}) in lower(context)) > 0;`;
    return result;
}

export async function searchAnnotation(key : string){
    if (key == "Any") {
        const result = await sql`
            SELECT
                *
            FROM phee;`
        return result;
    }
    const result = await sql`
        SELECT 
            *
        FROM phee,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE arr.event_obj ? ${key};`

    return result;
}

export async function searchAnnotationWithSubkey(key : string, subkey : string){
    if (subkey == "Any" || subkey == '') {
        return searchAnnotation(key);
    }
    const result = await sql`
        SELECT 
            *
        FROM phee,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE arr.event_obj ? ${key} AND arr.event_obj->${key} ? ${subkey};`
    
    return result;
}

export async function searchAnnotationWithMatching(key: string, subkey: string, target: string, exclude: boolean){
    const exclusion = exclude ? 'NOT' : ' ';

    if (key == "Any") {
        const result = await sql`
        SELECT 
            *
        FROM phee,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        return result;
    }
    else if (subkey == "Any" || subkey == '') {
        const result = await sql`
        SELECT 
            *
        FROM phee,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE arr.event_obj ? ${key} AND POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        return result;
    }
    else {
        const result = await sql`
        SELECT 
            *
        FROM phee,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE arr.event_obj ? ${key} AND arr.event_obj->${key} ? ${subkey} AND POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        return result;
    }
}


export async function getRecordByIDandModelPHEE(id : string, model : ModelType){
    switch (model) {
        case ModelType.HUMAN:
            return await sql`SELECT * FROM phee2test WHERE id = ${id};`;
        case ModelType.FLANT5:
            return await sql`SELECT * FROM flant5 WHERE id = ${id};`;
        case ModelType.UIE:
            return await sql`SELECT * FROM uie WHERE id = ${id};`;
        case ModelType.MISTRAL7B:
            return await sql`SELECT * FROM mistral7b WHERE id = ${id};`;
        default:
            return [];
    }
}

export async function searchFlanT5(key = '', target = '', exclude = false) {
    if (!exclude) {
        if (key === '') {
            return await sql`
            SELECT
                *
            FROM flant5 
            WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        }
        return await sql`
            SELECT 
                *
            FROM search_annotation_flant5(${key}, ${target});`
    } else {
        if (key === '') {
            return await sql`
            SELECT
                *
            FROM flant5 
            WHERE NOT POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        }
        return await sql`
            SELECT 
                *
            FROM flant5 WHERE (flant5.id NOT IN (SELECT id FROM search_annotation_flant5(${key}, ${target})));`
    }
}

export async function searchPHEE2Test(key = '', target = '', exclude = false) {
    if (!exclude) {
        if (key === '') {
            return await sql`
            SELECT
                *
            FROM phee2test 
            WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        }
        return await sql`
            SELECT 
                *
            FROM search_annotation_phee2test(${key}, ${target});`
    } else {
        if (key === '') {
            return await sql`
            SELECT
                *
            FROM phee2test 
            WHERE NOT POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        }
        return await sql`
            SELECT 
                *
            FROM phee2test WHERE (phee2test.id NOT IN (SELECT id FROM search_annotation_phee2test(${key}, ${target})));`
    }
}

export async function searchUIE(key = '', target = '', exclude = false) {
    if (!exclude) {
        if (key === '') {
            return await sql`
            SELECT
                *
            FROM uie 
            WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        }
        return await sql`
            SELECT 
                *
            FROM search_annotation_uie(${key}, ${target});`
    } else {
        if (key === '') {
            return await sql`
            SELECT
                *
            FROM uie 
            WHERE NOT POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        }
        return await sql`
            SELECT 
                *
            FROM uie WHERE (uie.id NOT IN (SELECT id FROM search_annotation_uie(${key}, ${target})));`
    }
}

export async function searchMistral7B(key = '', target = '', exclude = false) {
    if (!exclude) {
        if (key === '') {
            return await sql`
            SELECT
                *
            FROM mistral7b 
            WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        }
        return await sql`
            SELECT 
                *
            FROM search_annotation_mistral7b(${key}, ${target});`
    } else {
        if (key === '') {
            return await sql`
            SELECT
                *
            FROM mistral7b 
            WHERE NOT POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        }
        return await sql`
            SELECT 
                *
            FROM mistral7b WHERE (mistral7b.id NOT IN (SELECT id FROM search_annotation_mistral7b(${key}, ${target})));`
    }
}  