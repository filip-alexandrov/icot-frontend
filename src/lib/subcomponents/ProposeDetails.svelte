<script>
	let propsalDetails = {
		description: '',
		transactions: [
			{
				address: '',
				value: '',
				function: ''
			}
		]
	};

	$: console.log(propsalDetails)

	function addTransaction() {
		let lastTransaction = propsalDetails.transactions[propsalDetails.transactions.length - 1];

		if (
			lastTransaction.address == '' ||
			lastTransaction.value == '' ||
			lastTransaction.function == ''
		) {
			return;
		}
		propsalDetails.transactions.push({
			address: '',
			value: '',
			function: ''
		});
	}
</script>

{#each propsalDetails.transactions as transaction}
	<div class="target-address">
		<div class="target-address-header">Target address:</div>

		<input
			type="text"
			class="transaction-detail"
			bind:value={transaction.address}
			placeholder="0x86693B6E574163505e9fDfC93A7ebBe48b71dE54"
		/>
	</div>

	<div class="value-to-send">
		<div class="value-to-send-header">ETH to send:</div>

		<input class="transaction-detail" type="text" bind:value={transaction.value} placeholder="420" />
	</div>

	<div class="function-call">
		<div class="function-call-header">Function call:</div>

		<input
			type="text"
			class="transaction-detail"
			bind:value={transaction.function}
			placeholder="transfer(0x86693B6E574163505e9fDfC93A7ebBe48b71dE54, 12)"
		/>
	</div>
{/each}

<div class="button-holder">
	<div class="add-button"><i class="material-icons">add_circle</i>&nbsp; add transaction</div>
</div>

<div class="description">
	<div class="description-header">Description:</div>

	<textarea
		type="text"
		class="transaction-detail"
		bind:value={propsalDetails.description}
		placeholder="I am transfering a token to my address. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur asperiores, mollitia consequatur laboriosam non labore aliquam corporis ex, ipsum harum nostrum quas dicta quidem veritatis doloremque sint ullam iure magnam optio. Distinctio necessitatibus nostrum minus reiciendis, porro quibusdam saepe possimus quisquam qui voluptas dolor voluptatem accusantium, perferendis optio architecto in odio sed quod natus suscipit nihil soluta incidunt deserunt ad. Quidem, esse! Rerum cumque nostrum ipsa enim sunt omnis, unde quos in perspiciatis dignissimos exercitationem vel illo velit culpa quia maiores reiciendis consequatur. Nesciunt, maxime adipisci eaque obcaecati tenetur odit eius ducimus, quas recusandae alias dolores perspiciatis assumenda quae ipsa."
	/>
</div>

<div class="min-votes">To propose: 400 ICOT</div>
<div class="submit-proposal">Submit proposal</div>

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

	.button-holder{
		position: relative;
		top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-bottom: 20px;
	}
	.add-button{
		padding: 1px 15px;
		border-radius: 30px;
		font-family: 'Poppins', sans-serif;
		font-weight: 400;
		font-size: 16px;
		background-color: #f8f8f8;
		color: #263238;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.add-button i{
		font-size: 35px;
	}
	.min-votes{
		position: relative; 
		top: -5px; 
		color: #263238;
		
	}
	.submit-proposal{
		position: relative;
		top: -22px; 
		left: 60%;
		width: 40%;
		height: 50px;
		background-color: #f8f8f8;
		color: #263238;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0 0 8px 8px;
		cursor: pointer;
		font-size: 18px;
	}
</style>
