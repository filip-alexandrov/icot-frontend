<script>
	export let voteDetails = {
		description: 'I am transfering a token to my address.',
		transactions: [
			{
				address: '0x86693B6E574163505e9fDfC93A7ebBe48b71dE54',
				value: '3 ETH',
				function: 'transfer(0x86693B6E574163505e9fDfC93A7ebBe48b71dE54, 12)'
			}
		]
	}; 
</script>

{#each voteDetails.transactions as transaction}
	<div class="target-address">
		<div class="target-address-header">Target address:</div>
		<input type="text" bind:value={transaction.address} />
	</div>

	<div class="value-to-send">
		<div class="value-to-send-header">Value to send:</div>
		<input type="text" bind:value={transaction.value} />
	</div>

	<div class="function-call">
		<div class="function-call-header">Function call:</div>
		<input type="text" bind:value={transaction.function} />
	</div>
{/each}

<div class="description">
	<div class="description-header">Description:</div>
	<textarea
    bind:value={voteDetails.description}
		name=""
		id=""
		cols="30"
		rows="10"
	/>
</div>

<style>
	.target-address,
	.value-to-send,
	.function-call,
	.description {
		color: #263238;
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-size: 20px;
		position: relative;
	}

	.target-address input,
	.value-to-send input,
	.function-call input,
	.description textarea {
		background-color: #263238;
		border: none;
		color: #f8f8f8;
		width: 100%;
		padding: 6px;
		border-radius: 6px;
		padding-left: 20px;
		padding-right: 20px;
		box-sizing: border-box;
		font-family: 'Poppins', sans-serif;
		letter-spacing: 0.5px;
        pointer-events: none;
	}

	input:focus,
	textarea:focus {
		outline: none;
	}
	textarea {
		resize: none;
	}

	.target-address-header,
	.value-to-send-header,
	.function-call-header,
	.description-header {
		font-size: 15px;
		position: relative;
		top: 3px;
		left: 2px;
		font-family: 'Poppins', sans-serif;
		font-weight: 400;
	}

	.value-to-send input {
		width: 18%;
	}
	.description textarea {
		height: 110px;
	}
</style>
