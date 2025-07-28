import { resolveNote } from '$lib/server/resolvers';
import noteAmIStillRelevantAsADeveloper from '$notes/(2025)/am-i-still-relevant-as-a-developer/meta';
import noteEnvVarsInCode from '$notes/(2025)/env-vars-in-vscode/meta';
import noteHostingInEurope from '$notes/(2025)/hosting-in-europe-beyond-big-tech/meta';
import noteHowToWriteExceptionalDocs from '$notes/(2025)/how-to-write-exceptional-docs/meta';
import notePenpotsMissingSvgTextToPathFeature from '$notes/(2025)/penpots-missing-svg-text-to-path-feature/meta';
import notePrerenderingServerRoutes from '$notes/(2025)/prerendering-server-routes-in-sveltekit/meta';
import noteTheUmpteenthInterviewWithRichHarris from '$notes/(2025)/the-umpteenth-interview-with-rich-harris/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Needs to be set explicitly because we prerender endpoint `/sitemap.xml`.
export const prerender = true;

export const GET: RequestHandler = async () => {
	// Sort order: latest first.
	const notes = [
		notePenpotsMissingSvgTextToPathFeature,
		notePrerenderingServerRoutes,
		noteHostingInEurope,
		noteAmIStillRelevantAsADeveloper,
		noteTheUmpteenthInterviewWithRichHarris,
		noteHowToWriteExceptionalDocs,
		noteEnvVarsInCode
	];

	const resolvedNotes = await Promise.all(
		notes.map((note) => {
			return resolveNote(note);
		})
	);

	return json(resolvedNotes);
};
