import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { unsubscribe } from '../api';
import { ApiErrorSchema, UnsubscribeFormSchema } from '../zod-schemas';

const SUCCESS_MESSAGE = 'You have unsubscribed from my newsletter.';

/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
	const email_address = url.searchParams.get('email');
	return { email_address };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const submitted = {
			email_address: formData.get('email_address')?.toString()
		};

		let validated;

		// Validate form data.
		try {
			validated = UnsubscribeFormSchema.parse(submitted);
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

		// Try to unsubscribe.
		const response = await unsubscribe(validated.email_address);

		if (!response.ok) {
			/** @type {import('../zod-types').ApiError)} */
			const body = await response.json();
			ApiErrorSchema.parse(body);

			let message = body.error.message;

			// The MEMBER_NOT_FOUND error message would disclose that the email has never been subscribed.
			if (body.error.code === 'MEMBER_NOT_FOUND') {
				message = SUCCESS_MESSAGE;
			}

			return fail(response.status, {
				message,
				values: submitted
			});
		}

		return { message: SUCCESS_MESSAGE };
	}
};
