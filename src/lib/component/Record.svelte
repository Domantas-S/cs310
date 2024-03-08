<script lang="ts">
    import type { record } from '$lib/interfaces';
    import Icon from '@iconify/svelte';
    import dataIcon from '@iconify/icons-material-symbols/code';
    import notesIcon from '@iconify/icons-material-symbols/notes';
    import compareIcon from '@iconify/icons-material-symbols/compare';

    import JsonRecord from './JSONRecord.svelte';
	import AnnotatedRecord2 from './AnnotatedRecord2.svelte';
	import CompareRecords from './CompareRecords.svelte';
	import { DataSource, dataSourceToString } from '$lib/datatypes';
	import { pheeToNewRecord } from '$lib/data_conversion/phee_to_newrecord';
	import type { newRecord } from '$lib/types/types';

    export let info: newRecord;
    export let currentRecord: number;
    export let totalRecords: number;
    export let raw = false;
    export let source: DataSource;

    export let popupToggle = false;
    export let compareToggle = false;


    $: {
        info = info;
        currentRecord = currentRecord;
        totalRecords = totalRecords;
        raw = raw;
        popupToggle = popupToggle;
        compareToggle = compareToggle;
    }

</script>
  
<div class="border rounded border-gray-300 p-4">
    <div class="flex grid grid-cols-3">
        <p class="flex justify-begin"><i>{`${currentRecord} / ${totalRecords}`}</i></p>
        <p><strong>{info.events[0].type}</strong></p>
        <div class="flex justify-end space-x-2">
            {#if !raw}
                <!-- Compare annotations button with different models -->
                <button class="btn-icon btn-icon-sm variant-filled" on:click={() => compareToggle = !compareToggle}>
                    <Icon icon={compareIcon} />
                </button>

                <!-- Toggle annotations buttons -->
                <button class="btn-icon btn-icon-sm variant-filled" on:click={() => popupToggle = !popupToggle}>    
                    <Icon icon={notesIcon} />
                </button>
            {/if}

            <button
                class="btn-icon btn-icon-sm variant-filled"
                on:click={() => raw = !raw}>
                <Icon icon={dataIcon} />
            </button>
        </div>
    </div>
    <div class="py-2"></div>
    
    <!-- Annotated record -->
    {#if !raw && !compareToggle}
        <AnnotatedRecord2 data={info} popupToggle={popupToggle}/>
    {:else if compareToggle}
        <CompareRecords data={info} originalSource={source} popupToggle={popupToggle}/>
    {:else} 
        <JsonRecord data={info}></JsonRecord>
    {/if}
    <div class="py-2"></div>
    <div class="flex justify-between">
        <p>ID: {info.id}</p>
        <p>{dataSourceToString(source)}</p>
    </div>
</div>
