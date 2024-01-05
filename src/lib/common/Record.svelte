<script lang="ts">
    import type { record } from '$lib/interfaces';
  
    export let info: record;
    export let currentRecord: number;
    export let totalRecords: number;
</script>
  
<div class="border rounded border-gray-300 p-4">
    <div class="flex grid grid-cols-3">
        <p class="flex justify-begin"><i>{`${currentRecord} / ${totalRecords}`}</i></p>
        <p><strong>ID: {info.id}</strong></p>
        <div class="flex justify-end">
            <button class="border border-gray-300 bg-transparent">
                annotation toggle
            </button>
            <button class="border border-gray-300 bg-transparent">
                raw
            </button>
        </div>
    </div>
    <div class="py-2"></div>
    
    <!-- Annotated record -->
    <p>{info.context}</p>

    <div class="py-2"></div>
    <div class="flex justify-between">
        <p>{info.annotations[0].event_type}</p>
        <p>Human annotated</p>
    </div>
</div>
