<script lang="ts">
	// @ts-nocheck

	import { ethers, providers } from 'ethers';
	import { onMount } from 'svelte';

	let signer: any;
	let provider: any;
	let message = 'not connected';
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

		message = 'connected';
		getChainData();
	}

	async function connect() {
		ethereum
			.request({ method: 'eth_requestAccounts' })
			.then(handleAccountsChanged)
			.catch((err) => {
				if (err.code === 4001) {
					message = 'not connected';
				} else {
					message = 'not connected';
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

	onMount(() => {
		connect();

		ethereum.on('accountsChanged', connect);
		ethereum.on('chainChanged', getChainData);
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
        height: 5vh;
        background-color: #DB5844;
        border: none; 
        border-radius: 10px;
        color: #263238; 
        position: fixed; 
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
