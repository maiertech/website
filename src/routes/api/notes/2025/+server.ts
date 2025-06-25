import noteEnvVarsInCode from '$notes/(2025)/env-vars-in-vscode/meta.json';
import noteHowToWriteExceptionalDocs from '$notes/(2025)/how-to-write-exceptional-docs/meta.json';
import noteTheUmpteenthInterviewWithRichHarris from '$notes/(2025)/the-umpteenth-interview-with-rich-harris/meta.json';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	// Sort order: latest first.
	return json([
		noteTheUmpteenthInterviewWithRichHarris,
		noteHowToWriteExceptionalDocs,
		noteEnvVarsInCode
	]);
};
