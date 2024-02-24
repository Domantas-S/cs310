<script lang="ts">
    import AnnotatedRecord from '$lib/common/AnnotatedRecord.svelte';
	import { dataSourceToString, DataSource } from '$lib/datatypes';
    import type { record } from '$lib/interfaces';
	import SourceSelector from './SourceSelector.svelte';

    const blankRecord : record = {"id": "0", "context": "No record to display", "is_mult_event": false, "annotations": []}
  
    const exampleRecord1LLM : record = {"id": "I messed up!", "context": "Prolongation of the QT interval observed in a Japanese patient with vivax malaria following treatment with halofantrine","is_mult_event": false,"annotations": [{"event_id": "E1","event_type": "Adverse_event","Trigger": {"text": [["Prolongation of the QT interval"]],"start": [[0]]},"Subject": {"text": [["a Japanese patient"]],"start": [[43]],"Disorder": {"text": [["vivax malaria"]],"start": [[26]]},"Race": {"text": [["Japanese"]],"start": [[43]]},"Age": {"text": [["-"]],"start": [[43]]},"Gender": {"text": [["-"]],"start": [[43]]},"Population": {"text": [["1"]],"start": [[43]]}},"Treatment": {"text": [["treatment with halofantrine"]],"start": [[80]],"Drug": {"text": [["halofantrine"]],"start": [[80]]},"Dosage": {"text": [["-"]],"start": [[80]]},"Duration": {"text": [["-"]],"start": [[80]]},"Route": {"text": [["-"]],"start": [[80]]},"Time_elapsed": {"text": [["following"]],"start": [[70]]},"Freq": {"text": [["-"]],"start": [[80]]},"Trigger": {"text": [["following"]],"start": [[70]]},"Disorder": {"text": [["vivax malaria"]],"start": [[26]]}},"Effect": {"text": [["Prolongation of the QT interval"]],"start": [[0]]}}]}
    const exampleRecord2Human :record = {"id": "8586895_3", "context": "Prolongation of the QT interval observed in a Japanese patient with vivax malaria following treatment with halofantrine.", "is_mult_event": false, "annotations": [{"event_id": "E1", "event_type": "Adverse_event", "Trigger": {"text": [["following"]], "start": [[82]], "entity_id": ["T6"]}, "Subject": {"text": [["a Japanese patient with vivax malaria"]], "start": [[44]], "entity_id": ["T3"], "Race": {"text": [["Japanese"]], "start": [[46]], "entity_id": ["T7"]}}, "Effect": {"text": [["Prolongation of the QT interval"]], "start": [[0]], "entity_id": ["T4"]}, "Treatment": {"text": [["halofantrine"]], "start": [[107]], "entity_id": ["T5"], "Disorder": {"text": [["vivax malaria"]], "start": [[68]], "entity_id": ["T8"]}, "Drug": {"text": [["halofantrine"]], "start": [[107]], "entity_id": ["T9"]}}}]}


    export let data: record = blankRecord;    // data is the record to be displayed (base record)
    export let originalSource: DataSource; // originalSource is the source of the base record
    let comparisonData: record | null = null // comparisonData is the record to be compared with the base record
    let comparisonSource: DataSource = DataSource.HUMAN_ANNOTATED // comparisonSource is the source of the comparison record

    export let popupToggle = false;
    
    $: {
        data = data;
        originalSource = originalSource;
        comparisonSource = comparisonSource;
        popupToggle = popupToggle;
        getComparisonRecord();
    }

    async function getComparisonRecord() {
        const response = await fetch("/api/get_record" + "?id=" + data.id + "&source=" + comparisonSource, {
            method: "GET",
        });

        if (response.ok) {
            console.log(response.text);
            try {
                comparisonData = await response.json();
            } catch (e) {
                console.error('Error retrieving comparison record! This record likely does not exist in this source.\n' + e);
                comparisonData = null;
            }
            console.log(comparisonData);
        } else {
            comparisonData = null;
        }
    }

</script>
  
  <div class="flex space-x-3">
    <div class="border rounded border-gray-300 p-1 text-center space-y-1">
        <h5>{dataSourceToString(originalSource)}</h5>
        <AnnotatedRecord data={data} popupToggle={popupToggle}/>
    </div>
    <span class="divider-vertical" />
    <div class="border rounded border-gray-300 p-1 text-center space-y-1">
        <SourceSelector bind:source={comparisonSource}/>
        {#if comparisonData == null}
            <AnnotatedRecord data={blankRecord} popupToggle={popupToggle}/>
        {:else}
            <AnnotatedRecord data={comparisonData} popupToggle={popupToggle}/>
        {/if}
    </div>
  </div>