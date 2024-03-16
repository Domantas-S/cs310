<script lang="ts">
    import closeIcon from '@iconify/icons-material-symbols/close';
	import Icon from '@iconify/svelte';
    import { updateQuery, removeQuery } from '$lib/stores/Queries.js';
	import type { query } from '$lib/interfaces';

    export let id : number;
    export let destroy = false;

    const keysWithNoSubkeys = ['Effect', 'Negated', 'Severity', 'Speculated', 'Trigger'];

    let query : query = {
        id: id,
        key: '',
        subkey: '',
        searchTerm: '',
        exclude: false,
    }

    let disableSubkey = true;
    const setDisableSubkey = (val : boolean) => {
        disableSubkey = val;
        query.subkey = '';
        updateQuery(query.id, query);
    }

    const setDestroy = () => {
        destroy = true;
        removeQuery(id);
    }

    $: {
        destroy = destroy;
        updateQuery(query.id, query);
    }

</script>

<form class ="flex space-x-2">
    <div class="flex flex-col space-y-2">
        <label class="label"for="Key">Key</label>
        <select class="select" bind:value={query.key}>
            <option value="" disabled selected>Select Key</option> 
            {#each ['Subject', 'Treatment', 'Effect', 'Negated', 'Severity', 'Speculated', 'Trigger', 'Any'] as key}
                <option value={key}>{key}</option>
            {/each}
        </select>
    </div>
    <div class="flex flex-col space-y-2">
        <label class="label"for="Subkey">Subkey</label>
        <select class="select" bind:value={query.subkey} disabled={disableSubkey}>
            <option value="Any" disabled selected>Any</option> 
            {#if keysWithNoSubkeys.includes(query.key)}
                {setDisableSubkey(true)}
            {:else if query.key === 'Subject'}
                {setDisableSubkey(false)}
                {#each ['Any', 'Age', 'Disorder', 'Gender', 'Population', 'Race'] as k}
                    <option value={k}>{k}</option>
                {/each}
            {:else if query.key === 'Treatment'}
                {setDisableSubkey(false)}
                {#each ['Any', 'Combination', 'Disorder', 'Dosage', 'Drug', 'Duration', 'Freq', 'Route', 'Time Elapsed'] as k}
                    <option value={k}>{k}</option>
                {/each}
            {/if}
        </select>
    </div>
    <div class="flex flex-col space-y-2">
        <label class="label" for="Filters">Filters</label>
        <input class="input" type="text" placeholder="Key term" bind:value={query.searchTerm}/>
        <div class="flex flex-row h-full justify-center items-center space-x-2">
            <input class="checkbox" type="checkbox" id="exclude" name="exclude" bind:checked={query.exclude}>
            <p class="label">Exclude</p>
        </div>
    </div>
    <div class="flex flex-col justify-center items-center">
        <button type="button" class="btn-icon btn-icon-sm variant-filled justify-center flex-col" on:click={setDestroy}>
            <Icon icon={closeIcon} />
        </button>
    </div>
</form>