<script lang="ts">
	import { Tweet } from 'sveltekit-embed';
	import Highlight from 'svelte-highlight';
	import { bash, json } from 'svelte-highlight/languages';
</script>

<p>
	<strong>
		<a href="https://svelte.dev/blog/announcing-sveltekit-1.0"
			>SvelteKit 1.0 has been released on 14 Dec 2022.</a
		> Start new SvelteKit projects with the latest stable version 1.x.
	</strong>
</p>

<p>
	In August 2022, the SvelteKit team around
	<a href="https://twitter.com/rich_harris">Rich Harris</a> released several refactorings in
	preparation for the release of SvelteKit 1.0. The most significant changes were a complete
	overhaul of SvelteKit's
	<a href="https://github.com/sveltejs/kit/discussions/5748">router and load API</a>, and this
	redesign resulted in several breaking changes.
</p>

<h2>Why breaking changes?</h2>

<p>
	SvelteKit follows <a href="https://semver.org/">semantic versioning</a>, and the
	<a href="https://semver.org/#semantic-versioning-specification-semver">specification</a> states that
</p>

<blockquote>
	<ol start="4">
		<li>
			Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The
			public API SHOULD NOT be considered stable.
		</li>
	</ol>
</blockquote>

<p>
	While SvelteKit is pre-1.0, any release can include breaking changes. Despite this caveat,
	SvelteKit was widely adopted and used in production. Breaking changes happened occasionally, but
	they were rare:
</p>

<Tweet tweetLink="StephaneVanraes/status/1477985831168184323" />

<p>
	Consequently, the wider Svelte community (myself included) assumed that SvelteKit was ready for
	production:
</p>

<Tweet tweetLink="maiertech/status/1557290685044125697" />

<p>
	After a summer of breaking changes, I realized that considering SvelteKit stable enough for
	production was premature. Mea culpa!
</p>

<p>
	Now that many devs run SvelteKit in production, what is the best way to deal with all the breaking
	changes?
</p>

<h2>Upgrading to recent SvelteKit versions with breaking changes</h2>

<p>
	If you have a SvelteKit app in production that you have not upgraded in a while, you should not
	try to upgrade straight to the latest version. Here are some milestone releases that you can use
	for your upgrade path:
</p>

<h3>SvelteKit 1.0.0-next.377</h3>

<p>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next377"
		>1.0.0-next.377</a
	>
	includes a breaking change in which you need to uppercase endpoint methods. If your version is older
	than
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next359"
		>1.0.0-next.359</a
	>, you can follow the upgrade steps outlined in this thread:
</p>

<Tweet tweetLink="maiertech/status/1548034676635275264" />

<h3>SvelteKit 1.0.0-next.405</h3>

<p>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next405"
		>1.0.0-next.405</a
	>
	is the last version before the overhaul of SvelteKit's router. Make sure your site runs without issues
	with this version.
</p>

<h3>SvelteKit 1.0.0-next.414</h3>

<p>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next414"
		>1.0.0-next.414</a
	>
	is the last version before another significant breaking change. Now it's time to read up on the changes
	released in
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next406"
		>1.0.0-next.406</a
	>. Read one of these two posts:
</p>

<ul>
	<li>
		Josh Collinsworth: <a href="https://joshcollinsworth.com/blog/sveltekit-breaking-changes"
			>Breaking changes in SvelteKit</a
		>.
	</li>
	<li>
		Brittney Postma: <a href="https://www.netlify.com/blog/migrating-breaking-changes-in-sveltekit/"
			>Migrating Breaking Changes in SvelteKit</a
		>.
	</li>
</ul>

<p>
	Then read the <a href="https://github.com/sveltejs/kit/discussions/5774#discussion-4267008"
		>first comment in Rich Harris's migration guide</a
	> and run the migration script:
</p>

<figure>
	<Highlight language={bash} code={`npx svelte-migrate routes`} />
</figure>

<p>
	This script is magic. It handles all the renaming of files and leaves <code>@migration</code>
	comments with links to the other comments in the
	<a href="https://github.com/sveltejs/kit/discussions/5774">migration guide</a>. You should review
	all migration comments and review all proposed changes. Depending on the size of your site, this
	can take a couple of hours.
</p>

<h3>SvelteKit 1.0.0-next.415</h3>

<p>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next432"
		>1.0.0-next.415</a
	>
	removes the session object. You can skip this version if you do not use the session object. If you
	use the session object, you need to read
	<a href="https://github.com/sveltejs/kit/discussions/5883"
		>this discussion on why it has been removed and how to replace it</a
	>. This is a non-trivial upgrade.
</p>

<h3>SvelteKit 1.0.0-next.432</h3>

<p>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next432"
		>1.0.0-next.432</a
	>
	removes named layouts in favor of
	<a href="https://kit.svelte.dev/docs/advanced-routing#advanced-layouts">groups</a>. Check out
	<a href="https://github.com/sveltejs/kit/pull/6174">this migration guide</a>. If you do not use
	named layouts, skip to the next version.
</p>

<h3>SvelteKit 1.0.0-next.455</h3>

<p>
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next450"
		>1.0.0-next.450</a
	>
	requires an upgrade of Vite in <code>package.json</code>:
</p>

<figure>
	<Highlight language={json} code={`"vite": "^3.1.0-beta.1"`} />
	<figcaption>package.json</figcaption>
</figure>

<p>
	And
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next455"
		>1.0.0-next.455</a
	>
	overhauls prerendering. Read the docs on
	<a href="https://kit.svelte.dev/docs/page-options">page options</a> to find out what has changed.
</p>

<h3>SvelteKit 1.0.0-next.463</h3>

<p>
	Last but not least,
	<a href="https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100-next463"
		>1.0.0-next.463</a
	>
	fixes a peer dependency warning introduced with Vite 3.1.0-beta.1.
</p>

<h2>Conclusion</h2>

<p>
	Fixing all recent breaking changes looks like a daunting task, and it probably is if you have a
	large website. If you have a SvelteKit app in production, there is not much you can do other than
	upgrade to the new versions as they are released.
</p>

<p>
	This post demonstrates that you do not have to upgrade to every new release, and you can skip
	upgrades when they contain only patch changes. But the longer you wait, the more breaking changes
	will accumulate, and the more complex upgrading will be.
</p>

<p>
	How many more breaking changes will there be? I don't know. But I hope the SvelteKit team is on
	the home stretch towards 1.0.
</p>
