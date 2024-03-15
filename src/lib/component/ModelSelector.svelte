<script lang="ts">
	import { ModelType, modelTypeToString } from "$lib/datatypes";

    export let model: ModelType = ModelType.HUMAN;
    export let exclude: ModelType[] = [];
    export let disabled: boolean = false;


    let allModels = [ModelType.HUMAN, ModelType.FLANT5, ModelType.UIE, ModelType.MISTRAL7B];
    let availableModels = allModels.filter(model => !exclude.includes(model));

    $: {
        model = model;
        exclude = exclude;
        disabled = disabled;
        console.log("ModelSelector: model = ", model);
    }

</script>

<select class="select" id="model" bind:value={model} disabled={disabled}>
    <!-- <option value={DataSource.PHEE_TRAIN_SET}>PHEE Train Set (Human Annotated)</option> -->

    <!-- <option value={ModelType.HUMAN}>Human Annotated</option>
    <option value={ModelType.FLANT5}>FLAN-T5</option>
    <option value={ModelType.UIE}>UIE</option>
    <option value={ModelType.MISTRAL7B}>Mistral-7B Instruct</option> -->

    {#each availableModels as m}
        <option value={m}>{modelTypeToString(m)}</option>
    {/each}
    <option value={null} disabled>More to come...</option>
</select>