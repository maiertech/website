<script lang="ts">
	import Subscribe from '$lib/components/subscribe.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	function get_message(form_data: ActionData) {
		if (form_data?.success) {
			return 'Please check your email and click the confirmation link.';
		}

		if (form_data?.errors?.formErrors && form_data.errors.formErrors.length > 0) {
			return form_data.errors.formErrors[0];
		}

		return 'Read my posts before everyone else.';
	}

	function get_validation_errors(form_data: ActionData) {
		let first_name;
		if (form_data?.errors?.fieldErrors?.first_name) {
			first_name = form_data.errors.fieldErrors.first_name[0];
		}

		let email_address;
		if (form_data?.errors?.fieldErrors?.email_address) {
			email_address = form_data.errors.fieldErrors.email_address[0];
		}

		return { first_name, email_address };
	}

	$: message = get_message(form);
	$: validation_errors = get_validation_errors(form);
	$: first_name = form?.values?.first_name;
	$: email_address = form?.values?.email_address;
</script>

<Subscribe {first_name} {email_address} {message} {validation_errors} />
