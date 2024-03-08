<script lang="ts">
    import AnnotatedRecord2 from './AnnotatedRecord2.svelte';
	import { dataSourceToString, DataSource } from '$lib/datatypes';
	import type { newRecord } from '$lib/types/types';
	import SourceSelector from './SourceSelector.svelte';

    const blankRecord : newRecord = {"id": "0", "context": "No record to display", "events": []}
  
    export let data: newRecord = blankRecord;    // data is the record to be displayed (base record)
    export let originalSource: DataSource; // originalSource is the source of the base record
    let comparisonData: newRecord | null = null // comparisonData is the record to be compared with the base record
    let comparisonSource: DataSource = originalSource // comparisonSource is the source of the comparison record

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
        <AnnotatedRecord2 data={data} popupToggle={popupToggle}/>
    </div>
    <span class="divider-vertical" />
    <div class="border rounded border-gray-300 p-1 text-center space-y-1">
        <SourceSelector bind:source={comparisonSource}/>
        {#if comparisonData == null}
            <AnnotatedRecord2 data={blankRecord} popupToggle={popupToggle}/>
        {:else}
            <AnnotatedRecord2 data={comparisonData} popupToggle={popupToggle}/>
        {/if}
    </div>
  </div>