export function load({ url }) {
	const email_address = url.searchParams.get('email');
	return {
		email_address,
		seo: {
			title: 'Unsubscribe',
			description: 'Unsubscribe from my newsletter.'
		}
	};
}
