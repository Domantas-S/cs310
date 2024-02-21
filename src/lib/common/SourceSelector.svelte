<script lang="ts">
	import { DataSource } from "$lib/datatypes";

    export let source: DataSource = DataSource.HUMAN_ANNOTATED;

</script>

<select class="select" id="source" bind:value={source}>
    <option value={DataSource.HUMAN_ANNOTATED}>Human annotated</option>
    <option value={DataSource.MIXTRAL_8X7B_INSTRUCT}>Mixtral 8x7B Instruct (v0.1 Q5_K_M)</option>
    <option value={null} disabled>More to come...</option>
</select>