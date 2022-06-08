<script>
	// @ts-nocheck
	export let transactions; 
	export let description;
</script>

{#each transactions as transaction}
	<div class="target-address">
		<div class="target-address-header">Target address:</div>
		<div class="transaction-detail">
			{transaction.address}
		</div>
	</div>

	<div class="value-to-send">
		<div class="value-to-send-header">Value to send:</div>
		<div class="transaction-detail">
			{transaction.value}
		</div>
	</div>

	<div class="function-call">
		<div class="function-call-header">Function call:</div>
		<div class="transaction-detail">
			{transaction.func}
		</div>
	</div>
{/each}

<div class="description">
	<div class="description-header">Description:</div>
	<div class="transaction-detail">
		{description}
	</div>
</div>

<style>
	.target-address,
	.value-to-send,
	.function-call,
	.description {
		color: #263238;
		font-family: 'Poppins', sans-serif;
		font-weight: 400;
		font-size: 15px;
		position: relative;
	}

	.target-address .transaction-detail,
	.value-to-send .transaction-detail,
	.function-call .transaction-detail,
	.description .transaction-detail {
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
		overflow: auto;
		white-space: nowrap;
	}
	.description .transaction-detail {
		white-space: normal;
	}

	.target-address .transaction-detail::-webkit-scrollbar,
	.value-to-send .transaction-detail::-webkit-scrollbar,
	.function-call .transaction-detail::-webkit-scrollbar,
	.description .transaction-detail::-webkit-scrollbar {
		display: none;
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

	.value-to-send .transaction-detail {
		width: 18%;
	}
	.description .transaction-detail {
		height: 110px;
	}
</style>
