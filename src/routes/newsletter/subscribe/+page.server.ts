import type { Prospect, Subscriber as EOSubscriber } from '$models/newsletter.model';
import { invalid, type Actions } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { create_contact, get_contact } from '../api';
import { SubscribeForm, type Subscriber } from './validation';

type DefaultActionResult = {
	success: boolean;
	errors?: Validation.Errors;
	// Return original values to form.
	values?: {
		first_name?: string;
		email_address?: string;
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const original_values = {
			first_name: formData.get('first_name')?.toString(),
			email_address: formData.get('email_address')?.toString()
		};

		let validated_values: Subscriber;
		let errors: Validation.Errors;

		// Validation.
		try {
			validated_values = SubscribeForm.parse(original_values);
		} catch (e) {
			if (e instanceof ZodError) {
				errors = e.flatten() as Validation.Errors;
				return invalid(400, {
					success: false,
					errors,
					values: original_values
				} as DefaultActionResult);
			} else {
				throw e;
			}
		}

		// Convert validated values to Prospect for EmailOctopus API.
		const prospect: Prospect = {
			email_address: validated_values.email_address,
			fields: { FirstName: validated_values.first_name }
		};

		// Try to subscribe.
		const response = await create_contact(prospect);

		if (!response.ok) {
			const body = (await response.json()) as { error: EmailOctopusApiError };
			let formErrors = [body.error.message];

			// If prospect is already on list, lookup their status.
			if (body.error.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
				const lookup_response = await get_contact(prospect.email_address);

				// Try to look up subscriber status.
				const subscriber = (await lookup_response.json()) as EOSubscriber;

				switch (subscriber.status) {
					case 'SUBSCRIBED':
						formErrors = ['You are already subscribed.'];
						break;
					case 'PENDING':
						formErrors = [
							'You have subscribed earlier. Please check your email and click the confirmation link.'
						];
						break;
					case 'UNSUBSCRIBED':
						formErrors = [
							'You have unsubscribed earlier. To resubscribe, please send an email to support@maier.asia.'
						];
						break;
				}
			}

			return invalid(response.status, {
				success: false,
				errors: { formErrors, fieldErrors: {} },
				values: original_values
			} as DefaultActionResult);
		}

		return { success: true } as DefaultActionResult;
	}
};
