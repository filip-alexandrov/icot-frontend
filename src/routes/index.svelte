<script>
	import ConnectButton from '$lib/components/ConnectButton.svelte';
	import VoteCard from '$lib/components/VoteCard.svelte';
</script>

<div class="title">Voting Manager</div>
<VoteCard /> 
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
</style>
