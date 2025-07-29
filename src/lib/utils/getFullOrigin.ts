import { dev } from '$app/environment';

/**
 * Get the full origin URL including the protocol.
 * Use http:// in development and https:// otherwise.
 */
export default function getFullOrigin(vercelUrl: string): string {
	const protocol = dev ? 'http://' : 'https://';
	return `${protocol}${vercelUrl}`;
}
