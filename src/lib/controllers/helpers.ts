// @ts-nocheck

import { writable } from 'svelte/store';
import { ethers } from 'ethers';


let chianState = writable({
	signer,
	provider,
	message : 'Not connected to Metamask',
	chainId
})

let signer: any;
let provider: any;
let message = 'Not connected to Metamask';
let chainId;

export async function getChainData() {
	let network = await provider.getNetwork();
	chainId = network.chainId;
	console.log(`Network: ${network.chainId}`);
}

export async function handleAccountsChanged() {
	provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
	await provider.send('eth_requestAccounts', []);
	signer = provider.getSigner();

	message = 'Connected to Metamask';
	getChainData();

	// console.log('Account:', await signer.getAddress());
}

export async function connect() {
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

export async function changeChainID() {
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

export function getVariables() {
	return {
		signer,
		provider,
		message,
		chainId
	};
}
