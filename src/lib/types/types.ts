export interface newRecord {
    id: string,
    context: string,
    events: event[],
}

export interface event {
    type: string,
    annotations: annotation[],
}

export interface annotation {
    start?: number,
    annotation: string,
    text: string,
}

export interface extractedAnnotation {
    annotation: string,
    start: number,
    text: string,
    event_num: number,
    event_type: string,
}