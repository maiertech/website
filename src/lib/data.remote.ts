import { query } from '$app/server';
import { env } from '$env/dynamic/private';

export const getCommitHash = query(async () => {
	return env.RAILWAY_GIT_COMMIT_SHA;
});
