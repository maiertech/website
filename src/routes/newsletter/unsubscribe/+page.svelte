<script>
	import { enhance } from '$app/forms';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	// Returned submitted email takes precedence over email from querystring.
	let email_address = form?.values?.email_address
		? form.values.email_address
		: data?.email_address
		? data.email_address
		: undefined;
</script>

<h1>Unsubscribe from my newsletter</h1>

{#if form?.message}
	<p>{form.message}</p>
{/if}

<form method="POST" use:enhance>
	<div>
		<label for="email_address" class="sr-only">Email address</label>
		{#if form?.errors?.email_address}
			<p class="validation_error">{form.errors.email_address[0]}</p>
		{/if}
		<input
			bind:value={email_address}
			type="email"
			name="email_address"
			placeholder="Enter email address (required)"
			required
		/>
	</div>
	<button type="submit">Unsubscribe</button>
</form>

<style>
	h1 {
		font-size: var(--font-size-fluid-2);
		font-weight: var(--font-weight-7);
		margin-block-end: var(--size-fluid-1);
	}

	p {
		font-size: var(--font-size-fluid-1);
		margin-block-end: var(--size-fluid-2);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-3);
		margin-block-end: var(--size-3);
	}

	@media (min-width: 480px) {
		form {
			width: fit-content;
		}

		form button {
			align-self: flex-end;
		}
	}

	div {
		position: relative;
	}

	input {
		width: 100%;
	}

	@media (min-width: 480px) {
		input {
			width: var(--size-fluid-10);
		}
	}

	.validation_error {
		position: absolute;
		bottom: calc(-1 * var(--size-fluid-2));
		font-size: var(--font-size-fluid-0);
		margin-block-end: 0;
	}
</style>
