<script lang="ts">
    import { InputType } from '$lib/datatypes';
    export let data;
    let input : InputType | null = null;

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
        <div class="card p-4 items-center h-full text-center">
            Parameters
        </div>
    {:else if input === InputType.Text}
        <div class="card p-4 items-center h-full text-center">
            text input
        </div>
    {/if}
</div>

<div class="card p-4 items-center h-full text-center">
    {JSON.stringify(data)}
</div>  
