<script lang="ts">
    import AnnotatedRecord from '$lib/common/AnnotatedRecord.svelte';
    import type { record } from '$lib/interfaces';
  
    let exampleRecord1LLM : record = {"id": "I messed up!", "context": "Prolongation of the QT interval observed in a Japanese patient with vivax malaria following treatment with halofantrine","is_mult_event": false,"annotations": [{"event_id": "E1","event_type": "Adverse_event","Trigger": {"text": [["Prolongation of the QT interval"]],"start": [[0]]},"Subject": {"text": [["a Japanese patient"]],"start": [[43]],"Disorder": {"text": [["vivax malaria"]],"start": [[26]]},"Race": {"text": [["Japanese"]],"start": [[43]]},"Age": {"text": [["-"]],"start": [[43]]},"Gender": {"text": [["-"]],"start": [[43]]},"Population": {"text": [["1"]],"start": [[43]]}},"Treatment": {"text": [["treatment with halofantrine"]],"start": [[80]],"Drug": {"text": [["halofantrine"]],"start": [[80]]},"Dosage": {"text": [["-"]],"start": [[80]]},"Duration": {"text": [["-"]],"start": [[80]]},"Route": {"text": [["-"]],"start": [[80]]},"Time_elapsed": {"text": [["following"]],"start": [[70]]},"Freq": {"text": [["-"]],"start": [[80]]},"Trigger": {"text": [["following"]],"start": [[70]]},"Disorder": {"text": [["vivax malaria"]],"start": [[26]]}},"Effect": {"text": [["Prolongation of the QT interval"]],"start": [[0]]}}]}
    let exampleRecord2Human :record = {"id": "8586895_3", "context": "Prolongation of the QT interval observed in a Japanese patient with vivax malaria following treatment with halofantrine.", "is_mult_event": false, "annotations": [{"event_id": "E1", "event_type": "Adverse_event", "Trigger": {"text": [["following"]], "start": [[82]], "entity_id": ["T6"]}, "Subject": {"text": [["a Japanese patient with vivax malaria"]], "start": [[44]], "entity_id": ["T3"], "Race": {"text": [["Japanese"]], "start": [[46]], "entity_id": ["T7"]}}, "Effect": {"text": [["Prolongation of the QT interval"]], "start": [[0]], "entity_id": ["T4"]}, "Treatment": {"text": [["halofantrine"]], "start": [[107]], "entity_id": ["T5"], "Disorder": {"text": [["vivax malaria"]], "start": [[68]], "entity_id": ["T8"]}, "Drug": {"text": [["halofantrine"]], "start": [[107]], "entity_id": ["T9"]}}}]}


</script>
  
  <div class="card flex">
    <div class="border rounded border-gray-300 p-1 text-center">
        <h5>LLM annotated</h5>
        <AnnotatedRecord data={exampleRecord1LLM} />
    </div>
    <div class="px-2"></div>
    <div class="border rounded border-gray-300 p-1 text-center">
        <h5>Human annotated</h5>
        <AnnotatedRecord data={exampleRecord2Human} />
    </div>
  </div>