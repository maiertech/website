import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { update_contact } from '../api';
import type { PageServerLoad } from './$types';
import { UnsubscribeForm } from './validation';
import type { Unsubscriber } from './validation';

export const load: PageServerLoad = ({ url }) => {
	const email_address = url.searchParams.get('email');
	return { email_address };
};

type DefaultActionResult = {
	success: boolean;
	errors?: Validation.Errors;
	// Return original values to form.
	values?: {
		email_address?: string;
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const original_values = {
			email_address: formData.get('email_address')?.toString()
		};

		let validated_values: Unsubscriber;
		let errors: Validation.Errors;

		// Validation.
		try {
			validated_values = UnsubscribeForm.parse(original_values);
		} catch (e) {
			if (e instanceof ZodError) {
				errors = e.flatten() as Validation.Errors;
				return fail(400, {
					success: false,
					errors,
					values: original_values
				} as DefaultActionResult);
			} else {
				throw e;
			}
		}

		// Try to unsubscribe.
		const response = await update_contact(validated_values.email_address);

		if (!response.ok) {
			const body = (await response.json()) as { error: EmailOctopusApiError };
			errors = { formErrors: [body.error.message], fieldErrors: {} };
			return fail(response.status, {
				success: false,
				errors,
				values: original_values
			} as DefaultActionResult);
		}

		return { success: true } as DefaultActionResult;
	}
};
