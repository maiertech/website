/** @type {import('./$types').PageLoad} */
export function load() {
	return { examples };
}

const examples = {
	'.gitpod.yml-github': `# ...

github:
  prebuilds:
    master: true
    branches: true
    pullRequests: true
    pullRequestsFromForks: false
    addCheck: prevent-merge-on-error
    addComment: false
    addBadge: false

# ...`,
	'.gitpod.yml-tasks': `# ...

tasks:
  - name: Run dev server
    init: npm install
    command: npm run dev

# ...`,
	'.gitpod.yml-ports': `# ...

ports:
  - port: 5173
    visibility: public

# ...`,
	'.gitpod.yml-custom-image': `image: gitpod/workspace-node-lts

# ...`,
	'.gitpod.yml-customized-image': `image:
  file: .gitpod.Dockerfile

# ...`,
	'.gitpod.Dockerfile': `FROM gitpod/workspace-node-lts

RUN npm i -g turbo`,
	'.gitpod.yml-vscode-extensions': `# ...

vscode:
  extensions:
    - bradlc.vscode-tailwindcss
    - dbaeumer.vscode-eslint
    - esbenp.prettier-vscode
    - svelte.svelte-vscode

# ...`
};
