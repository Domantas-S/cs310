import { M as ModelType } from "./datatypes.js";
import { s as sql } from "./db.js";
async function searchAnnotation(key) {
  if (key == "Any") {
    const result2 = await sql`
            SELECT
                *
            FROM phee;`;
    return result2;
  }
  const result = await sql`
        SELECT 
            *
        FROM phee,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE arr.event_obj ? ${key};`;
  return result;
}
async function searchAnnotationWithSubkey(key, subkey) {
  if (subkey == "Any" || subkey == "") {
    return searchAnnotation(key);
  }
  const result = await sql`
        SELECT 
            *
        FROM phee,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE arr.event_obj ? ${key} AND arr.event_obj->${key} ? ${subkey};`;
  return result;
}
async function searchAnnotationWithMatching(key, subkey, target, exclude) {
  if (key == "Any") {
    const result = await sql`
        SELECT 
            *
        FROM phee,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    return result;
  } else if (subkey == "Any" || subkey == "") {
    const result = await sql`
        SELECT 
            *
        FROM phee,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE arr.event_obj ? ${key} AND POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    return result;
  } else {
    const result = await sql`
        SELECT 
            *
        FROM phee,
            jsonb_array_elements(annotations->0->'events') with ordinality arr(event_obj, event_num)
        WHERE arr.event_obj ? ${key} AND arr.event_obj->${key} ? ${subkey} AND POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    return result;
  }
}
async function getRecordByIDandModelPHEE(id, model) {
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
async function searchFlanT5(key = "", target = "", exclude = false) {
  if (!exclude) {
    if (key === "") {
      return await sql`
            SELECT
                *
            FROM flant5 
            WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    }
    return await sql`
            SELECT 
                *
            FROM search_annotation_flant5(${key}, ${target});`;
  } else {
    if (key === "") {
      return await sql`
            SELECT
                *
            FROM flant5 
            WHERE NOT POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    }
    return await sql`
            SELECT 
                *
            FROM flant5 WHERE (flant5.id NOT IN (SELECT id FROM search_annotation_flant5(${key}, ${target})));`;
  }
}
async function searchPHEE2Test(key = "", target = "", exclude = false) {
  if (!exclude) {
    if (key === "") {
      return await sql`
            SELECT
                *
            FROM phee2test 
            WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    }
    return await sql`
            SELECT 
                *
            FROM search_annotation_phee2test(${key}, ${target});`;
  } else {
    if (key === "") {
      return await sql`
            SELECT
                *
            FROM phee2test 
            WHERE NOT POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    }
    return await sql`
            SELECT 
                *
            FROM phee2test WHERE (phee2test.id NOT IN (SELECT id FROM search_annotation_phee2test(${key}, ${target})));`;
  }
}
async function searchUIE(key = "", target = "", exclude = false) {
  if (!exclude) {
    if (key === "") {
      return await sql`
            SELECT
                *
            FROM uie 
            WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    }
    return await sql`
            SELECT 
                *
            FROM search_annotation_uie(${key}, ${target});`;
  } else {
    if (key === "") {
      return await sql`
            SELECT
                *
            FROM uie 
            WHERE NOT POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    }
    return await sql`
            SELECT 
                *
            FROM uie WHERE (uie.id NOT IN (SELECT id FROM search_annotation_uie(${key}, ${target})));`;
  }
}
async function searchMistral7B(key = "", target = "", exclude = false) {
  if (!exclude) {
    if (key === "") {
      return await sql`
            SELECT
                *
            FROM mistral7b 
            WHERE POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    }
    return await sql`
            SELECT 
                *
            FROM search_annotation_mistral7b(${key}, ${target});`;
  } else {
    if (key === "") {
      return await sql`
            SELECT
                *
            FROM mistral7b 
            WHERE NOT POSITION(LOWER(${target}) IN LOWER(context)) > 0;`;
    }
    return await sql`
            SELECT 
                *
            FROM mistral7b WHERE (mistral7b.id NOT IN (SELECT id FROM search_annotation_mistral7b(${key}, ${target})));`;
  }
}
function rowListToRecordList(rows) {
  const result = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    result.push(rowToRecord(row));
  }
  return result;
}
function rowToRecord(row) {
  return {
    id: row.id,
    context: row.context,
    is_mult_event: row.is_mult_event,
    annotations: rowToEvents(row)
  };
}
function rowToEvents(row) {
  const events = row.annotations[0].events;
  const result = [];
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    let obj = {
      event_type: event.event_type,
      event_id: event.event_id
    };
    for (let field in event) {
      if (field == "Effect" || field == "Trigger") {
        obj[field] = objToCommon(event[field]);
      } else if (field == "Negated" || field == "Speculated") {
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
function objToCommon(data) {
  if (!data)
    return void 0;
  return {
    text: data.text != null ? data.text : "Missing common text",
    start: data.start != null ? data.start : 0,
    entity_id: data.entity_id != null ? data.entity_id : "Missing common entity_id"
  };
}
function objToValuedCommonBool(data) {
  if (!data)
    return void 0;
  return {
    text: data.text != null ? data.text : "Missing common text",
    start: data.start != null ? data.start : 0,
    entity_id: data.entity_id != null ? data.entity_id : "Missing common entity_id",
    value: data.value != null ? data.value : false
  };
}
function objToValuedCommonstr(data) {
  if (!data)
    return void 0;
  return {
    text: data.text != null ? data.text : "Missing common text",
    start: data.start != null ? data.start : 0,
    entity_id: data.entity_id != null ? data.entity_id : "Missing common entity_id",
    value: data.value != null ? data.value : "Missing common value"
  };
}
function objToSubject(data) {
  if (!data)
    return void 0;
  let res = {};
  Object.assign(res, objToCommon(data));
  for (let field in data) {
    if (["Age", "Disorder", "Gender", "Population", "Race"].includes(field)) {
      res[field] = objToCommon(data[field]);
    }
  }
  return res;
}
function objToTreatment(data) {
  if (!data)
    return void 0;
  let res = objToCommon(data);
  for (let field in data) {
    if (["Drug", "Disorder", "Dosage", "Duration", "Trigger", "Route", "Time_elapsed", "Freq"].includes(field)) {
      res[field] = objToCommon(data[field]);
    } else if (field == "Combination") {
      res[field] = objToCombination(data[field]);
    }
  }
  return res;
}
function objToCombination(data) {
  if (!data)
    return void 0;
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    let res = {
      event_type: obj.event_type,
      event_id: obj.event_id
    };
    for (let field in obj) {
      if (field == "Drug" || field == "Trigger") {
        res[field] = objToCommon(obj[field]);
      }
    }
    result.push(res);
  }
  return result;
}
function rowListToNewRecordList(rows) {
  const result = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    result.push(rowToNewRecord(row));
  }
  return result;
}
function rowToNewRecord(row) {
  return {
    id: row.id,
    context: row.context,
    events: row.events
  };
}
export {
  searchAnnotationWithMatching as a,
  rowListToRecordList as b,
  searchMistral7B as c,
  searchPHEE2Test as d,
  searchUIE as e,
  searchFlanT5 as f,
  getRecordByIDandModelPHEE as g,
  rowListToNewRecordList as r,
  searchAnnotationWithSubkey as s
};
