<script>
	import VoteOption from '$lib/components/VoteOption.svelte';
	import VoteDetails from '$lib/components/VoteDetails.svelte';
	import VoteButton from '$lib/components/VoteButton.svelte';

	let voteDetails = {
		description:
			'I am transfering a token to my address. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur asperiores, mollitia consequatur laboriosam non labore aliquam corporis ex, ipsum harum nostrum quas dicta quidem veritatis doloremque sint ullam iure magnam optio. Distinctio necessitatibus nostrum minus reiciendis, porro quibusdam saepe possimus quisquam qui voluptas dolor voluptatem accusantium, perferendis optio architecto in odio sed quod natus suscipit nihil soluta incidunt deserunt ad. Quidem, esse! Rerum cumque nostrum ipsa enim sunt omnis, unde quos in perspiciatis dignissimos exercitationem vel illo velit culpa quia maiores reiciendis consequatur. Nesciunt, maxime adipisci eaque obcaecati tenetur odit eius ducimus, quas recusandae alias dolores perspiciatis assumenda quae ipsa.',
		transactions: [
			{
				address: '0x86693B6E574163505e9fDfC93A7ebBe48b71dE54',
				value: '3 ETH',
				function: 'transfer(0x86693B6E574163505e9fDfC93A7ebBe48b71dE54, 12)'
			}
		],
		participation: 17,
		quorum: 4
	};
</script>

<div class="main">
	<div class="card">
		<div class="header">Voting</div>
		<VoteDetails {voteDetails} />
		<VoteOption option={'For'} selected={true} percentage={50} />
		<div class="vote-spacing" />
		<VoteOption option={'Against'} selected={false} percentage={20} />
		<div class="vote-spacing" />
		<VoteOption option={'Abstain'} selected={false} percentage={30} />
		<VoteButton quorum={voteDetails.quorum} participation={voteDetails.participation} />
	</div>
	<div class="spacing" />
	<div class="card">
		<div class="header">Voting</div>
		<div class="target-address">
			<div class="target-address-header">Target address:</div>
			<input type="text" placeholder="0x94joj98r3932ur9oi" />
		</div>
	</div>
</div>

<style>
	.main {
		width: 100vw;
		display: flex;
		justify-content: center;
	}
	.card {
		background-color: #db5844;
		height: fit-content;
		width: 450px;
		position: relative;
		top: 100px;
		border-radius: 10px;
		padding: 30px 30px;
	}
	.spacing {
		width: 70px;
	}
	.header {
		color: #263238;
		font-family: 'Khula', sans-serif;
		font-size: 50px;
		position: relative;
	}

	.vote-spacing {
		height: 15px;
	}
</style>
