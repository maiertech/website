import http from 'node:http';

const WWW_HOST = 'www.maier.tech';
const CANONICAL_ORIGIN = 'https://maier.tech';

/**
 * @param {{ handler: http.RequestListener }} options
 * @returns {http.Server}
 */
export function createApp({ handler }) {
	const server = http.createServer((req, res) => {
		// Keep-alive sockets of requests that were in flight at shutdown would hold the server open.
		res.on('finish', () => {
			if (!server.listening) server.closeIdleConnections();
		});

		const host = req.headers.host?.toLowerCase().replace(/:\d+$/, '');
		if (host === WWW_HOST) {
			const target = new URL(req.url ?? '/', CANONICAL_ORIGIN);
			res.writeHead(301, { location: CANONICAL_ORIGIN + target.pathname + target.search });
			res.end();
			return;
		}
		handler(req, res);
	});
	return server;
}

/**
 * @param {http.Server} server
 * @param {number} timeoutMs
 * @returns {Promise<void>}
 */
export function closeGracefully(server, timeoutMs) {
	return new Promise((resolve) => {
		const timer = setTimeout(() => server.closeAllConnections(), timeoutMs);
		server.close(() => {
			clearTimeout(timer);
			resolve();
		});
		server.closeIdleConnections();
	});
}
