import { writable } from 'svelte/store';
import type { query } from '$lib/interfaces';

export const queries = writable<query[]>([  // initialise with an empty query
    {
        id: 0,
        key: "",
        subkey: "",
        searchTerm: "",
        exclude: false,
    }
]);

export function addQuery(query: query) {
    queries.update((queries) => [...queries, query]);
}

export function removeQuery(id: number) {
    queries.update((queries) => queries.filter((query) => query.id !== id));
}

export function updateQuery(id: number, query: query) {
    queries.update((queries) => {
        const index = queries.findIndex((query) => query.id === id);
        if (index === -1) return queries;
        queries[index] = query;
        return queries;
    });
}