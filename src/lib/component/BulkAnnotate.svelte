<script lang="ts">
    import { DataSource, ModelType } from '$lib/datatypes';
    import type { newRecord } from '$lib/types/types';
    import { FileButton, ProgressBar } from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';
    import uploadIcon from '@iconify/icons-material-symbols/file-upload';
    import infoIcon from '@iconify/icons-material-symbols/info';
    import ModelSelector from './ModelSelector.svelte';
    import { FLANT5ToNewRecord } from '$lib/data_conversion/FLAN-T5_to_newrecord';
    import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

    import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
			
    export let results : newRecord[] = [];

    const toastStore = getToastStore();


    const popupHover: PopupSettings = {
        event: 'hover',
        target: 'popupHover',
        placement: 'bottom'
    };
					
    // export let validData = false;
    let customData : string;
    let userData : FileList;
    let exampleFileName = "";
    export let model : ModelType;
    let annotating = false;

    $: {
        results = results;
        model = model;
    }

    $: {
        if (exampleFileName === "" && userData) {   // no example file selected, use user uploaded data
            readUploadedFile(userData).then(result => customData = result);
        } else if (exampleFileName !== "") {    // example file selected
            // read the example file
            readLocalFile(exampleFileName).then(result => customData = result);
        }
        else {
            customData = "";
        }

        // validData = checkDataForSearch();
        // if (!validData) {
        //     results = [];
        // }
    }


    async function readUploadedFile(file : FileList) : Promise<string> {
        return new Promise((resolve, reject) => {
            if (file && file.item(0)){
                let reader = new FileReader();
                let fileItem = file.item(0);
                if (fileItem !== null) {
                    reader.onload = function(e) {
                        if (e.target !== null) {
                            console.log(e.target.result);
                            resolve(e.target.result as string);
                        }
                    }
                    reader.onerror = reject;
                    reader.readAsText(fileItem);
                } else {
                    reject(new Error("File item is null"));
                }
            } else {
                reject(new Error("File is null or empty"));
            }
        });
    }

    async function readLocalFile(fileName : string) : Promise<string> {
        return new Promise((resolve, reject) => {
            fetch(`/api/example_records?name=${fileName}`)
                .then(response => response.text())
                .then(data => resolve(data))
                .catch(reject);
        });
    }

    function checkDataForSearch() {
        if (customData === "") {
            console.error("No data to search");
            return false;
        }

        // check if the data is valid, loop through each line and check if it's a valid record
        let lines = customData.split('\n');
        for (let line of lines) {
            if (line.length === 0) continue;    // skip empty lines
            try {
                console.log(line);
                let record = JSON.parse(line);
                if (!record.context || !record.events || record.events.length === 0) {
                    console.error("Invalid record: ", record);
                    return false;
                }
            } catch (e) {
                console.error("Error parsing record: ", e);
                return false;
            }
        }
        return true;
    }

    async function annotate() {
        console.log("Annotating...");
        annotating = true;

        let data = customData.split('\n');

        const response = await fetch("/api/annotate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"text" : data, "model" : model}),
        });
        const response_data = await response.json();

        results = [];
        for (let i = 0; i < response_data.length; i++){
            let updatedRecord = FLANT5ToNewRecord(response_data[i]);  // UIE to newRecord is same as FLAN-T5 to newRecord. Also limited to FLAN-T5 and UIE models
            updatedRecord.context = data[i];
            updatedRecord.id = i.toString();
            results.push(updatedRecord);    
        }

        console.log("Results: " + results);
        toastStore.trigger({
            message: 'File annotated!',
            timeout: 4000,
        });
        annotating = false;
    }

    
</script>


<div class="card p-2 text-sm variant-filled-secondary" data-popup="popupHover">
	<p>Upload a text file with each<br>record delimited by a new line.</p>
	<div class="arrow variant-filled-secondary" />
</div>


<div class="card justify-center p-3">
    <!-- <h3 class="h3">Bulk Annotate</h3> -->
    <div class="">
        <div class="flex justify-center">
            <div>
                <p class="italic">Upload</p>
                <input class="input" type="file" disabled={exampleFileName !== ""} bind:files={userData}/>
            </div>
            <div class="px-1"/>
            <div class="flex items-center justify-end self-end py-1">
                <button class="btn-icon btn-icon-sm variant-filled [&>*]:pointer-events-none" use:popup={popupHover}>
                    <Icon icon={infoIcon}/>
                </button>
            </div>
            <div class="px-10"/>
            
            <div>
                <label for="inputFile" class="italic">Or select an example file</label>
                <select class="select" id="inputFile" bind:value={exampleFileName}>
                    <option value="">None</option>
                    <option value="example1.txt">Example-1</option>
                </select>
            </div>
        </div>

        <div class="px-2 py-2"/>

        <div class="flex items-center px-2">
            <label for="modelSelector" class="italic">Select a model</label>
            <ModelSelector exclude={[ModelType.HUMAN, ModelType.MISTRAL7B]} bind:model={model}/>
            <div class="px-10">
                <button class="btn variant-filled" on:click={annotate} disabled={annotating || (exampleFileName === "" && userData === undefined)}>Annotate</button>
            </div>
        </div>
        
        <!-- Search button removed: figure out best way of letting user upload their ALREADY annoatated dataset for querying/filtering -->
        <!-- <div class="px-2">
            <button class="btn variant-filled" disabled={annotating}>Search</button>
        </div> -->
    </div>

    {#if annotating}
        <div class="py-2 px-5">
            <ProgressBar meter="bg-primary-500" track="bg-primary-500/30"/>
        </div>
    {/if}

</div>