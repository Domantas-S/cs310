<script lang="ts">
	import '../app.postcss';
	import { AppBar, AppShell, LightSwitch, TabGroup, Tab } from '@skeletonlabs/skeleton';
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

	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';

	// Tab functionality
	let activeTab = 'analysis_tab';
	const searchFrontendUrl = import.meta.env.DEV ? `${window.location.protocol}//${window.location.hostname}:3000/` : 'https://drugwatch.net/';
</script>

<Toast />

<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="py-2 border-b-2 trail">
			<svelte:fragment slot="lead">
				<button 
					type="button" 
					on:click={() => {goto('/')}} 
					class="btn btn-lg variant-filled px-2 py-1" 
					style="background-color: #59768a; border-radius: 0.3em;"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 15 15" {...$$props}>
						<path 
							fill="white" 
							fill-rule="evenodd" 
							d="M10 6.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-.691 3.516a4.5 4.5 0 1 1 .707-.707l2.838 2.837a.5.5 0 0 1-.708.708z" 
							clip-rule="evenodd" 
						/>
					</svg>
					<span class="text-white">DrugWatch</span>
				</button>

				<div class="px-2"/>

				<TabGroup>
					<Tab bind:group={activeTab} name="search_link" value="search_tab" on:click={() => {goto(searchFrontendUrl)}}>
						Search
					</Tab>
					<Tab bind:group={activeTab} name="analysis_link" value="analysis_tab">
						Annotate
					</Tab>
				</TabGroup>

				<div class="px-2"/>

				<button type="button" on:click={() => {goto('/analysis')}} class="btn btn-sm variant-filled rounded-md bg-primary-600 text-white">
					Bulk Annotate
				</button>
				
				<div class="px-2"/>

				<button type="button" on:click={() => {goto('/annotate')}} class="btn btn-sm variant-filled rounded-md bg-primary-600 text-white">
					Live Annotate
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
