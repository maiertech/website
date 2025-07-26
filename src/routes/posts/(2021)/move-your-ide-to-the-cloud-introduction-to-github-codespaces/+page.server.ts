import { resolvePost } from '$lib/server/resolvers';
import type { PageServerLoad } from './$types';
import meta from './meta';

export const load: PageServerLoad = async (event) => {
	const post = await resolvePost({ postMeta: meta, event });
	const { title, description, ogImageUrl } = post;

	return { examples, post, seo: { title, description, ogImageUrl } };
};

const examples = {
	'devcontainer.json': `{
	"name": "javascript-node",
	"image": "mcr.microsoft.com/vscode/devcontainers/javascript-node:18",
	"customizations": {
		"vscode": {
			"extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
		}
	},
	"forwardPorts": [3000],
	"postCreateCommand": "npm i",
	"remoteUser": "node"
}`
};
