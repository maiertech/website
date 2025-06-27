import type { PageServerLoad } from './$types';
import { transformPostWithLastmodDate } from '$lib/server/transformations';
import meta from './meta';

export const load: PageServerLoad = async (event) => {
	const post = await transformPostWithLastmodDate(meta, event);

	return { examples, post };
};

const examples = {
	'+page.js': `/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  // \`fetch\` and \`params\` are typed.
}`,
	'+page.svelte': `<script>
  /** @type {import('./$types').PageData} */
  export let data;

  // \`title\`, \`description\`, and \`topic\` are typed:
  const { title, description, topics } = data;

  //...
</script>`,
	'src/lib/schemas/post-schema.js': `import { z } from 'zod';

export default z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
  published: z.string().datetime(),
  topics: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});`,
	'src/lib/posts.js': `const result = PostSchema.safeParse(post.metadata);

if (!result.success) {
  throw new Error(\`Frontmatter of file \${path} failed validation.\`);
}

const frontmatter = result.data;
const slug = slugify(frontmatter.title);`,
	'+page.server.js': `const res = await get_subscriber(validated_data.email_address);

if (!res.ok) {
  throw error(500, 'Subscription failed.');
}

// Validate subscriber.
const result = EOSubscriberSchema.safeParse(await res.json());

if (!result.success) {
  throw error(500, 'Subscription failed.');
}

const subscriber = result.data;`
};
