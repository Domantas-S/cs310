// import type { newRecord, event } from "$lib/types/types";
import fs from "fs";


// In addition to the normal fields in test_preds_record.txt, we additionally require the "context" field, which is the entire record text.
export function FLANT5ToNewRecord(flanT5record) {
    const context = flanT5record["context"] ? flanT5record["context"] : "";
    const id = flanT5record["id"] ? flanT5record["id"] : "0";

    let newRecord = {
        id: id,
        context: context,
        events: []
    };

    for (const e of flanT5record.event.string) {
        let newEvent = {
            type: e.type,
            annotations: [
                {
                    annotation: 'trigger',
                    text: e.trigger
                }
            ]
        }

        for (let i = 0; i < e.roles.length; i++) {
            let annotation = {
                annotation: e.roles[i][0],
                text: e.roles[i][1],
            }
            newEvent.annotations.push(annotation);
        }
        newRecord.events.push(newEvent);
    }

    return newRecord;
}

// open the file, convert each record, save to new file
function convertAllFLANT5ToNewRecord() {
    let newRecords = [];
    let flanT5records = fs.readFileSync("src/lib/data/flan-t5/test_preds_record.txt", "utf-8");
    let pheeTestRecords = fs.readFileSync("src/lib/data/phee2/test.json", "utf-8");
    flanT5records = JSON.parse('[' + flanT5records.split("\n").join(',').slice(0,-1) +']');
    pheeTestRecords = JSON.parse('[' + pheeTestRecords.split("\n").join(',').slice(0,-1) +']');
    
    for (let i = 0; i < flanT5records.length; i++) {
        let updatedRecord = {
            id : pheeTestRecords[i].id,
            context : pheeTestRecords[i].context,
            ...flanT5records[i]
        }
        newRecords.push(FLANT5ToNewRecord(updatedRecord));
    }
    
    fs.writeFileSync("src/lib/data/flan-t5/test_preds_record_converted.txt", newRecords.map(record => JSON.stringify(record)).join('\n'));
}

// convertAllFLANT5ToNewRecord();