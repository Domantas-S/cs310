<script lang="ts">
    import { clipboard } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
    import contentCopy from '@iconify/icons-material-symbols/content-copy';

    import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();


    export let data: any;
    const defaultButtonColor = 'bg-primary-800';
    const hoverButtonColor = 'bg-primary-400';
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


<button
    class={`absolute top-2 right-2 p-2 btn-icon btn-icon-sm ${buttonColor} hover:${copied ? copiedButtonColor : hoverButtonColor}`}
    on:click={onClickHandler}
    use:clipboard={JSON.stringify(data)}
    disabled={copied}
  >
    <Icon icon={contentCopy}/>
</button>