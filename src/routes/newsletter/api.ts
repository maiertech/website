import type { Prospect } from '$models/newsletter.model';
import { createHash } from 'crypto';
import { EO_API_KEY, EO_LIST_ID } from '$env/static/private';

const base = 'https://emailoctopus.com/api/1.6/';
const querystring = new URLSearchParams({ EO_API_KEY });

// All API functions return a Promise<Response>.

// https://emailoctopus.com/api-documentation/lists/create-contact
export function create_contact(prospect: Prospect) {
	const url = `${base}lists/${EO_LIST_ID}/contacts`;
	const payload = { EO_API_KEY, ...prospect };
	return fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
}

// https://emailoctopus.com/api-documentation/lists/get
export function get_list() {
	const url = `${base}lists/${EO_LIST_ID}?${querystring}`;
	return fetch(url, { method: 'GET' });
}

// https://emailoctopus.com/api-documentation/lists/get-contact
export function get_contact(email_address: string) {
	// EO expects lower case email address to be hashed with MD5.
	const digest = createHash('md5').update(email_address.toLowerCase()).digest('hex');
	const url = `${base}lists/${EO_LIST_ID}/contacts/${digest}?${querystring}`;
	return fetch(url, { method: 'GET' });
}

// https://emailoctopus.com/api-documentation/lists/update-contact
export function update_contact(email_address: string) {
	// EO expects lower case email address to be hashed with MD5.
	const digest = createHash('md5').update(email_address.toLowerCase()).digest('hex');
	const url = `${base}lists/${EO_LIST_ID}/contacts/${digest}`;
	const payload = { EO_API_KEY, status: 'UNSUBSCRIBED' };
	return fetch(url, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
}
