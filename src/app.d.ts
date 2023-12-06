// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import 'unplugin-icons/types/svelte'
import { Pool } from 'pg';

declare namespace App {
	interface Locals {
		dbCon: Pool;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
