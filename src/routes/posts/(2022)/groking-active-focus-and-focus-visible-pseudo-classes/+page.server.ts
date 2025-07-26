import { resolvePost } from '$lib/server/resolvers';
import type { StackBlitzExample } from '$lib/types';
import type { PageServerLoad } from './$types';
import meta from './meta';

export const load: PageServerLoad = async (event) => {
	const post = await resolvePost({ postMeta: meta, event });
	const { title, description, ogImageUrl } = post;

	return { example, post, seo: { title, description, ogImageUrl } };
};

const example: StackBlitzExample = {
	project: {
		template: 'javascript',
		title: 'Code example',
		description: 'Groking :active, :focus and :focus-visible pseudo-classes.',
		files: {
			'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Code example</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
  </head>
  <body>
    <h2>Pseudo-class :active example</h2>

    <div class="active-example">
	    <label for="name-active-example">Name</label>
	    <input id="name-active-example" type="text" />
	    <button>Submit</button>
    </div>

    <h2>Pseudo-class :focus example</h2>

    <div class="focus-example">
	    <label for="name-focus-example">Name</label>
	    <input id="name-focus-example" type="text" />
	    <button>Submit</button>
    </div>

    <h2>Pseudo-class :focus-visible example</h2>

    <div class="focus-visible-example">
	    <label for="name-focus-visible-example">Name</label>
	    <input id="name-focus-visible-example" type="text" />
	    <button>Submit</button>
    </div>
  </body>
</html>`,
			'index.js': `import './styles.css';`,
			'styles.css': `:root {
	--style: dashed;
	--color: red;
	--offset: 1px;
}

.active-example input:active,
.active-example button:active {
	outline: var(--style) var(--color);
	outline-offset: var(--offset);
}

.focus-example input:focus,
.focus-example button:focus {
	outline: var(--style) var(--color);
	outline-offset: var(--offset);
}

.focus-visible-example input:focus-visible,
.focus-visible-example button:focus-visible {
	outline: var(--style) var(--color);
	outline-offset: var(--offset);
}`
		}
	},
	options: { view: 'preview' }
};
