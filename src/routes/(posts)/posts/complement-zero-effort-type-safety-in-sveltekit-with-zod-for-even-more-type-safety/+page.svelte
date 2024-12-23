<script lang="ts">
	import {
		Figure,
		Image,
		Shiki,
		code as Code,
		h2 as H2,
		ol as Ol,
		p as P
	} from '@maiertech/sveltekit-helpers';
	import zod_type_inference_example_1_origin_image from './zod-type-inference-example-1.png';
	import zod_type_inference_example_2_origin_image from './zod-type-inference-example-2.png';

	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<P>
	SvelteKit introduced
	<a href="https://kit.svelte.dev/docs/types#generated-types">generated types</a> a while ago.
	SvelteKit would automatically generate types for <Code>data</Code> and <Code>form</Code> in +page.svelte/+layout.svelte
	files and load functions and request handlers in +page.js/+layout.js, +page.server.js/+layout.server.js
	and +server.js files. But you had to annotate the types yourself, which felt like a repetitive chore:
</P>

<Figure caption="JSDoc type annotation in +page.js." class="mb-6">
	<Shiki lang="javascript" code={data.examples['+page.js']} />
</Figure>

<Figure caption="Another JSDoc type annotation in +page.svelte." class="mb-6">
	<Shiki lang="svelte" code={data.examples['+page.svelte']} />
</Figure>

<P>
	Yesterday, the SvelteKit team went one step further and introduced zero-effort type safety for
	crucial parts of a SvelteKit app. This improvement makes manual annotations of generated types
	obsolete. You get type safety for data flowing through your SvelteKit app without TypeScript
	annotations. I removed a big chunk of my
	<a href="https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html">JSDoc</a>
	annotations from my website in
	<a href="https://github.com/maiertech/maier.tech/pull/660">this pull request</a> without losing
	any type safety. You can read more about zero-effort type safety in the
	<a href="https://svelte.dev/blog/zero-config-type-safety">announcement post</a>.
</P>

<P>
	Zero-effort type safety is a massive improvement for developer happiness. However, it would be
	best to put in additional effort to achieve complete type safety for your SvelteKit app. Besides
	data <em>flowing through</em> your SvelteKit app, you also need to keep an eye on all the points
	where data <em>enters</em> your SvelteKit app.
</P>

<H2>Validation with Zod</H2>

<P>There are three ways for data to enter your SvelteKit app:</P>

<Ol>
	<li>
		By fetching data from the local file system, e.g., reading a Markdown file with a blog post or
		reading a JSON file with permitted tags.
	</li>
	<li>By fetching data from an external API, e.g., a headless CMS or a third-party API.</li>
	<li>By processing data submitted through a web form.</li>
</Ol>

<P>
	All three scenarios have in common that type annotations of incoming data are moot when the data
	you get is not what you expected. What you need is proper validation.
</P>

<P>
	<a href="https://zod.dev/">Zod</a> is a schema validation library with first-class TypeScript support.
	The first thing to note is that most data coming into your app is structured, i.e., a combination of
	objects and arrays that contain strings. E.g., on my website, every post is in a Markdown file. Its
	frontmatter has a structure that can be described with a Zod schema:
</P>

<Figure caption="src/lib/schemas/post-schema.js" class="mb-6">
	<Shiki lang="javascript" code={data.examples['src/lib/schemas/post-schema.js']} />
</Figure>

<P>
	Every property is required by default, and you can nest schemes and add additional constraints.
	E.g., <Code>z.array(z.string()).optional()</Code> means that the schema expects an optional array of
	strings.
</P>

<P>
	Once you have a schema, you can validate incoming data against it. In this example, I validate the
	frontmatter of a post against the Zod schema in a helper function:
</P>

<Figure caption="Frontmatter validation in src/lib/posts.js." class="mb-6">
	<Shiki lang="javascript" code={data.examples['src/lib/posts.js']} />
</Figure>

<P>
	Nothing spectacular except that <Code>frontmatter</Code>, which is the validated data, is now
	typed:
</P>

<Figure caption="Zod infers the type of validated data from the schema." class="mb-6">
	<Image
		src={zod_type_inference_example_1_origin_image}
		alt="Screenshot of the code snippet from above in Visual Studio Code. The mouse hovers over `frontmatter.title`, and a pop-up shows the type `string` and the description from the `PostSchema` Zod schema."
	/>
</Figure>

<P>
	Not only does Zod validate the data, but it also types it and gives you full type safety for
	whatever you do with the validated data.
</P>

<H2>Validating and typing data from an API with Zod</H2>

<P>
	To drive this point home, let's look at another example in a
	<a href="https://kit.svelte.dev/docs/form-actions">form action</a>:
</P>

<Figure caption="Validating data retrieved from an API in +page.server.js." class="mb-6">
	<Shiki lang="javascript" code={data.examples['+page.server.js']} />
</Figure>

<P>
	This form action handles data from a newsletter subscription form. At this point in the handler, I
	know that the subscriber already exists, and I try to look up their status with API helper
	<Code>get_subscriber</Code>. I validate the API response against Zod schema
	<Code>EOSubscriberSchema</Code>.
</P>

<P>
	If the validation fails, the external API did not return subscriber info in the expected format,
	and I throw a server error. If the validation succeeds, the <Code>subscriber</Code> variable is typed:
</P>

<Figure
	caption="The subscriber variable is validated and typed, thanks to Zod's type inference."
	class="mb-6"
>
	<Image
		src={zod_type_inference_example_2_origin_image}
		alt="Screenshot of the code snippet from above in Visual Studio Code. The mouse hovers over the validated `subscriber` variable, and a pop-up shows the object type inferred from the `EOSubscriber` Zod schema."
	/>
</Figure>

<H2>Conclusion</H2>

<P>
	SvelteKit's zero-effort types provide type safety when data <em>flows through</em> your app. You
	should complement zero-effort type safety with Zod schemas and validate data whenever it
	<em>enters</em> your app. Zod's type inference gives you complete type safety for validated data.
</P>
