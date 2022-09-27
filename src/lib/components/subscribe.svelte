<script lang="ts">
	import { enhance } from '$app/forms';

	// Form values are optional, because initial form data can be data that does not validate.
	export let first_name: string | undefined = undefined;
	export let email_address: string | undefined = undefined;

	export let form_action: string | undefined = undefined;
	export let message: string;
	export let validation_errors: { first_name?: string; email_address?: string } | undefined =
		undefined;
</script>

<header>Subscribe to my newsletter</header>

<p>{message}</p>

<form method="POST" action={form_action} use:enhance>
	<div>
		<label for="first_name" class="sr-only">First name</label>
		{#if validation_errors?.first_name}
			<p class="validation_error">{validation_errors.first_name}</p>
		{/if}
		<input
			bind:value={first_name}
			type="text"
			name="first_name"
			placeholder="Enter first name (optional)"
		/>
	</div>
	<div>
		<label for="email_address" class="sr-only">Email address</label>
		{#if validation_errors?.email_address}
			<p class="validation_error">{validation_errors?.email_address}</p>
		{/if}
		<input
			bind:value={email_address}
			type="email"
			name="email_address"
			placeholder="Enter email address (required)"
			required
		/>
	</div>
	<button type="submit">Subscribe</button>
</form>

<footer>
	I care about your data. Read my <a href="/privacy-policy">privacy policy</a>.
</footer>

<style>
	header {
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

	footer {
		font-size: var(--font-size-fluid-0);
	}
</style>
