<script>
	import { enhance } from '$app/forms';

	export let data;
	export let form;
</script>

<h1>Unsubscribe from my newsletter</h1>

{#if form?.message}
	<p>{form.message}</p>
{/if}

<form method="POST" use:enhance>
	<div>
		<label for="email_address" class="sr-only">Email address</label>
		<input
			type="email"
			name="email_address"
			placeholder="Enter email address (required)"
			value={form?.data?.email_address ?? data.email_address}
			required
		/>
		{#if form?.errors?.email_address}
			<label for="email_address" class="error">
				{form.errors.email_address[0]}
			</label>
		{/if}
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
		display: flex;
		flex-direction: column;
	}

	input {
		width: 100%;
	}

	@media (min-width: 480px) {
		input {
			width: var(--size-fluid-10);
		}
	}

	.error {
		font-size: var(--font-size-fluid-0);
		margin-block-end: 0;
	}
</style>
