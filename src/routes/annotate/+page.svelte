
<script lang="ts">
    import Icon from '@iconify/svelte';
    import rightArrow from '@iconify/icons-material-symbols/line-end-arrow';
    import AnnotatedRecord from '$lib/common/AnnotatedRecord.svelte';
    import JSONRecord from '$lib/common/JSONRecord.svelte';
    import contentCopy from '@iconify/icons-material-symbols/content-copy';
    import CopyButton from '$lib/common/CopyButton.svelte';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    
    // Code block and highlighting
    import { CodeBlock } from '@skeletonlabs/skeleton';
    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/github-dark.css';
    import json from 'highlight.js/lib/languages/json';
    import { storeHighlightJs } from '@skeletonlabs/skeleton';
    hljs.registerLanguage('json', json);
    storeHighlightJs.set(hljs);

    const exampleOutput = '{ "id": "x", "context": "It has been suggested that PPE (probable phenylotoxicity) caused by cytarabine does not recur with subsequent cytarabine re-challenge.", "is_mult_event": false, "annotations": [ { "events": [ { "event_type": "Potential_therapeutic_effect", "event_id": "E1", "Effect": { "text": ["does not recur"], "start": ["]["], "entity_id": ["T1"]}, "Trigger": { "text": [ "PPE caused by cytarabine" ], "start": [ "PPE caused by cytarabine" ], "entity_id": ["T1"]}, "Negated": { "text": ["is not recur"], "start": [ "does not recur" ], "entity_id": ["T2"], "value": true}, "Speculated": { "text": ["has been suggested"], "start": [ "It has been suggested" ], "entity_id": ["T3"], "value": true}, "Severity": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T4"], "value": "low"}, "Subject": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T5"], "Age": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T6"]}, "Disorder": { "text": ["cytarabine"], "start": [ "cytarabine" ], "entity_id": ["T7"]}, "Gender": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T8"]}, "Population": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T9"]},"Race": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T10"]}}, "Treatment": { "text": ["cytarabine"], "start": [ "cytarabine" ], "entity_id": ["T11"],"Drug": { "text": ["cytarabine"], "start": [ "cytarabine" ], "entity_id": ["T12"]}, "Disorder": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T13"]}, "Dosage": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T14"]}, "Duration": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T15"]}, "Trigger": { "text": ["PPE"], "start": [ "PPE" ], "entity_id": ["T16"]}, "Route": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T17"]}, "Time_elapsed": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T18"]}, "Freq": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T19"]},"Combination": [{ "event_type": "Potential_therapeutic_effect", "event_id": "E1", "Drug": { "text": ["cytarabine"], "start": [ "cytarabine" ], "entity_id": ["T12"]}, "Trigger": { "text": ["PPE"], "start": [ "PPE" ], "entity_id": ["T16"]}}, { "event_type": "Adverse_event", "event_id": "E2", "Drug": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T22"]}, "Trigger": { "text": ["cytarabine"], "start": [ "cytarabine" ], "entity_id": ["T23"]}}]}}]}]}'
    const pythonBackend = "http://localhost:5000/annotate";
    const blankRecord : record = {"id": "0", "context": "No record to display", "is_mult_event": false, "annotations": []}

    let schema : string = "A python schema will go here...";
    let waiting : boolean = false;
    let model : string = "default";
    let text : string = "";
    let result : string = exampleOutput;
			
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
        text = text;
        result = result;
    }

    async function annotate() {
        waiting = true;
        
        const response = await fetch(pythonBackend, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"text" : text}),
        });

        result = await response.text();
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

    <div class="grid grid-cols-5 space-x-5">
        <div class="card p-5 col-span-2">
            <textarea class="textarea" rows=8 cols=50 placeholder="Enter a medical record here" bind:value={text}></textarea>
            <div class="py-3 col-span-1">
                <!-- <div class="flex justify-center items-center">
                    <Icon icon={rightArrow} class="text-6xl" />
                </div> -->
                
                <div class="py-1" />
    
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
        </div>
        <div class="container card p-4 col-span-3">
            <div>
                <h3 class="h3">Results</h3>
            </div>
            
            <div class="py-3" />
            <div>
                <CodeBlock code={result} text="text-xs" language="json" />
            </div>
            <!-- <div class="flex justify-center flex-grow">
                <JSONRecord data={JSON.parse(result)}/>
            </div> -->
            <!-- ADD AnnotatedRecord here (after either doing some processing on the record or edits to AnnotatedRecord to work with empty start indices) -->
        </div>
    </div>
</div>