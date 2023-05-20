import { PUBLIC_CANONICAL_ORIGIN } from '$env/static/public';

export function load() {
	return {
		canonical_origin: PUBLIC_CANONICAL_ORIGIN
	};
}
