<script>
	import { Tweet } from 'sveltekit-embed';
	import CopyButton from './copy-button.svelte';
	import Highlight from 'svelte-highlight';
	import { javascript } from 'svelte-highlight/languages';
</script>

<p>
	When scrolling through Svelte tweets in my Twitter timeline, occasionally, I see tweets about the
	<a href="https://svelte.dev/docs#template-syntax-const">Svelte template syntax</a>
	which contain strings like @const (referring to the
	<a href="https://svelte.dev/docs#template-syntax-const"><code>{`{@const ...}`}</code> tag</a>) or
	#if (referring to an
	<a href="https://svelte.dev/docs#template-syntax-const"><code>{`{#if ...}`}</code> block</a>).
</p>

<p>
	Since @ and # have special meanings in tweets, Twitter interprets the string @const as a mention
	of Twitter user <a href="https://twitter.com/const">Konstantin Martynov</a> (whose Twitter username
	happens to be @const). Likewise, Twitter interprets the string #if as a hashtag and links straight
	to a dodgier part of Twitter.
</p>

<p>
	But there are tweets like this one by <a href="https://geoffrich.net/">Geoff Rich</a> that contain
	the @const string without displaying it as a mention:
</p>

<Tweet tweetLink="geoffrich_/status/1500856298652545033" />

<p>
	How did Geoff pull this off? Copying the @const string from the original tweet and displaying its
	second character like so
</p>

<figure>
	<Highlight language={javascript} code={`const string = '@const';\n` + `string.charCodeAt(1);`} />
</figure>

<p>
	yields <code>8203</code> corresponding to <code>0x200B</code> (hexadecimal). This is the
	<strong>U+200B ZERO-WIDTH SPACE</strong> Unicode character. An invisible space between @ and const
	keeps Twitter from displaying the string as a mention.
</p>

<p>
	To avoid a potential line break between @ and const, you should use the
	<strong>U+2060 WORD JOINER</strong>
	Unicode character instead. How can you insert a word joiner character into your tweet? Click the button
	below to copy a word joiner and paste it into your tweet draft.
</p>

<CopyButton copyText={`\u2060`}>Copy U+2060 WORD JOINER</CopyButton>
