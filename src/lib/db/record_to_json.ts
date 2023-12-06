
function record_to_json(record : any) {
    return {
        id: record.record_id,
        info: record.info,
        context: record.context
    };
}

function record_to_json_array(records : any[]) {
    return records.map(record_to_json);
}