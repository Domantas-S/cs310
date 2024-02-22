<script lang="ts">
  import type { record } from '$lib/interfaces';
  import JSONTree from 'svelte-json-tree';
  import CopyButton from './CopyButton.svelte';
  
  export let data: record;
  const value = { record: data };
</script>

<div class="card rounded p-4 text-left" style="background-color: whitesmoke; position: relative;">
  <CopyButton data={value} />

  <div style="--json-tree-font-size: 14px; --json-tree-li-indentation: 2em">
    <JSONTree {value} />
  </div>
</div>
