<div>
	<label>
		Name:
		<input type="text" />
	</label>
	<button>Submit</button>
</div>

<style>
	input:active,
	button:active {
		outline: dashed red;
		outline-offset: 1px;
	}

	/* The styles below are not relevant for the example. */
	div {
		display: flex;
		gap: 1rem;
	}

	button,
	input {
		all: revert;
	}
</style>
