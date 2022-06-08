<script lang="ts">
	// @ts-nocheck
import { setEthersProvider, ethersProvider, removeProvider } from '$lib/contracts/ethersProvider';

	import { ethers, providers } from 'ethers';
	import { onMount } from 'svelte';

	let provider: any;
	let message = 'not connected';
	let chainId : any;

	// Gets new chain if the old is changed. 
	async function getChainData() {
		// If ethersProvider is empty, it's not connected to metamask
		if(Object.entries($ethersProvider).length === 0){
			return; 
		}

		let network = await $ethersProvider.getNetwork();
		chainId = network.chainId;
	}

	// On disconnect removes ethers provider and tries to set it again
	async function handleAccountsChanged() {
		removeProvider(); 
		await setEthersProvider(); 

		message = 'connected';
		getChainData();
	}

	// Tries to connect to metamask when no account is connected
	async function connect() {
		window.ethereum
			.request({ method: 'eth_requestAccounts' })
			.then(handleAccountsChanged)
			.catch((err) => {
				removeProvider(); 
				message = "not connected"
				console.error(err); 
			});
	}

	// If account is on the wrong network, suggest changing to the polygon
	// Provide all data, so the user won't need to search it 
	async function changeChainID() {
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x89' }]
			});
		} catch (switchError) {
			// This error code indicates that the chain has not been added to MetaMask.
			if (switchError.code === 4902) {
				try {
					await window.ethereum.request({
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

	// Connection only possible on the client side
	onMount(() => {
		connect();

		window.ethereum.on('accountsChanged', connect);
		window.ethereum.on('chainChanged', getChainData);
	});
</script>

{#if chainId != 137 && message == 'connected'}
	<button class="wrong-network" on:click={changeChainID}><i class="material-icons">swap_vertical_circle</i>change network</button>
{:else if message == 'not connected'}
	<button class="not-connected" on:click={connect}><i class="material-icons">cancel</i>not connected</button>
{:else}
	<button class="connected">  <i class="material-icons large">check_circle</i>connected</button>
{/if}


<style lang="scss">
    button{
        width: fit-content; 
        height: 40px;
        background-color: #DB5844;
        border: none; 
        border-radius: 10px;
        color: #263238; 
        position: absolute; 
        right:  100px;
        top: 40px; 
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0 20px;
    }

    .material-icons{
        font-size: 35px;
        margin-right: 5px;
    }
</style>
