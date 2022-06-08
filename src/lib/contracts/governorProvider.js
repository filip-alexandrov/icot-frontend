// @ts-nocheck
import { ethers } from 'ethers';
import { writable } from 'svelte/store';
// import config from "./taskmanager.json"

import governorAbi from './GovernorABI.json';
import tokenAbi from './Erc20ABI.json';

export const voteDetails = writable({
	description: 'Loading...',
	transactions: [
		{
			address: 'Loading...',
			value: 'Loading...',
			func: 'Loading...'
		}
	],
	participation: 0,
	quorum: 0,
	forPercentage: 0,
	againstPercentage: 0,
	abstainPercentage: 0
});

class GovernorProvider {
	constructor() {
		this.voteDetails = {
			description: 'Loading...',
			transactions: [
				{
					address: 'Loading...',
					value: 'Loading...',
					func: 'Loading...'
				}
			],
			participation: 0,
			quorum: 0,
			forPercentage: 0,
			againstPercentage: 0,
			abstainPercentage: 0
		};

		this.governorAddress = '0x278Dfd116Ac51449459a96b3412F058582CafE8F';
		this.tokenAddress = '0x7A2bcC2fE5c7c97B9c95cD77c2eC96b6a2420E2F';
		this.timelockAddress = '0x76Fe17508A2ecaA198a9B52f5Aad6d4A7a3a549A';

		this.provider = new ethers.providers.InfuraProvider('rinkeby');
		this.governorContract = new ethers.Contract(this.governorAddress, governorAbi, this.provider);
		this.tokenContract = new ethers.Contract(this.tokenAddress, tokenAbi, this.provider);
	}

	#getAbi = async (address) => {
		// Delay execution by 0.2 to stay within rate limit
		await new Promise((resolve) => setTimeout(resolve, 1000));

		let response = await fetch(
			`https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}`
		);
		let responseJson = await response.json();

		// Parse result field (string => json)
		try {
			responseJson = JSON.parse(responseJson.result);
		} catch {
			// Slow requests to fulfill API requirements
			await new Promise((resolve) => setTimeout(resolve, 1000));

			response = await fetch(
				`https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}`
			);
			responseJson = await response.json();
			responseJson = JSON.parse(responseJson.result);
		}

		return responseJson;
	};

	#decodeCalldata = async (calldatas, targets) => {
		let functionsArray = [];

		for (let i = 0; i < calldatas.length; i++) {
			let targetAddress = targets[i];
			let targetAbi = await this.#getAbi(targetAddress);

			// Copy contract instance
			let targetContract = new ethers.Contract(targetAddress, targetAbi, this.provider);
			let functionCall = '';

			for (let obj of targetAbi) {
				// Target only functions from the ABI
				if (obj.type == 'function') {
					try {
						let func = targetContract.interface.decodeFunctionData(obj.name, calldatas[i]);
						functionCall += obj.name + '( ';

						// Loop over input params of the function
						for (let input of obj.inputs) {
							functionCall += input.name + ' = ' + func[input.name] + ' , ';
						}

						// Remove trailing comma
						functionCall = functionCall.slice(0, -2);
						functionCall += ')';

						functionsArray.push(functionCall);
					} catch (err) {
						// Method doesnt match bytecode
					}
				}
			}
		}
		return functionsArray;
	};

	#decodeValues = async (values) => {
		let normalizedValues = [];
		for (let value of values) {
			normalizedValues.push(ethers.utils.formatEther(value));
		}
		return normalizedValues;
	};

	#liveResults = async (proposalId, startBlock) => {
		// Ensure voting is active
		let currentBlockNumber = await this.provider.getBlockNumber();
		if (currentBlockNumber >= startBlock /* && currentBlockNumber <= endBlock */) {
			// Vote Variables
			let [againstVotes, forVotes, abstainVotes] = await this.governorContract.proposalVotes(
				proposalId
			);
			let quorum = await this.governorContract.quorum(startBlock);
			let totalSupply = await this.tokenContract.getPastTotalSupply(startBlock);

			// Normalize variables as %
			let againstVotesNorm = ethers.utils.formatEther(againstVotes.div(totalSupply));
			let forVotesNorm = ethers.utils.formatEther(forVotes.div(totalSupply));
			let abstainVotesNorm = ethers.utils.formatEther(abstainVotes.div(totalSupply));
			let quorumNorm = ethers.utils.formatEther(quorum.div(totalSupply));
			
			// Parse variables as floats
			let againstVotesFloat = parseFloat(againstVotesNorm)
			let forVotesFloat = parseFloat(forVotesNorm)
			let abstainVotesFloat = parseFloat(abstainVotesNorm)
			let quorumFloat = parseFloat(quorumNorm)

			this.voteDetails.againstPercentage = againstVotesFloat;
			this.voteDetails.forPercentage = forVotesFloat;
			this.voteDetails.abstainPercentage = abstainVotesFloat;
			this.voteDetails.quorum = quorumFloat;
			this.voteDetails.participation = againstVotesFloat + forVotesFloat + quorumFloat;

			console.log(this.voteDetails.participation);
		}
		return;
	};

	async getData() {
		// Search Proposal Creation Events
		let filter = {
			address: this.governorAddress,
			topics: [
				// keccak hash of the event == topics[0]
				ethers.utils.id(
					'ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)'
				)
			],
			fromBlock: 10798370
		};

		let logs = await this.provider.getLogs(filter);

		// no indexed params in proposal
		let data = ethers.utils.defaultAbiCoder.decode(
			[
				'uint256',
				'address',
				'address[]',
				'uint256[]',
				'string[]',
				'bytes[]',
				'uint256',
				'uint256',
				'string'
			],
			logs[logs.length - 1].data // get last log
		);

		let proposalId = data[0];
		let proposer = data[1];
		let targets = data[2]; // array of target contracts
		let values = data[3]; // ETH values to send mapped to contracts
		let signatures = data[4]; // array
		let calldatas = data[5]; // calldata mapped to contracts (encodedFunctionCall)
		let startBlock = data[6]; // start block of the voting
		let endBlock = data[7]; // end block of the voting
		let description = data[8]; // Description of the proposal

		// Array of function calls
		let funcs = await this.#decodeCalldata(calldatas, targets);

		// ETH values normalized from hex
		let vals = await this.#decodeValues(values);

		// Plain text description
		this.voteDetails.description = description;

		// Map transactions
		for (let i = 0; i < targets.length; i++) {
			// Replace first entry in transactions
			try {
				this.voteDetails.transactions[i].address = targets[i];
				this.voteDetails.transactions[i].value = vals[i];
				this.voteDetails.transactions[i].func = funcs[i];
			} catch {
				// No element at pos. i => append array
				this.voteDetails.transactions.push({
					target: targets[i],
					value: vals[i],
					func: funcs[i]
				});
			}
		}

		await this.#liveResults(proposalId, startBlock);

		// Reactive update
		voteDetails.set(this.voteDetails)
	}
}

let governorProvider = new GovernorProvider();
governorProvider.getData();
