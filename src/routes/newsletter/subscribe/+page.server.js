import { error, fail } from '@sveltejs/kit';
import { subscribe, get_subscriber } from '$lib/utils/eo-api';
import { EOApiErrorSchema, EOSubscriberSchema, SubscribeFormSchema } from '$lib/schemas';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const result = SubscribeFormSchema.safeParse(data);

		if (!result.success) {
			const { fieldErrors: errors } = result.error.flatten();
			return fail(400, {
				errors,
				data
			});
		}

		const validated_data = result.data;

		// Try to subscribe.
		const response = await subscribe(validated_data);

		if (!response.ok) {
			const result = EOApiErrorSchema.safeParse(await response.json());

			if (!result.success) {
				error(500, 'Subscription failed.');
			}

			const { error: eo_api_error } = result.data;

			/** @type {string} */
			let message = '';

			// If subscriber is already on list, lookup their status.
			if (eo_api_error.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
				const res = await get_subscriber(validated_data.email_address);

				if (!res.ok) {
					error(500, 'Subscription failed.');
				}

				// Validate subscriber.
				const result = EOSubscriberSchema.safeParse(await res.json());

				if (!result.success) {
					error(500, 'Subscription failed.');
				}

				const subscriber = result.data;

				switch (subscriber.status) {
					case 'SUBSCRIBED':
						message = 'Your subscription was successful.';
						break;
					case 'PENDING':
					case 'UNSUBSCRIBED':
						message = 'Please email support@maier.asia to complete your subscription.';
						break;
				}
			}

			return fail(400, {
				message,
				data
			});
		}

		return { message: 'Please check your email and confirm your subscription.' };
	}
};
