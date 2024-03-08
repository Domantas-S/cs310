// @ts-nocheck

// import { newRecord, event } from "$lib/types/types";
// import { record } from "$lib/interfaces";  // PHEE record type
import fs from "fs";

export function pheeToNewRecord(pheeRecord) { //: record): newRecord {
    let newRecord = { //: newRecord = {
        id: pheeRecord.id,
        context: pheeRecord.context,
        events: []
    };

    for (let i = 0; i < pheeRecord.annotations.length; i++) {
        let event = pheeRecord.annotations[i];
        let newEvent = { // : event = {
            type: event.event_type,
            annotations: []
        }

        for (const [key, value] of Object.entries(event)) {
            if (key === "event_type" || key === "event_id") continue;

            for (let j = 0; j < value.text.length; j++) {
                let annotation = {
                    start: value.start[j][0], // as number,
                    annotation: key,
                    text: value.text[j][0], // as string,
                }
                newEvent.annotations.push(annotation);
            }

            if (key === "Subject" || key === "Treatment") { // do second deeper pass for subject and treatment
                for (const [subKey, subValue] of Object.entries(value)) {   // value is another object
                    if (subKey === "text" || subKey === "start" || subKey === "entity_id") continue; // this is already extracted from the above pass
                    
                    if (subKey === "Combination"){
                        for (const [subSubKey, subSubValue] of Object.entries(subValue[0])) {
                            if (subSubKey === "text" || subSubKey === "start" || subSubKey === "entity_id" || subSubKey === "event_type" || subSubKey === "event_id") continue
                            console.log(subSubKey, subSubValue);
                            for (let k = 0; k < subSubValue.text.length; k++) {
                                let annotation = {
                                    start: subSubValue.start[k][0], // as number,
                                    annotation: `${key}.${subKey}.${subSubKey}`,
                                    text: subSubValue.text[k][0], // as string,
                                }
                                newEvent.annotations.push(annotation);
                            }
                        }
                    } else {
                        for (let k = 0; k < subValue.text.length; k++) {
                            let annotation = {
                                start: subValue.start[k][0], // as number,
                                annotation: `${key}.${subKey}`,
                                text: subValue.text[k][0], // as string,
                            }
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

// Convert all PHEE2 test records to newRecord structure
function convertAllPHEE2ToNewRecord() {
    let newRecords = [];
    let pheeTestRecords = fs.readFileSync("src/lib/data/phee2/test.json", "utf-8");
    pheeTestRecords = JSON.parse('[' + pheeTestRecords.split("\n").join(',').slice(0,-1) +']');

    for (let i = 0; i < pheeTestRecords.length; i++) {
        pheeTestRecords[i] = {
            id : pheeTestRecords[i].id,
            context : pheeTestRecords[i].context,
            annotations : pheeTestRecords[i].annotations[0].events  // move up events to annotations
        }
        let newRecord = pheeToNewRecord(pheeTestRecords[i]);
        newRecords.push(newRecord);
    }

    fs.writeFileSync("src/lib/data/phee2/test_converted.txt", newRecords.map(record => JSON.stringify(record)).join('\n'));
}

// convertAllPHEE2ToNewRecord();