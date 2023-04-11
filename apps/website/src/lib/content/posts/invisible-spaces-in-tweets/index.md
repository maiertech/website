---
title: 'Using the @ and # symbols in tweets with a word joiner character'
author: thilo
published: 2022-08-30
modified: 2022-08-30
description: 'Twitter interprets strings starting with @ and # as mention and hashtag. It misinterprets Svelte-related strings, e.g., @const and #if. In this post, you will learn how to fix this.'
topics: [content-creation]
tags: [twitter]
---

<script>
    import { Tweet } from 'sveltekit-embed';
    import CopyButton from './copy-button.svelte';
    import Highlight from 'svelte-highlight';
    import { javascript } from 'svelte-highlight/languages';
</script>

When scrolling through Svelte tweets in my Twitter timeline, occasionally, I see tweets about the [Svelte template syntax](https://svelte.dev/docs#template-syntax-const) which contain strings like @const (referring to the [`{@const ...}` tag](https://svelte.dev/docs#template-syntax-const)) or #if (referring to an [`{#if ...}` block](https://svelte.dev/docs#template-syntax-const)).

Since `@` and `#` have special meanings in tweets, Twitter interprets the string @const as a mention of Twitter user [Konstantin Martynov](https://twitter.com/const) (whose Twitter username happens to be @const). Likewise, Twitter interprets the string #if as a hashtag and links straight to a dodgier part of Twitter.

But there are tweets like this one by [Geoff Rich](https://geoffrich.net/) that contain the @const string without displaying it as a mention:

<Tweet tweetLink="geoffrich_/status/1500856298652545033" />

How did Geoff pull this off? Copying the @const string from the original tweet and displaying its second character like so

<Highlight language={javascript} code={`const string = '@​const';\n` + `string.charCodeAt(1);`} />

yields `8203` corresponding to `0x200B` (hexadecimal). This is the **U+200B ZERO-WIDTH SPACE** Unicode character. An invisible space between @ and const keeps Twitter from displaying the string as a mention.

To avoid a potential line break between @ and const, you should use the **U+2060 WORD JOINER** Unicode character instead. How can you insert a word joiner character into your tweet? Click the button below to copy a word joiner and paste it into your tweet draft.

<CopyButton copyText={`\u2060`}>Copy U+2060 WORD JOINER</CopyButton>
