// @ts-nocheck
import { ethers } from 'ethers';
import { writable } from 'svelte/store';
// import config from "./taskmanager.json"

export const ethersProvider = writable({});

// Called initially when connected to metamask
export async function setEthersProvider() {
	let provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
	await provider.send('eth_requestAccounts', []);

	ethersProvider.set(provider);
}

// Called when metamask account changes or disconnects
export function removeProvider() {
	ethersProvider.set({});
}

/* class EthersProvider {
	constructor() {
		// Public provider, pick any network
		this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
		this.signer = this.provider.getSigner();
	}

	getContract({ address, abi }) {
		return new ethers.Contract(address, abi, this.signer);
	}

	get taskContract() {
		const contract = this.getContract({
			abi: config.abi,
			address: config.address
		});
		return {
			getName: async () => await contract.name(),
			getAll: async () => await contract.getAll(),
			add: async (task = '') => await contract.addTask(task),
			update: async (index, status) => await contract.updateStatus(index, status),
			remove: async (index) => await contract.deleteTaskByIndex(index)
		};
	}
} */
