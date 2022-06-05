<script lang="ts">
	// @ts-nocheck

	import { ethers, providers } from 'ethers';
	import { onMount } from 'svelte';

	

	let signer: any;
	let provider: any;
	let message = 'Not connected to Metamask';
	let chainId;

	async function getChainData() {
		let network = await provider.getNetwork();
		chainId = network.chainId;
		console.log(`Network: ${network.chainId}`);
	}

	async function handleAccountsChanged() {
		provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
		await provider.send('eth_requestAccounts', []);
		signer = provider.getSigner();

		message = 'Connected to Metamask';
		getChainData();

		// console.log('Account:', await signer.getAddress());
	}

	async function connect() {
		ethereum
			.request({ method: 'eth_requestAccounts' })
			.then(handleAccountsChanged)
			.catch((err) => {
				if (err.code === 4001) {
					message = 'Not connected to Metamask';
				} else {
					message = 'Not connected to Metamask';
					console.error(err);
				}
			});
	}

	async function changeChainID() {
		try {
			await ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x89' }]
			});
		} catch (switchError) {
			// This error code indicates that the chain has not been added to MetaMask.
			if (switchError.code === 4902) {
				try {
					await ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainId: '0x89',
								chainName: 'Matic Mainnet',
								rpcUrls: ['https://rpc-mainnet.matic.network/'],
								nativeCurrency: {
									name: 'MATIC',
									symbol: 'MATIC',
									decimals: 18
								},
								blockExplorerUrls: ['https://polygonscan.com/']
							}
						]
					});
				} catch (addError) {
					console.log(addError);
				}
			}
			console.log(switchError);
		}
	}

	$: chainId == 137 && message == 'Connected to Metamask'
		? console.log('Matic')
		: console.log('Changing Networks');

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
