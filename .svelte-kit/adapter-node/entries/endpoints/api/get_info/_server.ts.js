import { s as searchAnnotationWithSubkey, a as searchAnnotationWithMatching, b as rowListToRecordList, c as searchMistral7B, r as rowListToNewRecordList, d as searchPHEE2Test, e as searchUIE, f as searchFlanT5 } from "../../../../chunks/common.js";
import { D as DataSource, M as ModelType } from "../../../../chunks/datatypes.js";
import "fs";
function pheeToNewRecord(pheeRecord) {
  let newRecord = {
    //: newRecord = {
    id: pheeRecord.id,
    context: pheeRecord.context,
    events: []
  };
  for (let i = 0; i < pheeRecord.annotations.length; i++) {
    let event = pheeRecord.annotations[i];
    let newEvent = {
      // : event = {
      type: event.event_type,
      annotations: []
    };
    for (const [key, value] of Object.entries(event)) {
      if (key === "event_type" || key === "event_id")
        continue;
      for (let j = 0; j < value.text.length; j++) {
        let annotation = {
          start: value.start[j][0],
          // as number,
          annotation: key,
          text: value.text[j][0]
          // as string,
        };
        newEvent.annotations.push(annotation);
      }
      if (key === "Subject" || key === "Treatment") {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (subKey === "text" || subKey === "start" || subKey === "entity_id")
            continue;
          if (subKey === "Combination") {
            for (const [subSubKey, subSubValue] of Object.entries(subValue[0])) {
              if (subSubKey === "text" || subSubKey === "start" || subSubKey === "entity_id" || subSubKey === "event_type" || subSubKey === "event_id")
                continue;
              for (let k = 0; k < subSubValue.text.length; k++) {
                let annotation = {
                  start: subSubValue.start[k][0],
                  // as number,
                  annotation: `${key}.${subKey}.${subSubKey}`,
                  text: subSubValue.text[k][0]
                  // as string,
                };
                newEvent.annotations.push(annotation);
              }
            }
          } else {
            for (let k = 0; k < subValue.text.length; k++) {
              let annotation = {
                start: subValue.start[k][0],
                // as number,
                annotation: `${key}.${subKey}`,
                text: subValue.text[k][0]
                // as string,
              };
              newEvent.annotations.push(annotation);
            }
          }
        }
      }
    }
    newRecord.events.push(newEvent);
  }
  return newRecord;
}
async function GET({ url }) {
  let key = url.searchParams.get("key");
  let subkey = url.searchParams.get("subkey");
  let target = url.searchParams.get("target");
  let exclude = url.searchParams.get("exclude");
  const source = url.searchParams.get("source");
  const model = url.searchParams.get("model");
  if (key == null) {
    return new Response(JSON.stringify({ error: "Missing key parameter" }), { status: 400 });
  }
  if (source == null) {
    return new Response(JSON.stringify({ error: "Missing source parameter" }), { status: 400 });
  }
  if (model == null) {
    return new Response(JSON.stringify({ error: "Missing model parameter" }), { status: 400 });
  }
  let result = [];
  subkey = subkey ?? "";
  target = target ?? "";
  exclude = exclude ?? "false";
  let sourceInt = source ? parseInt(source) : DataSource.PHEE_TRAIN_SET;
  let modelInt = model ? parseInt(model) : ModelType.HUMAN;
  switch (sourceInt) {
    case DataSource.PHEE_TRAIN_SET:
      if (target == "") {
        result = await searchAnnotationWithSubkey(key, subkey);
      } else {
        result = await searchAnnotationWithMatching(key, subkey, target);
      }
      return new Response(JSON.stringify(rowListToRecordList(result).map((rec) => pheeToNewRecord(rec))), { status: 200 });
    case DataSource.PHEE2_TEST_SET:
      return searchPHEETest(modelInt, key, subkey, target, exclude == "true");
  }
}
async function searchPHEETest(model, key, subkey, target, exclude) {
  const noParentKey = ["age", "gender", "population", "race", "drug", "route", "dosage", "time elapsed", "duration", "frequency", "combination drug"];
  let result = [];
  let searchKey = key;
  if (key.toLowerCase() === "any")
    searchKey = "";
  switch (model) {
    case ModelType.FLANT5:
      searchKey = searchKey.toLowerCase();
      if (subkey != "" && subkey.toLowerCase() != "any") {
        if (noParentKey.includes(subkey.toLowerCase())) {
          searchKey = subkey.toLowerCase();
        } else {
          searchKey = searchKey + " " + subkey.toLowerCase();
        }
      }
      result = await searchFlanT5(searchKey, target, exclude);
      return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });
    case ModelType.UIE:
      searchKey = searchKey.toLowerCase();
      if (subkey != "" && subkey.toLowerCase() != "any") {
        if (noParentKey.includes(subkey.toLowerCase())) {
          searchKey = subkey.toLowerCase();
        } else {
          searchKey = searchKey + " " + subkey.toLowerCase();
        }
      }
      result = await searchUIE(searchKey, target, exclude);
      return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });
    case ModelType.HUMAN:
      if (subkey != "") {
        searchKey = searchKey + "." + subkey;
      }
      result = await searchPHEE2Test(searchKey, target, exclude);
      return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });
    case ModelType.MISTRAL7B:
      if (subkey != "") {
        searchKey = searchKey + "." + subkey;
      }
      result = await searchMistral7B(searchKey, target, exclude);
      return new Response(JSON.stringify(rowListToNewRecordList(result)), { status: 200 });
    default:
      return new Response(JSON.stringify({ error: "Invalid source parameter" }), { status: 400 });
  }
}
export {
  GET
};
