<script>
	import Image from '$lib/components/image.svelte';
	import Highlight, { HighlightSvelte } from 'svelte-highlight';
	import { javascript } from 'svelte-highlight/languages';

	export let data;
	const { examples } = data;
</script>

<p>
	SvelteKit introduced
	<a href="https://kit.svelte.dev/docs/types#generated-types">generated types</a> a while ago.
	SvelteKit would automatically generate types for <code>data</code> and <code>form</code> in +page.svelte/+layout.svelte
	files and load functions and request handlers in +page.js/+layout.js, +page.server.js/+layout.server.js
	and +server.js files. But you had to annotate the types yourself, which felt like a repetitive chore:
</p>

<figure>
	<Highlight language={javascript} code={examples['+page.js']} />
	<figcaption>JSDoc type annotation in +page.js.</figcaption>
</figure>

<figure>
	<HighlightSvelte code={examples['+page.svelte']} />
	<figcaption>Another JSDoc type annotation in +page.svelte.</figcaption>
</figure>

<p>
	Yesterday, the SvelteKit team went one step further and introduced zero-effort type safety for
	crucial parts of a SvelteKit app. This improvement makes manual annotations of generated types
	obsolete. You get type safety for data flowing through your SvelteKit app without TypeScript
	annotations. I removed a big chunk of my
	<a href="https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html">JSDoc</a>
	annotations from my website in
	<a href="https://github.com/maiertech/maier.tech/pull/660">this pull request</a> without losing
	any type safety. You can read more about zero-effort type safety in the
	<a href="https://svelte.dev/blog/zero-config-type-safety">announcement post</a>.
</p>

<p>
	Zero-effort type safety is a massive improvement for developer happiness. However, it would be
	best to put in additional effort to achieve complete type safety for your SvelteKit app. Besides
	data <em>flowing through</em> your SvelteKit app, you also need to keep an eye on all the points
	where data <em>enters</em> your SvelteKit app.
</p>

<h2>Validation with Zod</h2>

<p>There are three ways for data to enter your SvelteKit app:</p>

<ol>
	<li>
		By fetching data from the local file system, e.g., reading a Markdown file with a blog post or
		reading a JSON file with permitted tags.
	</li>
	<li>By fetching data from an external API, e.g., a headless CMS or a third-party API.</li>
	<li>By processing data submitted through a web form.</li>
</ol>

<p>
	All three scenarios have in common that type annotations of incoming data are moot when the data
	you get is not what you expected. What you need is proper validation.
</p>

<p>
	<a href="https://zod.dev/">Zod</a> is a schema validation library with first-class TypeScript support.
	The first thing to note is that most data coming into your app is structured, i.e., a combination of
	objects and arrays that contain strings. E.g., on my website, every post is in a Markdown file. Its
	frontmatter has a structure that can be described with a Zod schema:
</p>

<figure>
	<Highlight language={javascript} code={examples['src/lib/schemas/post-schema.js']} />
	<figcaption>src/lib/schemas/post-schema.js</figcaption>
</figure>

<p>
	Every property is required by default, and you can nest schemes and add additional constraints.
	E.g., <code>z.array(z.string()).optional()</code> means that the schema expects an optional array of
	strings.
</p>

<p>
	Once you have a schema, you can validate incoming data against it. In this example, I validate the
	frontmatter of a post against the Zod schema in a helper function:
</p>

<figure>
	<Highlight language={javascript} code={examples['src/lib/posts.js']} />
	<figcaption>Frontmatter validation in src/lib/posts.js.</figcaption>
</figure>

<p>
	Nothing spectacular except that <code>frontmatter</code>, which is the validated data, is now
	typed:
</p>

<figure>
	<Image
		ratio={1304 / 597}
		alt="Screenshot of the code snippet from above in Visual Studio Code. The mouse hovers over `frontmatter.title`, and a pop-up shows the type `string` and the description from the `PostSchema` Zod schema."
		url="https://share.mailbox.org/ajax/share/0fc919770d43c502f4ad61cd43c54b6eba59b989df892f93/1/8/MjQ0/MjQ0LzM2MA?dl=true"
		loading="lazy"
	/>
	<figcaption>Zod infers the type of validated data from the schema.</figcaption>
</figure>

<p>
	Not only does Zod validate the data, but it also types it and gives you full type safety for
	whatever you do with the validated data.
</p>

<h2>Validating and typing data from an API with Zod</h2>

<p>
	To drive this point home, let's look at another example in a
	<a href="https://kit.svelte.dev/docs/form-actions">form action</a>:
</p>

<figure>
	<Highlight language={javascript} code={examples['+page.server.js']} />
	<figcaption>Validating data retrieved from an API in +page.server.js.</figcaption>
</figure>

<p>
	This form action handles data from a newsletter subscription form. At this point in the handler, I
	know that the subscriber already exists, and I try to look up their status with API helper
	<code>get_subscriber</code>. I validate the API response against Zod schema
	<code>EOSubscriberSchema</code>.
</p>

<p>
	If the validation fails, the external API did not return subscriber info in the expected format,
	and I throw a server error. If the validation succeeds, the <code>subscriber</code> variable is typed:
</p>

<figure>
	<Image
		ratio={1225 / 799}
		alt="Screenshot of the code snippet from above in Visual Studio Code. The mouse hovers over the validated `subscriber` variable, and a pop-up shows the object type inferred from the `EOSubscriber` Zod schema."
		url="https://share.mailbox.org/ajax/share/0cb3999b00493501c3056f0049354b9bad6086629024f883/1/8/MjQ0/MjQ0LzM2MQ?dl=true"
		loading="lazy"
	/>
	<figcaption>
		The <code>subscriber</code> variable is validated and typed, thanks to Zod's type inference.
	</figcaption>
</figure>

<h2>Conclusion</h2>

<p>
	SvelteKit's zero-effort types provide type safety when data <em>flows through</em> your app. You
	should complement zero-effort type safety with Zod schemas and validate data whenever it
	<em>enters</em> your app. Zod's type inference gives you complete type safety for validated data.
</p>
