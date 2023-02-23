<script>
	import { enhance } from '$app/forms';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<header>Subscribe to my newsletter</header>

{#if form?.message}
	<p>{form.message}</p>
{/if}

<form method="POST" use:enhance>
	<div>
		<label for="first_name" class="sr-only">First name</label>
		<input
			type="text"
			name="first_name"
			placeholder="Enter first name (optional)"
			value={form?.data?.first_name ?? ''}
		/>
		{#if form?.errors?.first_name}
			<label for="first_name" class="error">{form.errors.first_name[0]}</label>
		{/if}
	</div>
	<div>
		<label for="email_address" class="sr-only">Email address</label>
		<input
			type="email"
			name="email_address"
			placeholder="Enter email address (required)"
			value={form?.data?.email_address ?? ''}
			required
		/>
		{#if form?.errors?.email_address}
			<label for="email_address" class="error">
				<span>{form.errors.email_address[0]}</span>
			</label>
		{/if}
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

	footer {
		font-size: var(--font-size-fluid-0);
	}
</style>
