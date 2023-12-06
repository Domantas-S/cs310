export interface record {
    id: string,
    context: string,
    is_mult_event: boolean,
    annotations: event[],
}

export interface event extends event_info {
    effect?: common,
    trigger?: common,
    negated?: valued_common,
    severity?: valued_common,
    speculated?: valued_common,

    subject?: subject,
    treatment?: treatment,
}

interface event_info {
    event_type: string,
    event_id: string,
}

interface common {
    text: string[][],
    start: number[][],
    entity_id: string[][],
}

interface valued_common extends common {
    value: boolean
}

interface subject extends common {
    age?: common,
    disorder?: common,
    gender?: common,
    population?: common,
    race?: common,
}

interface combination extends event_info {
    drug?: common,
    trigger?: common,
}

interface treatment extends common {
    drug?: common,
    disorder?: common,
    dosage?: common,
    duration?: common,
    trigger?: common,
    route?: common,
    time_elapsed?: common,
    freq?: common,
    combination?: combination[],

}
