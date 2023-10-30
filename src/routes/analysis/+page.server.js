import test from '$lib/data/test.json'

export async function load({ fetch }) {
	// const res =  ( await fetch('$lib/data/test.json'));
    // const text =  (await res.json() );
    return test;
}