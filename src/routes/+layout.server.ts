import { RAILWAY_GIT_COMMIT_SHA } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return {
		commitHash: RAILWAY_GIT_COMMIT_SHA
	};
};
