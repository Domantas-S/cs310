
<script lang="ts">
    import Icon from '@iconify/svelte';
    import uploadIcon from '@iconify/icons-material-symbols/file-upload';
    import AnnotatedRecord2 from '$lib/component/AnnotatedRecord2.svelte';
    import type { newRecord } from '$lib/types/types';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    import { FileButton } from '@skeletonlabs/skeleton';
    import { ModelType, modelTypeToString } from '$lib/datatypes';
    
    // Code block and highlighting
    import { CodeBlock } from '@skeletonlabs/skeleton';
    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/github-dark.css';
    import json from 'highlight.js/lib/languages/json';
    import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import { FLANT5ToNewRecord } from '$lib/data_conversion/FLAN-T5_to_newrecord';
	import { UIEToNewRecord } from '$lib/data_conversion/UIE_to_newrecord';
    hljs.registerLanguage('json', json);
    storeHighlightJs.set(hljs);

    // const exampleOutput = '{ "id": "x", "context": "It has been suggested that PPE (probable phenylotoxicity) caused by cytarabine does not recur with subsequent cytarabine re-challenge.", "is_mult_event": false, "annotations": [ { "events": [ { "event_type": "Potential_therapeutic_effect", "event_id": "E1", "Effect": { "text": ["does not recur"], "start": ["]["], "entity_id": ["T1"]}, "Trigger": { "text": [ "PPE caused by cytarabine" ], "start": [ "PPE caused by cytarabine" ], "entity_id": ["T1"]}, "Negated": { "text": ["is not recur"], "start": [ "does not recur" ], "entity_id": ["T2"], "value": true}, "Speculated": { "text": ["has been suggested"], "start": [ "It has been suggested" ], "entity_id": ["T3"], "value": true}, "Severity": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T4"], "value": "low"}, "Subject": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T5"], "Age": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T6"]}, "Disorder": { "text": ["cytarabine"], "start": [ "cytarabine" ], "entity_id": ["T7"]}, "Gender": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T8"]}, "Population": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T9"]},"Race": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T10"]}}, "Treatment": { "text": ["cytarabine"], "start": [ "cytarabine" ], "entity_id": ["T11"],"Drug": { "text": ["cytarabine"], "start": [ "cytarabine" ], "entity_id": ["T12"]}, "Disorder": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T13"]}, "Dosage": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T14"]}, "Duration": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T15"]}, "Trigger": { "text": ["PPE"], "start": [ "PPE" ], "entity_id": ["T16"]}, "Route": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T17"]}, "Time_elapsed": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T18"]}, "Freq": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T19"]},"Combination": [{ "event_type": "Potential_therapeutic_effect", "event_id": "E1", "Drug": { "text": ["cytarabine"], "start": [ "cytarabine" ], "entity_id": ["T12"]}, "Trigger": { "text": ["PPE"], "start": [ "PPE" ], "entity_id": ["T16"]}}, { "event_type": "Adverse_event", "event_id": "E2", "Drug": { "text": ["not specified"], "start": [ "" ], "entity_id": ["T22"]}, "Trigger": { "text": ["cytarabine"], "start": [ "cytarabine" ], "entity_id": ["T23"]}}]}}]}]}'
    const exampleOutput = {"id":"X1234567_1","context":"A French woman experienced sleep apnea after taking ibuprofen for 2 weeks.", "events":[{   "type":"Adverse_event",   "annotations":[{     "annotation":"Trigger","text":"after taking ibuprofen for 2 weeks"},     {"annotation":"Effect","text":"sleep apnea"},     {"annotation":"Treatment","text":"ibuprofen"},     {"annotation":"Treatment.Drug","text":"ibuprofen"},     {"annotation":"Subject","text":"A French woman"},     {"annotation":"Subject.Gender","text":"woman"}]}]};
    // const blankRecord : record = {"id": "0", "context": "No record to display", "is_mult_event": false, "annotations": []}

    let schema : string = "A python schema will go here...";
    let waiting : boolean = false;
    let model : ModelType = ModelType.MISTRAL7B;
    let text : string = "";
    let result : newRecord = exampleOutput;
    let files: FileList;
			
    const modalStore = getModalStore();
    const modal : ModalSettings = {
        type: 'prompt',
        title: 'Edit Schema - WORK IN PROGRESS',
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
        
        let formatted_input = text.trim();
        // formatted_input = formatted_input.charAt(0).toUpperCase() + formatted_input.slice(1);


        const response = await fetch("/api/annotate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"text" : [formatted_input], "model" : model}),
        });
        const data = await response.json();
        console.log(data);

        if (model === ModelType.FLANT5) {
            result = FLANT5ToNewRecord(data[0]);
            result.context = formatted_input;
        } else if (model === ModelType.UIE) {
            result = UIEToNewRecord(data[0]);
            result.context = formatted_input;
        } else {
            result = JSON.parse(data[0]);
        }

        waiting = false;
    }


</script>
  
<div class="container mx-auto">
    <h1 class="h1">Live Record Annotations</h1>
    <div class="py-3" />
    <div class="card grid grid-rows-1 grid-cols-3 divide-x divide-solid gap-x-5 p-3">
        <div class="px-5">
            <div class="py-1 px-5 text-center rounded-lg hover:bg-surface-500 hover:text-white">
                <span class="badge bg-primary-500 text-white">1</span>
                <span class="flex-auto">Enter a medical record in the box below</span>
            </div>
        </div>
        <div class="px-5">
            <div class="py-1 px-5 text-center rounded-lg hover:bg-surface-500 hover:text-white">
                <span class="badge bg-primary-500 text-white">2</span>
                <span class="flex-auto">Select which model to use for annotations</span>
            </div>
        </div>
        <!-- <div class="px-5">
            <div class="py-1 px-5 text-center rounded-lg hover:bg-surface-500 hover:text-white">
                <span class="badge bg-primary-500 text-white">3</span>
                <span class="flex-auto">Modify the Python schema</span>
            </div>
        </div> -->

        <div class="px-5">
            <div class="py-1 px-5 text-center rounded-lg hover:bg-surface-500 hover:text-white">
                <span class="badge bg-primary-500 text-white">3</span>
                <span class="flex-auto">Click "Annotate" to see the results</span>
            </div>
        </div>
    </div>
    
    <div class="py-5" />

    <div class="grid grid-cols-5 space-x-5">
        <div class="card p-5 col-span-2">
            <textarea class="textarea" rows=8 cols=50 placeholder="Enter a medical record here" bind:value={text} disabled={waiting || (files !== undefined)}></textarea>
            <div class="py-3 col-span-1">
                <!-- <div class="flex justify-center items-center">
                    <Icon icon={rightArrow} class="text-6xl" />
                </div> -->
                
                <div class="py-1" />
    
                <div class="px-5">
                    <p class="text-sm italic">Select model for annotations:</p>
                    <select class="select" id="model" bind:value={model}>
                        <option value={ModelType.MISTRAL7B}>Mistral-7B Instruct-v0.2.Q2_K</option>
                        <option value={ModelType.FLANT5}>{modelTypeToString(ModelType.FLANT5)}</option>
                        <option value={ModelType.UIE}>{modelTypeToString(ModelType.UIE)}</option>
                        <!-- <option value={null} disabled>More to come...</option> -->
                    </select>
    
                    <div class="py-2" />
                    <!-- <div class="flex justify-center">
                        <button class="btn btn-sm variant-filled rounded-md bg-primary-600 text-white" on:click={() => modalStore.trigger(modal)}>Edit Schema</button>
                    </div>
                    <div class="py-2"/> -->

                    <!-- <div class="flex justify-center">
                        <FileButton name="files" bind:files={files} disabled={waiting} button="btn btn-sm variant-filled rounded-md bg-primary-600 text-white">
                            <Icon icon={uploadIcon} />
                            Upload File
                        </FileButton>
                    </div> -->
                    <div class="py-2"/>

                    <div class="flex justify-center">
                        <button class="btn variant-filled-primary rounded-md w-full bg-primary-600 text-white" on:click={annotate} disabled={waiting}>Annotate</button>
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
            {#key result}
                <AnnotatedRecord2 data={result}/>
                <div class="py-3" />
                <CodeBlock code={JSON.stringify(result)} text="text-xs" language="json" />
            {/key}
            </div>
        </div>
    </div>
</div>