<script lang="ts">
    import type { record } from '$lib/interfaces';
    import Icon from '@iconify/svelte';
    import dataIcon from '@iconify/icons-material-symbols/code';
    import notesIcon from '@iconify/icons-material-symbols/notes';

    import JsonRecord from './JSONRecord.svelte';
	import AnnotatedRecord from './AnnotatedRecord.svelte';
  
    export let info: record;
    export let currentRecord: number;
    export let totalRecords: number;
    export let raw = false;

    export let popupToggle = false;

    $: {
        info = info;
        currentRecord = currentRecord;
        totalRecords = totalRecords;
        raw = raw;
        popupToggle = popupToggle;
    }

</script>
  
<div class="border rounded border-gray-300 p-4">
    <div class="flex grid grid-cols-3">
        <p class="flex justify-begin"><i>{`${currentRecord} / ${totalRecords}`}</i></p>
        <p><strong>ID: {info.id}</strong></p>
        <div class="flex justify-end">
            {#if !raw}
                <!-- Toggle annotations buttons -->
                <button class="btn-icon btn-icon-sm variant-filled" on:click={() => popupToggle = !popupToggle}>    
                    <Icon icon={notesIcon} />
                </button>
                <div class="px-1"></div>
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
    {#if !raw}
        <!-- <p>{info.context}</p> -->
        <AnnotatedRecord data={info} popupToggle={popupToggle}/>
    {:else} 
        <JsonRecord data={info}></JsonRecord>
    {/if}
    <div class="py-2"></div>
    <div class="flex justify-between">
        <p>{info.annotations[0].event_type}</p>
        <p>Human annotated</p>
    </div>
</div>
