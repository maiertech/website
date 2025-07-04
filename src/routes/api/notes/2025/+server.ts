import noteAmIStillRelevantAsADeveloper from '$notes/(2025)/am-i-still-relevant-as-a-developer/meta';
import noteEnvVarsInCode from '$notes/(2025)/env-vars-in-vscode/meta';
import noteHowToWriteExceptionalDocs from '$notes/(2025)/how-to-write-exceptional-docs/meta';
import noteTheUmpteenthInterviewWithRichHarris from '$notes/(2025)/the-umpteenth-interview-with-rich-harris/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import noteHostingInEurope from '$notes/(2025)/hosting-in-europe-beyond-big-tech/meta';

export const prerender = true;

export const GET: RequestHandler = async () => {
	// Sort order: latest first.
	return json([
		noteHostingInEurope,
		noteAmIStillRelevantAsADeveloper,
		noteTheUmpteenthInterviewWithRichHarris,
		noteHowToWriteExceptionalDocs,
		noteEnvVarsInCode
	]);
};
