import type { Row } from "postgres";

export function filterRecordsByKeyword(records: Row[], keyword: string): Row[] {
    return records.filter((record) => {
        return record.context.toLowerCase().includes(keyword.toLowerCase());
    });
}

