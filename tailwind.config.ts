import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			colors: {
				'event_0' : '#32f22c',
				'event_1' : '#ffcc00',
				'event_2' : '#ff3366',
				'event_3' : '#0099ff',
				'event_4' : '#9933cc',
				'event_5': '#ff9900',
				'event_6': '#00cc99',
				'event_7': '#ff6699',
				'event_8': '#3366ff',
				'event_9': '#cc33ff',
			},
		},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true,
					},
				],
			},
		}),
	],
} satisfies Config;
