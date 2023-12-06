<script lang="ts">
    import { InputType } from '$lib/datatypes';
    // import { getInfo } from 

    export let data;
    let input: InputType | null = null;
    let queryResult: any[] = [];
    let results : any[] = [];
    let selectedKey = '';
    let selectedSubkey = '';
    const keysWithNoSubkeys = ['Effect', 'Negated', 'Severity', 'Speculated', 'Trigger'];

    $: if (selectedKey !== '') {
        console.log("HELLO");
        execQuery(selectedKey, selectedSubkey);
    }

    let disableSubkey = true;
    const setDisableSubkey = (val : boolean) => {
        disableSubkey = val;
        selectedSubkey = '';
    }

    // onMount(async () => {
    //     selectedKey = '';
    // })

    async function execQuery(key : string, subkey : string) {
        if (key === '') {
            results = [];
        }
        if (keysWithNoSubkeys.includes(key)) {
            console.log("hi");
            fetch("/api/get_info" + "?key=" + key
            , {
                method: "GET",
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                results = data;
            })
            .catch(err => console.log(err));
        }
        else{
            // results = await getInfo(key, subkey);
            fetch("/api/get_info" + "?key=" + key + "&subkey=" + subkey
            , {
                method: "GET",
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                results = data;
            })
            .catch(err => console.log(err));
        }
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
                    <label for="parameters">Parameters</label>
                    <input type="text" id="parameters" name="parameters" class="input input-bordered" placeholder="Parameters" />
                </div>
                <div class="flex flex-col space-y-2">
                    <label for="context">Context</label>
                    <input type="text" id="context" name="context" class="input input-bordered" placeholder="Context" />
                </div>
                <div class="flex flex-col space-y-2">
                    <label for="text">Text</label>
                    <input type="text" id="text" name="text" class="input input-bordered" placeholder="Text" />
                </div>
                <div class="flex flex-col space-y-2">
                    <label class="label"for="Key">Key</label>
                    <select class="select" bind:value={selectedKey}>
                        <option value="" disabled selected>Select Key</option> 
                        {#each ['Effect', 'Negated', 'Severity', 'Speculated', 'Subject', 'Treatment', 'Trigger'] as key}
                            <option value={key}>{key}</option>
                        {/each}
                    </select>
                </div>
                <div class="flex flex-col space-y-2">
                    <label class="label"for="Subkey">Subkey</label>
                    <select class="select" bind:value={selectedSubkey} disabled={disableSubkey}>
                        <option value="" disabled selected>Select Key</option> 
                        {#if ['Effect', 'Negated', 'Severity', 'Speculated', 'Trigger'].includes(selectedKey)}
                            {setDisableSubkey(true)}
                        {:else if selectedKey === 'Subject'}
                            {setDisableSubkey(false)}
                            {#each ['Age', 'Disorder', 'Gender', 'Population', 'Race'] as k}
                                <option value={k}>{k}</option>
                            {/each}
                        {:else if selectedKey === 'Treatment'}
                            {setDisableSubkey(false)}
                            {#each ['Combination', 'Disorder', 'Dosage', 'Drug', 'Duration', 'Freq', 'Route', 'Time Elapsed'] as k}
                                <option value={k}>{k}</option>
                            {/each}
                        {/if}
                    </select>
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
        <h3 class="h-full">Results</h3>
        {#each results as row}
            <div class="card p-4 items-center h-full text-center">
                <p>{row.context}</p>
                <p>{row.info.text}</p>
            </div>
        {/each}
    </div>
    
{:else if input !== null}
    <div class="container h-full mx-auto flex justify-center items-center" >
        <h3>No results</h3>
    </div>
{/if}