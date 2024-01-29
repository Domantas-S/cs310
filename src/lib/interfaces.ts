export interface record {
    id: string,
    context: string,
    is_mult_event: boolean,
    annotations: event[],
}

export interface event extends event_info {
    Effect?: common,
    Trigger?: common,
    Negated?: valued_common,
    Severity?: valued_common,
    Speculated?: valued_common,

    Subject?: subject,
    Treatment?: treatment,
}

export interface event_info {
    event_type: string,
    event_id: string,
}

export interface common {
    text: string[][],
    start: number[][],
    entity_id: string[][],
}

export interface valued_common extends common {
    value: boolean
}


export interface subject extends common {
    Age?: common,
    Disorder?: common,
    Gender?: common,
    Population?: common,
    Race?: common,
}

export enum combination_field {
    Drug = "Drug",
    Trigger = "Trigger",
}
export interface combination extends event_info {
    Drug?: common,
    Trigger?: common,
}

export enum treatment_field {
    Drug = "Drug",
    Disorder = "Disorder",
    Dosage = "Dosage",
    Duration = "Duration",
    Trigger = "Trigger",
    Route = "Route",
    Time_elapsed = "Time_elapsed",
    Freq = "Freq",
    Combination = "Combination",
}
export interface treatment extends common {
    Drug?: common,
    Disorder?: common,
    Dosage?: common,
    Duration?: common,
    Trigger?: common,
    Route?: common,
    Time_elapsed?: common,
    Freq?: common,
    Combination?: combination[],
}

export interface annotation {
    start: number, 
    text: string,
    annotation_type: string,
}

export interface annotation_segment{
    start: number,
    end: number,
    text: string,
    is_annotation: boolean,
    annotation_type: string,
    children: annotation_segment[],
    event_colour: number, // the ith event of the record, starting from 0, used for colouring different events
}

export interface query {
    id: number,
    key: string, 
    subkey: string, 
    searchTerm: string, 
    exclude: boolean
}