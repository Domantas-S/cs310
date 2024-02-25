/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export interface Combination {
  event_type: string;
  event_id: string;
  Drug?: Common;
  Trigger?: Common;
}
export interface Common {
  text: string[][];
  start: number[][];
  entity_id: string[][];
}
export interface Event {
  event_type: string;
  event_id: string;
  Effect?: Common;
  Trigger?: Common;
  Negated?: ValuedCommonBool;
  Speculated?: ValuedCommonBool;
  Severity?: ValuedCommonStr;
  Subject?: Subject;
  Treatment?: Treatment;
}
export interface ValuedCommonBool {
  text: string[][];
  start: number[][];
  entity_id: string[][];
  value: boolean;
}
export interface ValuedCommonStr {
  text: string[][];
  start: number[][];
  entity_id: string[][];
  value: string;
}
export interface Subject {
  text: string[][];
  start: number[][];
  entity_id: string[][];
  Age?: Common;
  Disorder?: Common;
  Gender?: Common;
  Population?: Common;
  Race?: Common;
}
export interface Treatment {
  text: string[][];
  start: number[][];
  entity_id: string[][];
  Drug?: Common;
  Disorder?: Common;
  Dosage?: Common;
  Duration?: Common;
  Trigger?: Common;
  Route?: Common;
  Time_elapsed?: Common;
  Freq?: Common;
  Combination?: Combination[];
}
export interface EventInfo {
  event_type: string;
  event_id: string;
}
export interface Events {
  events: Event[];
}
export interface Record {
  id: string;
  context: string;
  is_mult_event: boolean;
  annotations: Events[];
}
