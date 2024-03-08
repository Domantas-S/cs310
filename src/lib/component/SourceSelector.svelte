<script lang="ts">
	import { DataSource } from "$lib/datatypes";

    export let source: DataSource = DataSource.PHEE_TRAIN_SET;

</script>

<select class="select" id="source" bind:value={source}>
    <option value={DataSource.PHEE_TRAIN_SET}>PHEE Train Set (Human Annotated)</option>
    <option value={DataSource.PHEE2_TEST_SET}>PHEE2 Test Set (Human Annotated)</option>
    <option value={DataSource.FLANT5}>FLAN-T5(cross_flan_t5_large_instruction_finetune_phee2_spot_asoc_noise_0_order_cross1)</option>
    <option value={DataSource.UIE}>UIE(cross_uie_large_finetune_phee2_spot_asoc_noise_0_order_cross1)</option>
    <option value={DataSource.MISTRAL7B}>Mistral-7B Instruct(v0.1.Q5_K_M)</option>
    <option value={DataSource.MIXTRAL_8X7B_INSTRUCT} disabled>Mixtral 8x7B Instruct (v0.1 Q5_K_M)</option>
    <option value={null} disabled>More to come...</option>
</select>