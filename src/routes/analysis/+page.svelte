<script lang="ts">
    import { InputType, DataSource } from '$lib/datatypes';
    import type { record } from '$lib/interfaces';
    import Record from '$lib/common/Record.svelte';
    import Query from '$lib/common/Query.svelte';
    import { Paginator, type PaginationSettings, type ModalSettings } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
    import plusIcon from '@iconify/icons-material-symbols/add';
    import eyeIcon from '@iconify/icons-material-symbols/visibility';
    import { queries, addQuery } from '$lib/stores/Queries.js';
	import CompareRecords from '$lib/common/CompareRecords.svelte';
	import SourceSelector from '$lib/common/SourceSelector.svelte';
			
    export let data;

    const modalStore = getModalStore();
    const modal: ModalSettings = {
        type: 'confirm',
        // Data
        title: 'Please Confirm',
        body: `Are you sure you wish to proceed to download all queried records?\nThe file is in NDJSON format.`,
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: async (r: boolean) => {
            if (r) {
            const response = await fetch('/api/export', {
                method: 'POST',
                headers: {
                    'Accept': 'application/x-ndjson',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(results),
            });

            if (!response.ok) {
                console.error('Failed to download NDJSON file:', response.statusText);
                return;
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'data.ndjson';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        },
    };

    let queryCount = 1; // start with 1 because store is initialised with 1 blank query
    let input: InputType | null = null;
    let results : record[] = [];
    let raw = false;
    let popupToggle = false;
    let source : DataSource = DataSource.HUMAN_ANNOTATED;
    let showExampleComparison = false;

    let paginationSettings = {
        page: 0,
        limit: 50,
        size: results.length,
        amounts: [10,20,50,100],
        }   satisfies PaginationSettings;


    function addBlankQuery() {
        addQuery({id: queryCount, key: '', subkey: '', searchTerm: '', exclude: false});
        queryCount++;
    }
    $: {
        popupToggle = popupToggle;
        source = source;
    }

    $: paginatedResults = results.slice(paginationSettings.page * paginationSettings.limit, 
        (paginationSettings.page * paginationSettings.limit) + paginationSettings.limit);
    $: paginationSettings.size = results.length;



    async function execQuery(key : string, subkey : string, searchTerm : string = '', exclude : boolean = false, source: DataSource) {  // calling endpoint
        if (key === '') {
            return [];
        }

        const response = await fetch("/api/get_info" + "?key=" + key + "&subkey=" + subkey + "&target=" + searchTerm + "&exclude=" + exclude + "&source=" + source, {
            method: "GET",
        });

        const data = await response.json();
        return data;
    }

    $: {    // execute queries dynamically
        (async () => {
            if ($queries.length === 0) {
                results = [];
                return;
            }
            let queryResults = await execQuery($queries[0].key, $queries[0].subkey, $queries[0].searchTerm, $queries[0].exclude, source);
            let intersection: Set<any> = new Set(queryResults.map((record : record) => record.id)); // intersect by ID, since ID is (should be) unique
            if (intersection.size === 0) {  // if no results from first query, return
                results = [];
                return;
            }
            for (let i = 1; i < $queries.length; i++) {
                if ($queries[i].key === '') continue;  // skip empty queries
                queryResults = await execQuery($queries[i].key, $queries[i].subkey, $queries[i].searchTerm, $queries[i].exclude, source);
                let set = new Set(queryResults.map((record : record) => record.id));
                intersection = new Set([...intersection].filter(x => set.has(x)));
            }
            results = queryResults.filter((record : record) => intersection.has(record.id));
        })();
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
        <div class="py-5"></div>
        <!-- Source selector -->
        <div class="flex justify-center items-center">
            <label for="source">Data source:</label>
            <div class="px-2"></div>
            <SourceSelector bind:source={source}/>
        </div>
    </div>
</div>

<div class="flex justify-center items-center py-5">
    <button type="button" class="btn variant-filled" on:click={() => showExampleComparison = !showExampleComparison}>
        <span><Icon icon={eyeIcon}/></span>
        <span>Example comparison</span>
    </button>
</div>

<div class="px-5">
    {#if showExampleComparison}
        <CompareRecords originalSource={source}/>
    {/if}
</div>
<div class="p-5"></div>
    
<div class="container h-full mx-auto flex justify-center items-center">
    {#if input === InputType.Parameters}
        <div>
            {#each $queries as query (query.id)}
                <Query bind:id={query.id} />
                <div class="py-2"/>
            {/each}
            <div class="flex justify-center py-5">
                <button class="btn-sm variant-filled rounded flex justify-items-center items-center" on:click={() => addBlankQuery()}>
                    <Icon icon={plusIcon}></Icon>
                    <p>Add query</p>
                </button>
            </div>
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
                <button class="btn variant-filled rounded px-10" on:click={() => popupToggle = !popupToggle}>Toggle Annotations</button>
                <div class="px-2"></div>
                <button class="btn variant-filled rounded px-10" on:click={() => raw = !raw}>Toggle Raw</button>
                <div class="px-2"></div>
                <button class="btn variant-filled rounded px-10" on:click={() => modalStore.trigger(modal)}>Export</button>
            </div>
        </div>

        <div class="py-2"></div>

        <Paginator 
        bind:settings={paginationSettings}
        showFirstLastButtons="{true}"
        showPreviousNextButtons="{true}"/>
        <div class="py-2"></div>
        <!-- Annotated records -->
            {#each paginatedResults as row, index}
                    {#key raw}
                        <Record 
                            info={row}
                            currentRecord={(paginationSettings.page * paginationSettings.limit) + index + 1} 
                            totalRecords={results.length} 
                            raw={raw}
                            popupToggle={popupToggle}
                            source={source}/>
                    {/key}
                <div class="py-5"/>
            {/each}
    </div>
    
{:else if input !== null}
    <div class="container h-full mx-auto flex justify-center items-center" >
        <h3>No results</h3>
    </div>
{/if}