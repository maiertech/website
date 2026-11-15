import assert from 'node:assert/strict';
import http from 'node:http';
import { after, before, test } from 'node:test';
import { closeGracefully, createApp } from './app.js';

/** @type {http.RequestListener} */
const handler = (req, res) => {
	res.writeHead(200, { 'content-type': 'text/plain' });
	res.end(`handled ${req.url}`);
};

const server = createApp({ handler });

/** @type {number} */
let port;

before(async () => {
	port = await listen(server, '127.0.0.1');
});

after(
	() =>
		new Promise((resolve) => {
			server.close(() => resolve(undefined));
		})
);

/**
 * @param {http.Server} server
 * @param {string} host
 * @returns {Promise<number>}
 */
function listen(server, host) {
	return new Promise((resolve) => {
		server.listen(0, host, () => resolve(portOf(server)));
	});
}

/**
 * @param {http.Server} server
 * @returns {number}
 */
function portOf(server) {
	return /** @type {import('node:net').AddressInfo} */ (server.address()).port;
}

/**
 * @param {string} path
 * @param {string} host
 * @returns {Promise<{ status?: number, location?: string, body: string }>}
 */
function request(path, host) {
	return new Promise((resolve, reject) => {
		const req = http.request({ host: '127.0.0.1', port, path, headers: { host } }, (res) => {
			let body = '';
			res.setEncoding('utf8');
			res.on('data', (chunk) => (body += chunk));
			res.on('end', () =>
				resolve({ status: res.statusCode, location: res.headers.location, body })
			);
		});
		req.on('error', reject);
		req.end();
	});
}

test('redirects www.maier.tech to maier.tech with path and query preserved', async () => {
	const res = await request('/some/path?x=1', 'www.maier.tech');

	assert.equal(res.status, 301);
	assert.equal(res.location, 'https://maier.tech/some/path?x=1');
});

test('serves other hosts with the app handler', async () => {
	const res = await request('/some/path?x=1', 'maier.tech');

	assert.equal(res.status, 200);
	assert.equal(res.body, 'handled /some/path?x=1');
});

test('finishes active requests before closing on shutdown', async () => {
	/** @type {() => void} */
	let markStarted = () => {};
	const handlerStarted = new Promise((resolve) => {
		markStarted = () => resolve(undefined);
	});
	const slowServer = createApp({
		handler: (req, res) => {
			markStarted();
			setTimeout(() => {
				res.writeHead(200);
				res.end('done');
			}, 100);
		}
	});
	const slowPort = await listen(slowServer, '127.0.0.1');

	const active = new Promise((resolve, reject) => {
		const req = http.get({ host: '127.0.0.1', port: slowPort, path: '/' }, (res) => {
			let body = '';
			res.setEncoding('utf8');
			res.on('data', (chunk) => (body += chunk));
			res.on('end', () => resolve({ status: res.statusCode, body }));
		});
		req.on('error', reject);
	});

	await handlerStarted;
	await closeGracefully(slowServer, 5000);

	assert.deepEqual(await active, { status: 200, body: 'done' });
	assert.equal(slowServer.listening, false);
});
