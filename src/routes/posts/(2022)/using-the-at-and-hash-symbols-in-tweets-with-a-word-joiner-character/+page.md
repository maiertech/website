---
title: 'Using the @ and # symbols in tweets with a word joiner character'
author: thilo
publishedDate: 2022-08-30
description:
  'How to prevent @ and # in Svelte tweets from becoming mentions or hashtags by inserting a Unicode
  word joiner character for clean formatting.'
tags:
  - content-creation
---

<script lang="ts">
	import { CodeSnippet, Figure } from '@maiertech/sveltekit-helpers';
	import { Tweet } from 'sveltekit-embed';
	import CopyButton from './CopyButton.svelte';
</script>

When I scroll through Svelte-related tweets in my Twitter timeline, I occasionally see tweets about
the [Svelte template syntax](https://svelte.dev/docs#template-syntax-const) that contain strings
like @const (referring to the [`{@const ...}`](https://svelte.dev/docs#template-syntax-const) tag)
or #if (referring to a [`{#if ...}`](https://svelte.dev/docs#template-syntax-const) block).

Since '@' and '#' have special meanings in tweets, Twitter interprets the string '@const' as a
mention of Twitter user [Konstantin Martynov](https://twitter.com/const) (whose username is @const).
Likewise, Twitter interprets the string '#if' as a hashtag and links to an unrelated part of
Twitter.

But there are tweets like this one by [Geoff Rich](https://geoffrich.net/) that contain the @const
string without displaying it as a mention:

<Tweet tweetLink="geoffrich_/status/1500856298652545033" />

How did Geoff pull this off? Copying the @const string from the original tweet and displaying its
second character like so:

<Figure class="mb-8">

```js
const string = '@const';
string.charCodeAt(1);
```

</Figure>

This yields `8203`, which corresponds to `0x200B` (hexadecimal). This is the **U+200B ZERO-WIDTH
SPACE** Unicode character. An invisible space between '@' and 'const' prevents Twitter from
displaying the string as a mention.

To avoid a potential line break between '@' and 'const', use the **U+2060 WORD JOINER** Unicode
character instead. To insert a word joiner into your tweet, click the button below to copy it and
paste it into your tweet draft.

<CopyButton text="\u2060">Copy U+2060 WORD JOINER</CopyButton>
