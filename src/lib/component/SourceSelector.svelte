<script lang="ts">
	import { DataSource } from "$lib/datatypes";

    export let source: DataSource = DataSource.PHEE_TRAIN_SET;

</script>

<select class="select" id="source" bind:value={source}>
    <option value={DataSource.PHEE2_TEST_SET}>PHEE Test Set</option>
    <option value={DataSource.USER_ANNOTATED}>Uploaded dataset</option>
</select>