<script>
    export let selected = false; 
    export let percentage = 0;
    export let option="";
</script>

<div class="vote {selected ? "selected" : "" }">
	<div class="option">{option}</div>
	<div class="percentage">{percentage}%</div>
	<div class="progress" style="width: {percentage}%;" />
	<div class="total"/>
</div>



<style>
	.vote {
		top: 15px;
		position: relative;
		width: 100%;
		height: 50px;
		background-color: #f8f8f8;
		border-radius: 4px;
		cursor: pointer;
		justify-content: center;
		font-size: 20px;
		color: #263238;
	}

	.selected {
		left: 7px;
		width: 97%;
		outline: solid;
		outline-color: #263238;
		outline-width: 8px;
        border-radius: 1px;
	}
	.progress {
		position: absolute;
		width: 50%;
		background-color: #263238;
		height: 10px;
		bottom: 5px;
		border-radius: 3px;
		left: 10px;
	}
	.total {
		position: absolute;
		background-color: #26323871;
		height: 10px;
		bottom: 5px;
		border-radius: 3px;
		left: 10px;
        width: 95%;
	}
	.option {
		position: absolute;
		left: 12px;
		top: 5px;
	}
	.percentage {
		position: absolute;
		right: 10px;
		top: 5px;
	}
</style>
