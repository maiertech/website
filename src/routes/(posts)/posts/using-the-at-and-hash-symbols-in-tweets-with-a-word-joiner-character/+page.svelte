<script lang="ts">
	import { Code, Figure, P, Shiki } from '@maiertech/sveltekit-helpers';
	import { Tweet } from 'sveltekit-embed';
	import CopyButton from './copy-button.svelte';
</script>

<P>
	When scrolling through Svelte tweets in my Twitter timeline, occasionally, I see tweets about the
	<a href="https://svelte.dev/docs#template-syntax-const">Svelte template syntax</a>
	which contain strings like @const (referring to the
	<a href="https://svelte.dev/docs#template-syntax-const"><Code>{`{@const ...}`}</Code> tag</a>) or
	#if (referring to an
	<a href="https://svelte.dev/docs#template-syntax-const"><Code>{`{#if ...}`}</Code> block</a>).
</P>

<P>
	Since @ and # have special meanings in tweets, Twitter interprets the string @const as a mention
	of Twitter user <a href="https://twitter.com/const">Konstantin Martynov</a> (whose Twitter username
	happens to be @const). Likewise, Twitter interprets the string #if as a hashtag and links straight
	to a dodgier part of Twitter.
</P>

<P>
	But there are tweets like this one by <a href="https://geoffrich.net/">Geoff Rich</a> that contain
	the @const string without displaying it as a mention:
</P>

<Tweet tweetLink="geoffrich_/status/1500856298652545033" />

<P>
	How did Geoff pull this off? Copying the @const string from the original tweet and displaying its
	second character like so
</P>

<Figure class="mb-6">
	<Shiki lang="javascript" code={`const string = '@const';\n` + `string.charCodeAt(1);`} />
</Figure>

<P>
	yields <Code>8203</Code> corresponding to <Code>0x200B</Code> (hexadecimal). This is the
	<strong>U+200B ZERO-WIDTH SPACE</strong> Unicode character. An invisible space between @ and const
	keeps Twitter from displaying the string as a mention.
</P>

<P>
	To avoid a potential line break between @ and const, you should use the
	<strong>U+2060 WORD JOINER</strong>
	Unicode character instead. How can you insert a word joiner character into your tweet? Click the button
	below to copy a word joiner and paste it into your tweet draft.
</P>

<CopyButton text={'\u2060'}>Copy U+2060 WORD JOINER</CopyButton>
