<script lang="ts">
    import AnnotatedRecord2 from './AnnotatedRecord2.svelte';
	import { DataSource, ModelType, modelTypeToString } from '$lib/datatypes';
	import type { newRecord } from '$lib/types/types';
	import ModelSelector from './ModelSelector.svelte';

    const blankRecord : newRecord = {"id": "0", "context": "No record to display", "events": []}
  
    export let data: newRecord = blankRecord;    // data is the record to be displayed (base record)
    export let source: DataSource; 
    export let originalModel: ModelType; // originalModel is the model of the base record
    let comparisonData: newRecord | null = null // comparisonData is the record to be compared with the base record
    let comparisonModel: ModelType = originalModel // comparisonSource is the source of the comparison record

    export let popupToggle = false;
    
    $: {
        data = data;
        source = source;
        originalModel = originalModel;
        popupToggle = popupToggle;
        comparisonModel = comparisonModel;
        getComparisonRecord();
    }

    async function getComparisonRecord() {
        const response = await fetch("/api/get_record" + "?id=" + data.id + "&source=" + source + "&model=" + comparisonModel, {
            method: "GET",
        });

        if (response.ok) {
            try {
                comparisonData = await response.json();
            } catch (e) {
                console.error('Error retrieving comparison record! This record likely does not exist in this source.\n' + e);
                comparisonData = null;
            }
        } else {
            comparisonData = null;
        }
    }

</script>
  
  <div class="flex space-x-3">
    <div class="border rounded border-gray-300 p-1 text-center space-y-1">
        <h5>{modelTypeToString(originalModel)}</h5>
        <AnnotatedRecord2 data={data} popupToggle={popupToggle}/>
    </div>
    <span class="divider-vertical" />
    <div class="border rounded border-gray-300 p-1 text-center space-y-1">
        <ModelSelector bind:model={comparisonModel}/>
        {#if comparisonData == null}
            <AnnotatedRecord2 data={blankRecord} popupToggle={popupToggle}/>
        {:else}
            <AnnotatedRecord2 data={comparisonData} popupToggle={popupToggle}/>
        {/if}
    </div>
  </div>