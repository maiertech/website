import { handler } from './build/handler.js';
import { closeGracefully, createApp } from './server/app.js';

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '0.0.0.0';
const shutdownTimeoutMs = 30_000;

const adapterNodeSettings = [
	'SOCKET_PATH',
	'LISTEN_PID',
	'LISTEN_FDS',
	'SHUTDOWN_TIMEOUT',
	'IDLE_TIMEOUT',
	'KEEP_ALIVE_TIMEOUT',
	'HEADERS_TIMEOUT'
];
const ignoredSettings = adapterNodeSettings.filter((name) => process.env[name] !== undefined);
if (ignoredSettings.length > 0) {
	console.warn(`Ignoring adapter-node settings: ${ignoredSettings.join(', ')}`);
}

const server = createApp({
	handler: (req, res) =>
		handler(req, res, () => {
			res.statusCode = 404;
			res.end();
		})
});

server.listen(port, host, () => {
	console.log(`Listening on http://${host}:${port}`);
});

async function shutdown() {
	await closeGracefully(server, shutdownTimeoutMs);
	process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
