<script lang="ts">
    import { InputType } from '$lib/datatypes';
    import type { record } from '$lib/interfaces';
    import Record from '$lib/common/Record.svelte';
    import { getAnnotationText } from '$lib/db/common.js';
    

    export let data;
    let input: InputType | null = null;
    let results : record[] = [];
    let selectedKey = '';
    let selectedSubkey = '';
    let target = '';
    let exclude = false;
    let raw = false;
    const keysWithNoSubkeys = ['Effect', 'Negated', 'Severity', 'Speculated', 'Trigger'];

    $: if (selectedKey !== '') {
        execQuery(selectedKey, selectedSubkey, target, exclude);
    }

    let disableSubkey = true;
    const setDisableSubkey = (val : boolean) => {
        disableSubkey = val;
        selectedSubkey = '';
    }

    // onMount(async () => {
    //     selectedKey = '';
    // })

    async function execQuery(key : string, subkey : string, target : string = '', exclude : boolean = false) {
        if (key === '') {
            results = [];
        }
        console.log("hi");
        fetch("/api/get_info" + "?key=" + key + "&subkey=" + subkey + "&target=" + target + "&exclude=" + exclude
        , {
            method: "GET",
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            results = data;
        })
        .catch(err => console.log(err));
    }

</script>

<div class="container h-full mx-auto flex justify-center items-center">
    <div class="card p-4 items-center h-full text-center">
        <h2>Select input type</h2>
        <div class="py-3"></div>
        <span class="px-20 space-x-20">
            <button class="btn variant-filled rounded px-10" on:click={() => {input = InputType.Text}}>Text Input</button>
            <button class="btn variant-filled rounded px-10" on:click={() => {input = InputType.Parameters}}>Parameters</button>
        </span>
    </div>
</div>

<div class="p-5"></div>
    
<div class="container h-full mx-auto flex justify-center items-center">
    {#if input === InputType.Parameters}
        <div>
            <form class ="flex space-x-2">
                <div class="flex flex-col space-y-2">
                    <label class="label"for="Key">Key</label>
                    <select class="select" bind:value={selectedKey}>
                        <option value="" disabled selected>Select Key</option> 
                        {#each ['Effect', 'Negated', 'Severity', 'Speculated', 'Subject', 'Treatment', 'Trigger', 'Any'] as key}
                            <option value={key}>{key}</option>
                        {/each}
                    </select>
                </div>
                <div class="flex flex-col space-y-2">
                    <label class="label"for="Subkey">Subkey</label>
                    <select class="select" bind:value={selectedSubkey} disabled={disableSubkey}>
                        <option value="Any" disabled selected>Any</option> 
                        {#if keysWithNoSubkeys.includes(selectedKey)}
                            {setDisableSubkey(true)}
                        {:else if selectedKey === 'Subject'}
                            {setDisableSubkey(false)}
                            {#each ['Any', 'Age', 'Disorder', 'Gender', 'Population', 'Race'] as k}
                                <option value={k}>{k}</option>
                            {/each}
                        {:else if selectedKey === 'Treatment'}
                            {setDisableSubkey(false)}
                            {#each ['Any', 'Combination', 'Disorder', 'Dosage', 'Drug', 'Duration', 'Freq', 'Route', 'Time Elapsed'] as k}
                                <option value={k}>{k}</option>
                            {/each}
                        {/if}
                    </select>
                </div>
                <div class="flex flex-col space-y-2">
                    <label class="label" for="Filters">Filters</label>
                    <input class="input" type="text" placeholder="Key term" bind:value={target}/>
                    <div class="flex flex-row h-full justify-center items-center space-x-2">
                        <input class="checkbox" type="checkbox" id="exclude" name="exclude" bind:checked={exclude}>
                        <p class="label">Exclude</p>
                    </div>

                </div>
            </form>
        </div>
    {:else if input === InputType.Text}
        <div class="card p-4 items-center h-full text-center">
            Text input
        </div>
    {/if}
</div>


<div class="py-10"></div>

{#if results.length > 0 && input !== null}
    <div class="container h-full mx-auto justify-center items-center text-center" >
        <!-- Results heading -->
        <div class="flex justify-between items-center">
            <hr class="w-full border-gray-300">
            <h2 class="h-full px-4">Results</h2>
            <hr class="w-full border-gray-300">
        </div>

        <div class="py-5"></div>

        <!-- Total results heading and buttons-->
        <div class="flex h-full">
            <p class="justify-begin"><strong>{results.length} records retrieved</strong></p>
            <div class="flex-grow"></div>
            <div class="flex justify-end">
                <button class="btn variant-filled rounded px-10">Toggle Annotations</button>
                <div class="px-2"></div>
                <button class="btn variant-filled rounded px-10" on:click={() => raw = !raw}>Toggle Raw</button>
                <div class="px-2"></div>
                <button class="btn variant-filled rounded px-10">Export</button>
            </div>
        </div>

        <div class="py-5"></div>

        <!-- Annotated records -->
        {#each results as row, index}
                {#key raw}
                    <Record info={row} currentRecord={index+1} totalRecords={results.length} raw={raw}></Record>
                {/key}
            <div class="py-5"/>
        {/each}
    </div>
    
{:else if input !== null}
    <div class="container h-full mx-auto flex justify-center items-center" >
        <h3>No results</h3>
    </div>
{/if}