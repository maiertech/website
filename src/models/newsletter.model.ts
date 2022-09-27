// List from EmailOctopus API.
export type List = {
	id: string;
	name: string;
	counts: {
		pending: number; // Email not confirmed yet.
		subscribed: number; // Subscribed.
		unsubscribed: number; // Unsubscribed, but still in contacts.
	};
};

// Subscription status from EmailOctopus API.
export type SubscriptionStatus = 'SUBSCRIBED' | 'PENDING' | 'UNSUBSCRIBED';

// Prospect for EmailOctopus API.
export interface Prospect {
	email_address: string;
	fields?: {
		FirstName?: string;
		LastName?: string;
	};
}

// Subscriper from EmailOctopus API.
export interface Subscriber extends Prospect {
	id: string;
	status: SubscriptionStatus;
}
