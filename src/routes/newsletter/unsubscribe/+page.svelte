<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let email_address: string;

	// If original values in `form` are populated, they take precedence over `data`.
	if (form?.values?.email_address) {
		email_address = form.values.email_address;
	} else if (data?.email_address) {
		email_address = data.email_address;
	}

	function get_message(form_data: ActionData) {
		if (form_data?.success) {
			return 'You are no longer subscribed to my newsletter.';
		}

		if (form_data?.errors?.formErrors && form_data.errors.formErrors.length > 0) {
			return form_data.errors.formErrors[0];
		}

		return 'Enter your email address and hit unsubscribe.';
	}

	$: message = get_message(form);
</script>

<h1>Unsubscribe from my newsletter</h1>

<p>{message}</p>

<form method="POST" use:enhance>
	<div>
		<label for="email_address" class="sr-only">Email address</label>
		{#if form?.errors?.fieldErrors?.email_address}
			<p class="validation_error">{form.errors.fieldErrors.email_address[0]}</p>
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
