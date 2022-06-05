// @ts-nocheck

import { writable } from 'svelte/store';

const config = {
	MUMBAI_TESTNET: 80001
};

const messageType = {
	NOT_INSTALLED: 'Metamask not installed',
	LOADING: 'loading',
	LOADED: 'loaded',
	ERROR: 'Internal server error'
};

const baseState = {
	isMetamaskInstalled: false,
	isWrongNetwork: false,
	isLocked: false,
	isConnected: false,
	message: messageType.LOADING
};

class MetamaskController {
	#appStore = writable({
		...baseState
	});

	constructor() {
		this.store = {
			subscribe: this.#appStore.subscribe
		};
	}

    switchToPolygon(){
        ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0x13881",
                rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                chainName: "Matic Mainnet",
                nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18
                },
                blockExplorerUrls: ["https://polygonscan.com/"]
            }]
        });
    }

	networkChanged(chainId) {
		let isConnected = chainId == config.MUMBAI_TESTNET;
		let isWrongNetwork = !(chainId == config.MUMBAI_TESTNET);
		this.#appStore.update((s) => ({ ...s, isConnected, isWrongNetwork }));
	}

	async init() {
		const { ethereum } = window;
		const hasMetamask = Boolean(ethereum && ethereum.isMetaMask);

		if (!hasMetamask) {
			return this.#appStore.update((state) => ({
				...baseState,
				message: messageType.NOT_INSTALLED
			}));
		}

		try {
			await ethereum.request({ method: 'eth_requestAccounts' });
			

			this.#appStore.update((s) => {
				s.isMetamaskInstalled = hasMetamask;
				s.isConnected = ethereum.networkVersion == config.MUMBAI_TESTNET;
				s.isWrongNetwork = !(ethereum.networkVersion == config.MUMBAI_TESTNET);
				s.message = messageType.LOADED;
				s.isLocked = false;

				return s;
			});
		} catch (error) {
			let message = error?.message || this.#appStore.set({ ...baseState, message, isLocked: true });
		}
	}
}

export default new MetamaskController();
