import sql from "./db";

export async function searchRecord(keyword : string) {
    const result = await sql`select * from dev2 where position(lower(${keyword}) in lower(context)) > 0;`;
    return result;
}

export async function searchAnnotation(key : string){
    if (key == "Any") {
        const result = await sql`
            SELECT
                *
            FROM dev2;`
        return result;
    }
    const result = await sql`
        SELECT 
            *
        FROM dev2,
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
        FROM dev2,
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
        FROM dev2,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        return result;
    }
    else if (subkey == "Any" || subkey == '') {
        const result = await sql`
        SELECT 
            *
        FROM dev2,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE arr.event_obj ? ${key} AND POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        return result;
    }
    else {
        const result = await sql`
        SELECT 
            *
        FROM dev2,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE arr.event_obj ? ${key} AND arr.event_obj->${key} ? ${subkey} AND POSITION(LOWER(${target}) IN LOWER(context)) > 0;`
        return result;
    }
}