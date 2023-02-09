import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { subscribe, lookup_subscriber } from '../api';
import { ApiErrorSchema, SubscribeFormSchema } from '../zod-schemas';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const submitted = {
			first_name: formData.get('first_name')?.toString(),
			email_address: formData.get('email_address')?.toString()
		};

		let validated;

		// Validate form data.
		try {
			validated = SubscribeFormSchema.parse(submitted);
		} catch (e) {
			if (e instanceof ZodError) {
				// { formErrors: [], fieldErrors: {} }
				const flattenedErrors = e.flatten();
				return fail(400, {
					message: flattenedErrors?.formErrors[0] ?? 'Please check the validation errors.',
					errors: flattenedErrors?.fieldErrors,
					values: submitted
				});
			} else {
				throw e;
			}
		}

		// Try to subscribe.
		const response = await subscribe(validated);

		if (!response.ok) {
			/** @type {import('../zod-types').ApiError} */
			const body = await response.json();
			ApiErrorSchema.parse(body);

			let message = body.error.message;

			// If prospect is already on list, lookup their status.
			if (body.error.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
				const lookup_response = await lookup_subscriber(validated.email_address);

				// Try to look up subscriber status.
				/** @type {import('../zod-types').Subscriber} */
				const subscriber = await lookup_response.json();

				switch (subscriber.status) {
					case 'SUBSCRIBED':
						message = 'You are already subscribed.';
						break;
					case 'PENDING':
						message =
							'You have subscribed earlier, but not clicked the confirmation link. Please email to support@maier.asia for help.';
						break;
					case 'UNSUBSCRIBED':
						message =
							'You have unsubscribed earlier. Please email to support@maier.asia to resubscribe.';
						break;
				}
			}

			return fail(response.status, {
				message,
				values: submitted
			});
		}

		return { message: 'Please check your email and confirm your subscription.' };
	}
};
