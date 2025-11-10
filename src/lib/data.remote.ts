import { prerender } from '$app/server';
import { RAILWAY_GIT_COMMIT_SHA } from '$env/static/private';

export const getCommitHash = prerender(async () => {
	return RAILWAY_GIT_COMMIT_SHA;
});
