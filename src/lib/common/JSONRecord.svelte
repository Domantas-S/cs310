<script lang="ts">
  import type { record } from '$lib/interfaces';
  import { clipboard } from '@skeletonlabs/skeleton';
  import JSONTree from 'svelte-json-tree';
	import Icon from '@iconify/svelte';
  import contentCopy from '@iconify/icons-material-symbols/content-copy';

  
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();


  export let data: record;
  const value = { record: data };
  const defaultButtonColor = 'bg-secondary-800';
  const hoverButtonColor = 'bg-secondary-400';
  const copiedButtonColor = 'bg-success-500';

  let copied = false;
  let buttonColor = defaultButtonColor;

  function onClickHandler(): void {
    copied = true;
    buttonColor = copiedButtonColor;
    toastCopy();
    setTimeout(() => {
      copied = false;
      buttonColor = defaultButtonColor;
    }, 500);
  }

  function toastCopy(): void {
    toastStore.trigger({
      message: 'Copied record to clipboard!',
      timeout: 2000,
    });
  }
</script>

<div class="card rounded p-4 text-left" style="background-color: whitesmoke; position: relative;">
  <button
    class={`absolute top-2 right-2 p-2 btn-icon btn-icon-sm ${buttonColor} hover:${copied ? copiedButtonColor : hoverButtonColor}`}
    on:click={onClickHandler}
    use:clipboard={JSON.stringify(data)}
    disabled={copied}
  >
    <Icon icon={contentCopy}/>
  </button>

  <div style="--json-tree-font-size: 14px; --json-tree-li-indentation: 2em">
    <JSONTree {value} />
  </div>
</div>
