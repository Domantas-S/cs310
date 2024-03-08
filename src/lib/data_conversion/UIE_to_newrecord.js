// import type { newRecord, event } from "$lib/types/types";
import fs from "fs";
import { FLANT5ToNewRecord } from "./FLAN-T5_to_newrecord.js";


// UIE results are of the same format as FLAN-T5 results, so we can reuse the FLAN-T5 conversion function
export function UIEToNewRecord(UIErecord) {
    return FLANT5ToNewRecord(UIErecord);
}

// open the file, convert each record, save to new file
function convertAllUIEToNewRecord() {
    let newRecords = [];
    let UIErecords = fs.readFileSync("src/lib/data/uie/test_preds_record.txt", "utf-8");
    let pheeTestRecords = fs.readFileSync("src/lib/data/phee2/test.json", "utf-8");
    UIErecords = JSON.parse('[' + UIErecords.split("\n").join(',').slice(0,-1) +']');
    pheeTestRecords = JSON.parse('[' + pheeTestRecords.split("\n").join(',').slice(0,-1) +']');
    
    for (let i = 0; i < UIErecords.length; i++) {
        let updatedRecord = {
            id : pheeTestRecords[i].id,
            context : pheeTestRecords[i].context,
            ...UIErecords[i]
        }
        newRecords.push(FLANT5ToNewRecord(updatedRecord));
    }
    
    fs.writeFileSync("src/lib/data/uie/test_preds_record_converted.txt", newRecords.map(record => JSON.stringify(record)).join('\n'));
}

// convertAllUIEToNewRecord();