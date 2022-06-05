<script lang="ts">
	// @ts-nocheck

	import { ethers, providers } from 'ethers';
	import { onMount } from 'svelte';
	import {
		getChainData,
		handleAccountsChanged,
		connect,
		changeChainID,
		getVariables
	} from '$lib/controllers/helpers';

	let {signer,
		provider,
		message,
		chainId} = getVariables();

	let onDevice = false;
	onMount(() => {
		onDevice = true;
		connect();

		ethereum.on('accountsChanged', connect);
		ethereum.on('chainChanged', getChainData);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={connect}>{message}</button>
<button on:click={changeChainID}>
	{#if chainId != 137 && message == 'Connected to Metamask'}
		Change Network to Matic
	{:else if message == 'Not connected to Metamask'}
		Connect to Metamask
	{:else}
		Connected
	{/if}
</button>
<p>{chainId}</p>