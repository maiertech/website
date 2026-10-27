import { NODION_GIT_SHA } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return {
		commitHash: NODION_GIT_SHA
	};
};
