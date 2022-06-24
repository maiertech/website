---
title: 'Groking :active, :focus and :focus-visible pseudo-classes'
author: thilo
published: 2022-06-20
modified: 2022-06-24
description:
  'This post explains the subtle differences between CSS pseudo-classes :active,
  :focus and :focus-visible.'
tags: [css, til]
category: web-development
---

<script>
  import Image from '$lib/components/image.svelte';
  import Example from './_example-sandbox.svelte';

  // Provided by page endpoint.
  export let images;
</script>

Recently, I worked on the newsletter sign-up form for this website. When I
looked at examples, I saw that other developers used pseudo-classes
[`:active`](https://developer.mozilla.org/en-US/docs/Web/CSS/:active),
[`:focus`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus),
[`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
to style form fields.

I realized that my handle on these pseudo-classes was not good. I decided to
read up on their specifications. In this post, I share my learnings. You can
follow along with the CodeSandbox below. CodeSandbox also runs on mobile
devices, but you should run it in a desktop browser to get the most out of this
post. For instance, pseudo-class `:active` does not affect touch devices and the
first example will make no sense.

I took the screenshots in this post with Google Chrome 102.0.5005.115. If you
are on a different browser, what you see in your CodeSandbox may be different.
There are subtle cross-browser differences for the pseudo-classes covered in
this post.

<Example />

## Pseudo-class :active

A browser applies `:active` when a user activates an element. Activation is the
timespan between clicking an element and releasing the mouse button. `:active`
can be applied to elements with which users interact, e.g. `<a>`, `<button>`,
`<input>`, `<select>` and `<textarea>`.

In the first example we look at `:active`. I apply `:active` to the input
element and submit button with the following styles:

```css
input:active,
button:active {
  outline: dashed red;
  outline-offset: 1px;
}
```

When you click the input field, you can see a dashed red outline until you
release the mouse button:

<figure>

<Image ratio={630/198} alt="Screenshot of the pdeudo-class :active example while
clicking the input field." src={images[`active-example-input-active`].src}
srcset={images[`active-example-input-active`].srcset} loading="lazy" />

</figure>

When you release the mouse button, the input field has focus. The browser draws
a default outline around it to highlight its focus:

<figure>

<Image ratio={630/198} alt="Screenshot of the pseudo-class :active example while
the input field has focus." src={images[`active-example-input-focus`].src}
srcset={images[`active-example-input-focus`].srcset} loading="lazy" />

</figure>

While you click the submit button, you can see the dashed red outline until you
release it:

<figure>

<Image ratio={630/198} alt="Screenshot of the pseudo-class :active example while
clicking the submit button." src={images[`active-example-button-active`].src}
srcset={images[`active-example-button-active`].srcset} loading="lazy" />

</figure>

The take-away from this example is that `:active` styles are in effect while you
press the mouse button until you release it.

## Pseudo-class :focus

A browser applies `:focus` when the activation is complete and an element is
ready for user interaction. There are different ways of giving focus to an
element. You can click/touch the element or use keyboard navigation with the
`Tab` key.

In the second eaxmple, we look at `:focus`. I apply `:focus` to the input
element and submit button with the same styles as before:

```css
input:focus,
button:focus {
  outline: dashed red;
  outline-offset: 1px;
}
```

When you click the input field, you can see the dashed red outline again. But
this time it stays until the input field loses focus:

<figure>

<Image ratio={630/198} alt="Screenshot of the pseudo-class :focus example while
the input field has focus." src={images[`focus-example-input`].src}
srcset={images[`focus-example-input`].srcset} loading="lazy" />

</figure>

Likewise, when you click the submit button, you can see the dashed outline until
it loses focus:

<figure>

<Image ratio={630/198} alt="Screenshot of the pseudo-class :focus example while
the submit button has focus." src={images[`focus-example-button`].src}
srcset={images[`focus-example-button`].srcset} loading="lazy" />

</figure>

Instead of clicking input field and submit button, you can use the `Tab` key to
navigate between elements and focus them. Try it out in your CodeSandbox.

The take-away from this example is that `:focus` styles are applied when an
element has focus. It does not matter whether a click, tap or the `Tab` key
triggers the focus.

## Pseudo-class :focus-visible

`:focus-visible` can be applied only when an element has focus. But a browser
can decide whether it will apply `:focus-visible` to an element that has focus.
Browsers use a heuristic to determine whether the focus of an element should be
highlighted.

In the third example, we look at `:focus-visible`. I apply `:focus-visible` to
the input element and submit button with the same styles as in the previous
examples:

```css
input:focus-visible,
button:focus-visible {
  outline: dashed red;
  outline-offset: 1px;
}
```

When you click the input field, you can see the dashed red outline again when
the input field has focus:

<figure>

<Image ratio={762/202} alt="Screenshot of the pseudo-class :focus-visible
example while the input field has focus."
src={images[`focus-visible-example-input`].src}
srcset={images[`focus-visible-example-input`].srcset} loading="lazy" />

</figure>

For the input field, there is no difference between `:focus` and
`:focus-visible`. But when you click the submit button, the dashed red outline
is not visible:

<figure>

<Image ratio={762/202} alt="Screenshot of the pseudo-class :focus-visible
example when the submit button receives focus with a mouse click."
src={images[`focus-visible-example-button-mouse`].src}
srcset={images[`focus-visible-example-button-mouse`].srcset} loading="lazy" />

</figure>

But when you use the `Tab` key to focus the submit button, the dashed red
outline is visible:

<figure>

<Image ratio={762/202} alt="Screenshot of the pseudo-class :focus-visible
example when the submit button receives focus with the Tab key."
src={images[`focus-visible-example-button-keyboard`].src}
srcset={images[`focus-visible-example-button-keyboard`].srcset} loading="lazy"
/>

</figure>

This is an example where the browser decides against applying `:focus-visible`
to an element with focus. And it makes perfect sense. Once the input field is
focused, the user needs to type in some information. The styles applied with
`:focus-visible` emphasize this expectation.

For the submit button it's a different story. After a user has clicked the
button, there is no other interaction required. Thus, the browser does not apply
`:focus-visible`.

Letting the browser decide about `:focus-visible` is generally what you want.
Most of the time, it makes sense to prefer `:focus-visible` over `:focus`.