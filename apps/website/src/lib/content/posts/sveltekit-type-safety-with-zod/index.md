---
title: Complement zero-effort type safety in SvelteKit with Zod for even more type safety
author: thilo
published: 2023-03-10
modified: 2023-03-10
description: Zero-effort type safety in SvelteKit gives you type safety for data that flows through your app. This post shows you how to complement zero-effort type safety with Zod schemas to validate and type incoming data in a SvelteKit app.
topics: [svelte]
tags: [sveltekit, typescript]
---

<script>
  import Image from '$lib/components/image.svelte';
</script>

SvelteKit introduced [generated types](https://kit.svelte.dev/docs/types#generated-types) a while ago. SvelteKit would automatically generate types for `data` and `form` in `+page.svelte`/`+layout.svelte` files and load functions and request handlers in `+page.js`/`layout.js`, `+page.server.js`/`+layout.server.js` and `+server.js` files. But you had to annotate the types yourself, which felt like a repetitive chore:

```js:+page.js
// You had to add type annotations like this (JSDoc):

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  // fetch and params are typed.
}

// ...
```

```js:+page.svelte
<script>
// Another type annotation in the page:

/** @type {import('./$types').PageData} */
export let data;
// title, description, and topics are typed:
const { title, description, topics } = data;

// ...
</script>
```

Yesterday, the SvelteKit team went one step further and introduced zero-effort type safety for crucial parts of a SvelteKit app. This improvement makes manual annotations of generated types obsolete. You get type safety for data flowing through your SvelteKit app without TypeScript annotations. I removed a big chunk of my [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) annotations from my website in [this pull request](https://github.com/maiertech/maier.tech/pull/660) without losing any type safety. You can read more about zero-effort type safety in the [announcement post](https://svelte.dev/blog/zero-config-type-safety).

Zero-effort type safety is a massive improvement for developer happiness. However, it would be best to put in additional effort to achieve complete type safety for your SvelteKit app. Besides data _flowing through_ your SvelteKit app, you also need to keep an eye on all the points where data _enters_ your SvelteKit app.

## Validation with Zod

There are three ways for data to enter your SvelteKit app:

1. By fetching data from the local file system, e.g., reading a Markdown file with a blog post or reading a JSON file with permitted tags.
1. By fetching data from an external API, e.g., a headless CMS or a third-party API.
1. By processing data submitted through a web form.

All three scenarios have in common that type annotations of incoming data are moot when the data you get is not what you expected. What you need is proper validation.

[Zod](https://zod.dev/) is a schema validation library with first-class TypeScript support. The first thing to note is that most data coming into your app is structured, i.e., a combination of objects and arrays that contain strings. E.g., on my website, every post is in a Markdown file. Its frontmatter has a structure that can be described with a Zod schema:

```js:src/lib/schemas.js
import { z } from 'zod';

// ...

export const PostSchema = z.object({
  /** Page and SEO title. */
  title: z.string(),
  author: z.string(),
  description: z.string(),
  published: z.string().datetime(),
  topics: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

// ...
```

Every property is required by default, and you can nest schemes and add additional constraints. E.g., `z.array(z.string()).optional()` means that the schema expects an optional array of strings.

Once you have a schema, you can validate incoming data against it. In this example, I validate the frontmatter of a post against the Zod schema in a helper function:

```js:src/lib/posts.js
// Validate frontmatter.
const result = PostSchema.safeParse(post.metadata);

if (!result.success) {
  throw new Error(`Frontmatter of file ${path} failed validation.`);
}

const frontmatter = result.data;

const slug = slugify(frontmatter.title);
```

Nothing spectacular except that `frontmatter`, which is the validated data, is typed:

<figure>
<Image
  ratio={1304/597}
  alt="Screenshot of the code snippet from above in Visual Studio Code. The mouse hovers over `frontmatter.title`, and a pop-up shows the type `string` and the description from the `PostSchema` Zod schema."
  url="https://share.mailbox.org/ajax/share/0fc919770d43c502f4ad61cd43c54b6eba59b989df892f93/1/8/MjQ0/MjQ0LzM2MA?dl=true"
  loading="lazy" />
<figcaption>Zod infers the type of validated data from the schema.</figcaption>
</figure>

Not only does Zod validate the data, but it also types it and gives you full type safety for whatever you do with the validated data.

## Validating and typing data from an API with Zod

To drive this point home, let's look at another example in a [form action](https://kit.svelte.dev/docs/form-actions):

```js:+page.server.js
const res = await getSubscriber(validated_data.email_address);

if (!res.ok) {
  throw error(500, 'Subscription failed.');
}

// Validate subscriber.
const result = EOSubscriber.safeParse(await res.json());

if (!result.success) {
  throw error(500, 'Subscription failed.');
}

const subscriber = result.data;
```

This form action handles data from a newsletter subscription form. At this point in the handler, I know that the subscriber already exists, and I try to look up their status with API helper `getSubscriber`. I validate the API response against Zod schema `EOSubscriber`.

If the validation fails, the external API does not return subscriber info in the expected format, and I throw a server error. If the validation succeeds, the `subscriber` variable is typed:

<figure>
<Image
  ratio={1225/799}
  alt="Screenshot of the code snippet from above in Visual Studio Code. The mouse hovers over the validated `subscriber` variable, and a pop-up shows the object type inferred from the `EOSubscriber` Zod schema."
  url="https://share.mailbox.org/ajax/share/0cb3999b00493501c3056f0049354b9bad6086629024f883/1/8/MjQ0/MjQ0LzM2MQ?dl=true"
  loading="lazy" />
<figcaption>

The `subscriber` variable is validated and typed, thanks to Zod's type inference.

</figcaption>
</figure>

## Conclusion

SvelteKit's zero-effort types provide type safety when data _flows through_ your app. You should complement zero-effort type safety with Zod schemas and validate data whenever it _enters_ your app. Zod's type inference gives you complete type safety for validated data.
