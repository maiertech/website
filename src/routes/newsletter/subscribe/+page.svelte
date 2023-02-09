<script>
	import SubscribeForm from './subscribe-form.svelte';

	/** @type {import('./$types').ActionData} */
	export let form;

	$: message = form?.message;
	$: errors = form?.errors;
	$: values = form?.values;
</script>

<SubscribeForm {message} {errors} {values} />
