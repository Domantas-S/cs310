<script lang="ts">
	import '../app.postcss';
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import modeNight from '@iconify/icons-material-symbols/mode-night';
	import { goto } from '$app/navigation';
	// import '../global.css';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores } from '@skeletonlabs/skeleton';
	import {Toast} from '@skeletonlabs/skeleton';
	initializeStores();

</script>

<Toast />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="py-2 border-b-2 trail">
			<svelte:fragment slot="lead">
				<button type="button" on:click={() => {goto('/')}} class="btn btn-sm variant-filled">
					Home
				</button>
			</svelte:fragment>

			<svelte:fragment>
				<button type="button" on:click={() => {goto('/analysis')}} class="btn btn-sm variant-filled">
					Data Analysis
				</button>
			</svelte:fragment>
			
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<div class="py-6"/>

</AppShell>

<slot />
