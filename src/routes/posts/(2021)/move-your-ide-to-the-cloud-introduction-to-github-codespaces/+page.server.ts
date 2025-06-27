import type { PageServerLoad } from './$types';
import { transformPostWithLastmodDate } from '$lib/server/transformations';
import meta from './meta';

export const load: PageServerLoad = async (event) => {
	const post = await transformPostWithLastmodDate(meta, event);

	return { examples, post };
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
