import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	server: {
		port: 3000,
		host: true,
		strictPort: true,
		watch: {
			usePolling: true,
		},
	  },
	plugins: [
		sveltekit(), 
		purgeCss(),
		Icons({
			compiler: 'svelte',
		})]
});
