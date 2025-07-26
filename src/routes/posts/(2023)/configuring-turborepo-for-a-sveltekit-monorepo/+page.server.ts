import { resolvePost } from '$lib/server/resolvers';
import type { PageServerLoad } from './$types';
import meta from './meta';

export const load: PageServerLoad = async (event) => {
	const post = await resolvePost({ postMeta: meta, event });
	const { title, description, ogImageUrl } = post;

	return { examples, post, seo: { title, description, ogImageUrl } };
};

const examples = {
	'file-tree.txt': `maier.tech
├── apps
│   └── website
└── packages
    └── ui`,
	'package.json': `{
	"private": true,
	"workspaces": [
		"apps/*",
		"packages/*"
	],
	"devDependencies": {
		"turbo": "^1.8.8"
	}
}`,
	'turbo.json': `{
	"$schema": "https://turbo.build/schema.json",
	"pipeline": {
		"build": {
			"dependsOn": ["^build"],
			"outputs": [".svelte-kit/**", ".vercel/**"]
		},
		"check": {},
		"lint": {},
		"dev": {
			"cache": false,
			"persistent": true
		}
	}
}`,
	'packages/ui/turbo.json': `{
	"extends": ["//"],
	"pipeline": {
		"build": {
			"outputs": ["dist/**", ".svelte-kit/**", ".vercel/**"]
		}
	}
}`,
	'apps/website/turbo.json': `// ...

"pipeline": {
  "dev": {
    "dependsOn": ["ui#watch"]
  }
}

// ...`,
	'apps/website/package.json': `{
  	// ...

  	"scripts": {
    	"dev": "npm run watch -w=ui & vite dev",

      // ...
    }

    // ...
  }`
};
