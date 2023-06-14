/** @type {import('./$types').PageLoad} */
export function load() {
	return { examples };
}

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
