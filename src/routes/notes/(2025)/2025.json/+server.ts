import { json } from '@sveltejs/kit';
import envVarsInCode from '../env-vars-in-vscode/meta.json';
import howToWriteExceptionalDocs from '../how-to-write-exceptional-docs/meta.json';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	// Sort order: latest first.
	return json([howToWriteExceptionalDocs, envVarsInCode]);
};
