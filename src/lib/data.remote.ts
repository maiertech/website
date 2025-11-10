import { query } from '$app/server';
import { GIT_COMMIT_SHA } from '$env/static/private';

export const getCommitHash = query(async () => {
	return GIT_COMMIT_SHA;
});
