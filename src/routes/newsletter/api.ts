import type { Prospect } from '$models/newsletter.model';
import { createHash } from 'crypto';

const base = 'https://emailoctopus.com/api/1.6/';

const api_key = process.env['EO_API_KEY'];
if (!api_key) {
	throw 'EO_API_KEY not found.';
}
const list_id = process.env['EO_LIST_ID'];
if (!list_id) {
	throw 'EO_LIST_ID not found.';
}
const querystring = new URLSearchParams({ api_key });

// All API functions return a Promise<Response>.

// https://emailoctopus.com/api-documentation/lists/create-contact
export function create_contact(prospect: Prospect) {
	const url = `${base}lists/${list_id}/contacts`;
	const payload = { api_key, ...prospect };
	return fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
}

// https://emailoctopus.com/api-documentation/lists/get
export function get_list() {
	const url = `${base}lists/${list_id}?${querystring}`;
	return fetch(url, { method: 'GET' });
}

// https://emailoctopus.com/api-documentation/lists/get-contact
export function get_contact(email_address: string) {
	// EO expects lower case email address to be hashed with MD5.
	const digest = createHash('md5').update(email_address.toLowerCase()).digest('hex');
	const url = `${base}lists/${list_id}/contacts/${digest}?${querystring}`;
	return fetch(url, { method: 'GET' });
}

// https://emailoctopus.com/api-documentation/lists/update-contact
export function update_contact(email_address: string) {
	// EO expects lower case email address to be hashed with MD5.
	const digest = createHash('md5').update(email_address.toLowerCase()).digest('hex');
	const url = `${base}lists/${list_id}/contacts/${digest}`;
	const payload = { api_key, status: 'UNSUBSCRIBED' };
	return fetch(url, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
}
