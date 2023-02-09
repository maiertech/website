<script>
	import { enhance } from '$app/forms';

	/** @type {string} */
	export let message;

	/** @type {import('../zod-types').ValidationErrors} */
	export let errors = undefined;

	/** @type {import('../zod-types').SubscribeForm} */
	export let values = undefined;

	/** @type {string|undefined} */
	let first_name = values?.first_name;

	/** @type {string|undefined} */
	let email_address = values?.email_address;
</script>

<header>Subscribe to my newsletter</header>

{#if message}
	<p>{message}</p>
{/if}

<!-- use:enhance -->
<form method="POST" use:enhance>
	<div>
		<label for="first_name" class="sr-only">First name</label>
		{#if errors?.first_name}
			<p class="validation_error">{errors.first_name[0]}</p>
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
		{#if errors?.email_address}
			<p class="validation_error">{errors.email_address[0]}</p>
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
