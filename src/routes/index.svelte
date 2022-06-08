<script>
	import ConnectButton from '$lib/components/ConnectButton.svelte';
	import VoteCard from '$lib/components/VoteCard.svelte';
	import ProposeCard from '$lib/components/ProposeCard.svelte';

</script>

<div class="title">Voting Manager</div>
<div class="main">
	<VoteCard />
	<div class="spacing" />
	<ProposeCard />
</div>
<ConnectButton />

<style>
	:global(body) {
		background-color: #263238;
		font-family: 'Poppins', sans-serif;
		margin: 0;
		overflow-x: hidden;
	}

	.title {
		font-family: 'Khula', sans-serif;
		font-weight: 400;
		color: #db5844;
		font-size: 40px;
		position: relative;
		top: 30px;
		left: 70px;
		cursor: pointer;
	}
	.main {
		width: 100vw;
		display: flex;
		justify-content: center;
	}

	.spacing {
		width: 70px;
	}

	@media only screen and (max-width: 1200px) {
		.spacing {
			width: 20px;
		}
	}
</style>
