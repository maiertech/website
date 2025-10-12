import { resolveNote } from '$lib/server/resolvers';
import noteAmIStillRelevantAsADeveloper from '$notes/(2025)/am-i-still-relevant-as-a-developer/meta';
import noteDisallowingAiBotsInRobotsTxt from '$notes/(2025)/disallowing-ai-bots-in-robots-txt/meta';
import noteEnvVarsInCode from '$notes/(2025)/env-vars-in-vscode/meta';
import noteEslintPluginSvelteMakesSveltekitLinterFail from '$notes/(2025)/eslint-plugin-svelte-makes-sveltekit-linter-fail/meta';
import noteHostingInEurope from '$notes/(2025)/hosting-in-europe-beyond-big-tech/meta';
import noteHowToWriteExceptionalDocs from '$notes/(2025)/how-to-write-exceptional-docs/meta';
import notePenpotsMissingSvgTextToPathFeature from '$notes/(2025)/penpots-missing-svg-text-to-path-feature/meta';
import notePerplexityAiCaughtInTheAct from '$notes/(2025)/perplexity-ai-caught-in-the-act/meta';
import notePrerenderingServerRoutes from '$notes/(2025)/prerendering-server-routes-in-sveltekit/meta';
import noteTheUmpteenthInterviewWithRichHarris from '$notes/(2025)/the-umpteenth-interview-with-rich-harris/meta';
import noteUsingGitHubCopilotInTheTerminal from '$notes/(2025)/using-github-copilot-in-the-terminal/meta';
import noteVercelProtectionBypass from '$notes/(2025)/vercel-deployment-protection-bypass/meta';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	// Sort order: latest first.
	const notes = [
		noteEslintPluginSvelteMakesSveltekitLinterFail,
		noteVercelProtectionBypass,
		noteUsingGitHubCopilotInTheTerminal,
		notePerplexityAiCaughtInTheAct,
		noteDisallowingAiBotsInRobotsTxt,
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
