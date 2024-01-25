<script lang="ts">
    import closeIcon from '@iconify/icons-material-symbols/close';
	import Icon from '@iconify/svelte';

    export let query = {
        key: '',
        subkey: '',
        searchTerm: '',
        exclude: false,
    };
    export let destroy = false;

    const keysWithNoSubkeys = ['Effect', 'Negated', 'Severity', 'Speculated', 'Trigger'];
    let searchTerm = '';
    let exclude = false;

    let disableSubkey = true;
    const setDisableSubkey = (val : boolean) => {
        disableSubkey = val;
        query.subkey = '';
    }

    const setDestroy = () => {
        destroy = true;
    }
</script>

<form class ="flex space-x-2">
    <div class="flex flex-col space-y-2">
        <label class="label"for="Key">Key</label>
        <select class="select" bind:value={query.key}>
            <option value="" disabled selected>Select Key</option> 
            {#each ['Effect', 'Negated', 'Severity', 'Speculated', 'Subject', 'Treatment', 'Trigger', 'Any'] as key}
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
        <input class="input" type="text" placeholder="Key term" bind:value={searchTerm}/>
        <div class="flex flex-row h-full justify-center items-center space-x-2">
            <input class="checkbox" type="checkbox" id="exclude" name="exclude" bind:checked={exclude}>
            <p class="label">Exclude</p>
        </div>
    </div>
    <div class="flex flex-col justify-center items-center">
        <button type="button" class="btn-icon btn-icon-sm variant-filled justify-center flex-col" on:click={setDestroy}>
            <Icon icon={closeIcon} />
        </button>
    </div>
</form>