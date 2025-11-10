import { query } from '$app/server';
import { env } from '$env/dynamic/private';

export const getCommitHash = query(async () => {
	return env.GIT_COMMIT_SHA;
});
