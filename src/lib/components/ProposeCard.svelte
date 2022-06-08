<script>
	import ProposeDetails from '$lib/subcomponents/ProposeDetails.svelte';

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

<div class="card">
	<div class="header">Propose</div>
	<ProposeDetails/>
</div>


<style>
	.card {
		background-color: #db5844;
		height: fit-content;
		width: 500px;
		position: relative;
		top: 100px;
		border-radius: 10px;
		padding: 30px 30px;
        box-sizing: border-box;
	}
	.header {
		color: #263238;
		font-family: 'Khula', sans-serif;
		font-size: 50px;
		position: relative;
	}
</style>
