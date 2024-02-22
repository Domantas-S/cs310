
<script lang="ts">
    import Icon from '@iconify/svelte';
    import rightArrow from '@iconify/icons-material-symbols/line-end-arrow';
    import AnnotatedRecord from '$lib/common/AnnotatedRecord.svelte';
    import contentCopy from '@iconify/icons-material-symbols/content-copy';
    import CopyButton from '$lib/common/CopyButton.svelte';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';

    let schema : string = "A python schema will go here...";
    let waiting : boolean = false;
    let model : string = "default";
    const blankRecord : record = {"id": "0", "context": "No record to display", "is_mult_event": false, "annotations": []}
			
    const modalStore = getModalStore();
    const modal : ModalSettings = {
        type: 'prompt',
        title: 'Edit Schema',
        body: 'Edit the Python schema here. Once you are done, click "Submit" to save the schema.',

        value: schema,
        response: async (r: string) => {
            schema = r;
        },
    }

    $: {
        schema = schema;
    }

    async function annotate() {
        waiting = true;
        console.log("Annotating...");
        // TODO: Implement the annotate function, using sleep to simulate a long-running process
        await new Promise(resolve => setTimeout(resolve, 3000));
        waiting = false;
    }

</script>
  
<div class="container mx-auto">
    <h1 class="h1">Live Record Annotations</h1>
    <div class="py-3" />
    <div class="card grid grid-rows-1 grid-cols-4 divide-x divide-solid gap-x-5 p-3">
        <div class="px-5">
            <div class="py-1 px-5 text-center rounded-lg hover:bg-surface-900">
                <span class="badge bg-primary-500">1</span>
                <span class="flex-auto">Enter the medical record in the box below</span>
            </div>
        </div>
        <div class="px-5">
            <div class="py-1 px-5 text-center rounded-lg hover:bg-surface-900">
                <span class="badge bg-primary-500">2</span>
                <span class="flex-auto">Select which model you would like to use</span>
            </div>
        </div>
        <div class="px-5">
            <div class="py-1 px-5 text-center rounded-lg hover:bg-surface-900">
                <span class="badge bg-primary-500">3</span>
                <span class="flex-auto">Modify the Python schema (if you wish)</span>
            </div>
        </div>

        <div class="px-5">
            <div class="py-1 px-5 text-center rounded-lg hover:bg-surface-900">
                <span class="badge bg-primary-500">4</span>
                <span class="flex-auto">Click "Annotate" to see the results</span>
            </div>
        </div>
    </div>
    
    <div class="py-5" />

    <div class="grid grid-cols-5">
        <div class="card p-5 col-span-2">
            <textarea class="textarea" rows="10" cols="50" placeholder="Enter a medical record here"></textarea>
        </div>
        <div class="py-3 col-span-1">
            <div class="flex justify-center items-center">
                <Icon icon={rightArrow} class="text-6xl" />
            </div>
            
            <div class="py-3" />

            <div class="px-5">
                <p class="text-sm italic">Select model for annotations:</p>
                <select class="select" id="model" bind:value={model}>
                    <option value={"default"}>Default</option>
                    <option value={null} disabled>More to come...</option>
                </select>

                <div class="py-2" />
                <div class="flex justify-center">
                    <button class="btn btn-sm variant-filled rounded-md" on:click={() => modalStore.trigger(modal)}>Edit Schema</button>
                </div>
                <div class="py-2"/>
                <div class="flex justify-center">
                    <button class="btn variant-filled-primary rounded-md w-full" on:click={annotate} disabled={waiting}>Annotate</button>
                </div>
            </div>

            {#if waiting}
                <div class="py-2 px-5">
                    <ProgressBar meter="bg-primary-500" track="bg-primary-500/30"/>
                </div>
            {/if}

        </div>
        <div class="container card p-4 col-span-2" style="position:relative">
            <CopyButton data={blankRecord} />
            <div>
                <h3 class="h3">Results</h3>
            </div>
            
            <div class="py-3" />
            <div class="flex justify-center">
                <AnnotatedRecord data={blankRecord}/>
            </div>
        </div>
    </div>
</div>