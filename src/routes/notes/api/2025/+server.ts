import { json } from '@sveltejs/kit';
import noteEnvVarsInCode from '../../(2025)/env-vars-in-vscode/meta.json';
import noteHowToWriteExceptionalDocs from '../../(2025)/how-to-write-exceptional-docs/meta.json';
import type { RequestHandler } from './$types';
import noteTheUmpteenthInterviewWithRichHarris from '../../(2025)/the-umpteenth-interview-with-rich-harris/meta.json';

export const prerender = true;

export const GET: RequestHandler = async () => {
	// Sort order: latest first.
	return json([
		noteTheUmpteenthInterviewWithRichHarris,
		noteHowToWriteExceptionalDocs,
		noteEnvVarsInCode
	]);
};
