<script lang="ts">
	import { Code, CodeSnippet, Figure, H2, H3, P, Ul } from '@maiertech/sveltekit-helpers';
</script>

<P>
	<strong>
		This post is obsolete. To get started with SvelteKit, go to the
		<a href="https://svelte.dev/docs/kit/creating-a-project">SvelteKit docs</a>.
	</strong>
</P>

<P>
	In August 2022, the SvelteKit team led by
	<a href="https://twitter.com/rich_harris">Rich Harris</a> released several refactorings in
	preparation for the release of SvelteKit 1.0. The most significant changes were a complete
	overhaul of SvelteKit's
	<a href="https://github.com/sveltejs/kit/discussions/5748">router and load API</a>, and this
	redesign resulted in several breaking changes.
</P>

<H2>Why breaking changes?</H2>

<P>
	SvelteKit follows <a href="https://semver.org/">semantic versioning</a>, and the
	<a href="https://semver.org/#semantic-versioning-specification-semver">specification</a> states that
</P>

<blockquote class="mb-6">
	<ol start="4">
		<li>
			Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The
			public API SHOULD NOT be considered stable.
		</li>
	</ol>
</blockquote>

<P>
	While SvelteKit is pre-1.0, any release can include breaking changes. Despite this caveat,
	SvelteKit was widely adopted and used in production. Breaking changes happened occasionally, but
	they were rare. Consequently, the wider Svelte community (myself included) assumed that SvelteKit
	was ready for production. After a summer of breaking changes, I realized that considering
	SvelteKit stable enough for production was premature.
</P>

<P>
	Now that many developers run SvelteKit in production, what is the best way to deal with all the
	breaking changes?
</P>

<H2>Upgrading to recent SvelteKit versions with breaking changes</H2>

<P>
	If you have a SvelteKit app in production that you have not upgraded in a while, you should not
	try to upgrade straight to the latest version. Here are some milestone releases that you can use
	for your upgrade path:
</P>

<H3>SvelteKit 1.0.0-next.377</H3>

<P>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next377">
		1.0.0-next.377
	</a>
	includes a breaking change in which you need to uppercase endpoint methods.
</P>

<H3>SvelteKit 1.0.0-next.405</H3>

<P>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next405">
		1.0.0-next.405
	</a>
	is the last version before the overhaul of SvelteKit's router. Make sure your site runs without issues
	with this version.
</P>

<H3>SvelteKit 1.0.0-next.414</H3>

<P>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next414">
		1.0.0-next.414
	</a>
	is the last version before another significant breaking change. Now it's time to read up on the changes
	released in
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next406">
		1.0.0-next.406
	</a>. Read one of these two posts:
</P>

<Ul>
	<li>
		Josh Collinsworth: <a href="https://joshcollinsworth.com/blog/sveltekit-breaking-changes">
			Breaking changes in SvelteKit
		</a>.
	</li>
	<li>
		Brittney Postma: <a
			href="https://www.netlify.com/blog/migrating-breaking-changes-in-sveltekit/"
		>
			Migrating Breaking Changes in SvelteKit
		</a>.
	</li>
</Ul>

<P>
	Then read the <a href="https://github.com/sveltejs/kit/discussions/5774#discussion-4267008">
		first comment in Rich Harris's migration guide
	</a> and run the migration script:
</P>

<Figure class="mb-6">
	<CodeSnippet lang="bash" src="npx svelte-migrate routes" />
</Figure>

<P>
	This script is magic. It handles all the renaming of files and leaves <Code>@migration</Code>
	comments with links to the other comments in the
	<a href="https://github.com/sveltejs/kit/discussions/5774">migration guide</a>. You should review
	all migration comments and review all proposed changes. Depending on the size of your site, this
	can take a couple of hours.
</P>

<H3>SvelteKit 1.0.0-next.415</H3>

<P>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next432">
		1.0.0-next.415
	</a>
	removes the session object. You can skip this version if you do not use the session object. If you
	use the session object, you need to read
	<a href="https://github.com/sveltejs/kit/discussions/5883">
		this discussion on why it has been removed and how to replace it
	</a>. This is a non-trivial upgrade.
</P>

<H3>SvelteKit 1.0.0-next.432</H3>

<P>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next432">
		1.0.0-next.432
	</a>
	removes named layouts in favor of
	<a href="https://kit.svelte.dev/docs/advanced-routing#advanced-layouts">groups</a>. Check out
	<a href="https://github.com/sveltejs/kit/pull/6174">this migration guide</a>. If you do not use
	named layouts, skip to the next version.
</P>

<H3>SvelteKit 1.0.0-next.455</H3>

<P>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next450">
		1.0.0-next.450
	</a>
	requires an upgrade of Vite in <Code>package.json</Code>:
</P>

<Figure class="mb-6">
	<!-- eslint-disable-next-line svelte/no-useless-mustaches -->
	<CodeSnippet lang="json" src={'"vite": "^3.1.0-beta.1"'} />
</Figure>

<P>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next455"
		>1.0.0-next.455</a
	>
	overhauls prerendering. Read the docs on
	<a href="https://kit.svelte.dev/docs/page-options">page options</a> to find out what has changed.
</P>

<H3>SvelteKit 1.0.0-next.463</H3>

<P>
	Last but not least,
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next463">
		1.0.0-next.463
	</a>
	fixes a peer dependency warning introduced with Vite 3.1.0-beta.1.
</P>

<H2>Conclusion</H2>

<P>
	Fixing all recent breaking changes looks like a daunting task, and it probably is if you have a
	large website. If you have a SvelteKit app in production, there is not much you can do other than
	upgrade to the new versions as they are released.
</P>

<P>
	This post demonstrates that you do not have to upgrade to every new release, and you can skip
	upgrades when they contain only patch changes. But the longer you wait, the more breaking changes
	will accumulate, and the more complex upgrading will be.
</P>

<P>
	How many more breaking changes will there be? I don't know. But I hope the SvelteKit team is on
	the home stretch towards 1.0.
</P>
