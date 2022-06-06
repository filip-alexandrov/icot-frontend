<script>
    export let participation = 0; 
    export let quorum = 0; 

</script>

<button>Submit vote</button>
<div class="participation">
	<div class="header">Participation</div>
	<div class="percentage-digit">{participation}%</div>
	<div class="percentage-bar" style="width: {participation}%;" />
	<div class="total-bar" />
	<div class="quorum">Quorum: {quorum}%</div>
</div>

<style>
	button {
		position: relative;
		left: 60%;
		top: 25px;
		width: 40%;
		height: 50px;
		color: #263238;
		text-align: center;
		background-color: #f8f8f8;
		border: none;
		border-radius: 0 0 8px 8px;
		font-family: 'Poppins', sans-serif;
		font-size: 20px;
		cursor: pointer;
	}
	.participation {
		font-size: 20px;
		color: #263238;
		position: relative;
		top: 40px;
		margin-bottom: 10px;
		width: 100%;
	}
	.participation .header {
		font-family: 'Poppins', sans-serif;
		font-size: 20px;
		color: #263238;
	}
	.percentage-bar {
		position: relative;
		height: 12px;
		background-color: #263238;
		border-radius: 5px;
	}
	.percentage-digit {
		top: 0px;
		position: absolute;
		right: 0;
	}
	.total-bar {
		position: relative;
		width: 100%;
		top: -12px;
		height: 12px;
		background-color: #2632386e;
		border-radius: 5px;
	}
	.quorum {
		font-size: 15px;
		position: relative;
		top: -15px;
	}
</style>
