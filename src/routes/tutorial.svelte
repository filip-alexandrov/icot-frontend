<script>
    // @ts-nocheck
	import JsonViewer from '$lib/components/JsonViewer.svelte';
	import MetamaskController from '$lib/controllers/MetamaskController.js';
	import { onMount } from 'svelte';

	const { store } = MetamaskController;

    const onChainChanged = (chainId) => {
        chainId = parseInt(chainId, 16); 
        MetamaskController.networkChanged(chainId); 
    }

	onMount(async() => {
		await MetamaskController.init();

        if($store.isMetamaskInstalled){
            window.ethereum.on("chainChanged", onChainChanged) 
        }
	});

    $:({isConnected, isWrongNetwork, isMetamaskInstalled, message, isLocked} = $store)
</script>
<JsonViewer data={$store} />

<button>
{#if isConnected}
     <p>Everything good</p>
{:else if  isWrongNetwork}
     <p>Wrong network selected</p>
{:else if  isMetamaskInstalled}
     <p>{message}</p>
{:else if  isLocked}
     <p>Please unlock your account</p>
{:else}
    <p>Loading...</p>
{/if}
</button>

