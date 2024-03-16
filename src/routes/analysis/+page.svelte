<script lang="ts">
    import { DataSource, ModelType } from '$lib/datatypes';
    import type { newRecord } from '$lib/types/types';
    import Record from '$lib/component/Record.svelte';
    import Query from '$lib/component/Query.svelte';
    import { Paginator, type PaginationSettings, type ModalSettings } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
    import plusIcon from '@iconify/icons-material-symbols/add';
    import eyeIcon from '@iconify/icons-material-symbols/visibility';
    import uploadIcon from '@iconify/icons-material-symbols/file-upload';
    import { queries, addQuery } from '$lib/stores/Queries.js';
    import { FileButton } from '@skeletonlabs/skeleton';
	import CompareRecords from '$lib/component/CompareRecords.svelte';
	import SourceSelector from '$lib/component/SourceSelector.svelte';
	import ModelSelector from '$lib/component/ModelSelector.svelte';
    import BulkAnnotate from '$lib/component/BulkAnnotate.svelte';
	import { searchUploadedRecords } from '$lib/scripts/search_uploaded_records.js';
			
    export let data;

    let queryCount = 1; // start with 1 because store is initialised with 1 blank query
    let results : newRecord[] = [];
    let raw = false;
    let popupToggle = false;
    let source : DataSource = DataSource.PHEE2_TEST_SET;
    let searchModel : ModelType = ModelType.HUMAN;
    let annotateModel : ModelType = ModelType.FLANT5;
    let customResults : newRecord[] = [];
    let queriedCustomResults = customResults;
    let targetResults : newRecord[] = [];
    let paginatedResults : newRecord[] = [];
    let paginagedCustomResults : newRecord[] = [];


    let paginationSettingsCustom = {
        page: 0,
        limit: 50,
        size: customResults.length,
        amounts: [10,20,50,100],
        }   satisfies PaginationSettings;


    let paginationSettings = {
        page: 0,
        limit: 50,
        size: targetResults.length,
        amounts: [10,20,50,100],
        }   satisfies PaginationSettings;



    $: {
        popupToggle = popupToggle;0
    }

    $: paginationSettings.size = results.length;
    $: paginatedResults = results.slice(paginationSettings.page * paginationSettings.limit, 
                (paginationSettings.page * paginationSettings.limit) + paginationSettings.limit);
    $: paginagedCustomResults = queriedCustomResults.slice(paginationSettingsCustom.page * paginationSettingsCustom.limit, 
                (paginationSettingsCustom.page * paginationSettingsCustom.limit) + paginationSettingsCustom.limit);
    $: paginationSettingsCustom.size = queriedCustomResults.length;

    $: {    // execute queries dynamically
        (async () => {
            if ($queries.length === 0) {
                results = [];
                return;
            }
            let queryResults = await execQuery($queries[0].key, $queries[0].subkey, $queries[0].searchTerm, $queries[0].exclude, source, searchModel);
            let intersection: Set<any> = new Set(queryResults.map((record : newRecord) => record.id)); // intersect by ID, since ID is (should be) unique
            if (intersection.size === 0) {  // if no results from first query, return
                results = [];
                return;
            }
            for (let i = 1; i < $queries.length; i++) {
                if ($queries[i].key === '') continue;  // skip empty queries
                queryResults = await execQuery($queries[i].key, $queries[i].subkey, $queries[i].searchTerm, $queries[i].exclude, source, searchModel);
                let set = new Set(queryResults.map((record : newRecord) => record.id));
                intersection = new Set([...intersection].filter(x => set.has(x)));
            }
            results = queryResults.filter((record : newRecord) => intersection.has(record.id));
        })();
    }

    $:{ // execute custom queries dynamically
        (async () => {
            if (source === DataSource.USER_ANNOTATED) {
                queriedCustomResults = searchUploadedRecords(customResults, $queries[0].key, $queries[0].subkey, $queries[0].searchTerm, $queries[0].exclude);
            }

            // for each additional query, intersect the results with the previous results
            for (let i = 1; i < $queries.length; i++) {
                if ($queries[i].key === '') continue;  // skip empty queries
                let queryResults = searchUploadedRecords(queriedCustomResults, $queries[i].key, $queries[i].subkey, $queries[i].searchTerm, $queries[i].exclude);
                let intersection: Set<any> = new Set(queryResults.map((record : newRecord) => record.id)); // intersect by ID, since ID is (should be) unique
                if (intersection.size === 0) {  // if no results from first query, return
                    queriedCustomResults = [];
                    return;
                }
                let set = new Set(queryResults.map((record : newRecord) => record.id));
                intersection = new Set([...intersection].filter(x => set.has(x)));
                queriedCustomResults = queryResults.filter((record : newRecord) => intersection.has(record.id));
            }
        })();
    }

    

    async function execQuery(key : string, subkey : string, searchTerm : string = '', exclude : boolean = false, source: DataSource, model: ModelType) {  // calling endpoint
        if (key === '') {
            return [];
        }
        
        if (source === DataSource.USER_ANNOTATED) {
            return searchUploadedRecords(customResults, key, subkey, searchTerm, exclude);
        }
        const response = await fetch("/api/get_info" + "?key=" + key + "&subkey=" + subkey + "&target=" + searchTerm + "&exclude=" + exclude + "&source=" + source + "&model=" + model, {
            method: "GET",
        });

        const data = await response.json();
        return data;
    }

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

    function addBlankQuery() {
        addQuery({id: queryCount, key: '', subkey: '', searchTerm: '', exclude: false});
        queryCount++;
    }

</script>

<div class="container mx-auto">
    <div>
        <h1 class="h1">Bulk Annotate and Search</h1>
        <div class="py-1"></div>
        <p>Annotate and search through datasets of medical records.</p>
        <div class="py-5"></div>
    </div>

    <!-- Source selector -->
    <div class="card justify-center p-4 mx-20">
        <div class="flex items-center">
            <label class="flex-none font-bold" for="source">Dataset:</label>
            <div class="px-2"></div>
            <SourceSelector bind:source={source} />

            <div class="px-8"></div>
            <label class="flex-none font-bold" for="model">LLM model:</label>
            <div class="px-2"></div>
            <ModelSelector bind:model={searchModel} disabled={source === DataSource.USER_ANNOTATED} />
        </div>
        <div class="py-2"></div>
        {#if source === DataSource.USER_ANNOTATED}
            <BulkAnnotate bind:results={customResults} bind:model={annotateModel}/>
        {/if}
    </div>

</div>

<div class="p-5"></div>

<div class="container h-full mx-auto flex justify-center items-center">
    <div>
        {#each $queries as query (query.id)}
            <Query bind:id={query.id} />
            <div class="py-2"/>
        {/each}
        <div class="flex justify-center py-5">
            <button class="btn-sm variant-filled rounded flex justify-items-center items-center bg-primary-600 text-white" on:click={() => addBlankQuery()}>
                <Icon icon={plusIcon}></Icon>
                <p>Add query</p>
            </button>
        </div>
    </div>
</div>


<div class="py-10"></div>

{#if (source == DataSource.PHEE2_TEST_SET && results.length > 0) || (source == DataSource.USER_ANNOTATED && customResults.length > 0)}
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
            <p class="justify-begin"><strong>{source === DataSource.PHEE2_TEST_SET ? paginationSettings.size : paginationSettingsCustom.size} records retrieved</strong></p>
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

        {#if source === DataSource.PHEE2_TEST_SET}
            <Paginator 
            bind:settings={paginationSettings}
            showFirstLastButtons="{true}"
            showPreviousNextButtons="{true}"/>
            <div class="py-2"></div>
            <!-- Annotated records -->
                <!-- <p>{JSON.stringify(customResults)}</p> -->
                {#each paginatedResults as row, index}
                        {#key raw}
                            <Record 
                                info={row}
                                currentRecord={(paginationSettings.page * paginationSettings.limit) + index + 1} 
                                totalRecords={paginationSettings.size} 
                                raw={raw}
                                popupToggle={popupToggle}
                                source={source}
                                model={searchModel}/>
                        {/key}
                    <div class="py-5"/>
                {/each}
        {:else}
            <Paginator 
            bind:settings={paginationSettingsCustom}
            showFirstLastButtons="{true}"
            showPreviousNextButtons="{true}"/>
            <div class="py-2"></div>
            <!-- Annotated records -->
                <!-- <p>{JSON.stringify(customResults)}</p> -->
                {#each paginagedCustomResults as row, index}
                        {#key raw}
                            <Record 
                                info={row}
                                currentRecord={(paginationSettingsCustom.page * paginationSettingsCustom.limit) + index + 1} 
                                totalRecords={paginationSettingsCustom.size} 
                                raw={raw}
                                popupToggle={popupToggle}
                                source={source}
                                model={annotateModel}/>
                        {/key}
                    <div class="py-5"/>
                {/each}
        {/if}
    </div>
    
{:else }
    <div class="container h-full mx-auto flex justify-center items-center" >
        <h3>No results: the query returned no records or a custom dataset has not been uploaded</h3>
    </div>
{/if}