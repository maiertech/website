---
id: active-and-focus-pseudo-classes
title: 'Groking :active, :focus and :focus-visible pseudo-classes'
author: thilo
published: 2022-06-20
modified: 2023-04-05
description: 'This post explains the subtle differences between CSS pseudo-classes :active, :focus and :focus-visible.'
topics: [web-fundamentals]
tags: [css]
links:
  - title: 'Ire Aderinokun: When is :focus-visible visible?'
    href: https://bitsofco.de/when-is-focus-visible-visible/
---

<script>
  import Image from '$lib/components/image.svelte';
  import Example from './example.svelte';
  import Highlight from 'svelte-highlight';
  import { css } from 'svelte-highlight/languages';
</script>

Recently, I worked on the newsletter sign-up form for this website. When I looked at examples, I saw that other developers used pseudo-classes [`:active`](https://developer.mozilla.org/en-US/docs/Web/CSS/:active), [`:focus`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus), [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) to style form fields.

My handle on these pseudo-classes could have been better, and I decided to read up on their specifications. In this post, I share my learnings. You can follow along with the CodeSandbox below. CodeSandbox also runs on mobile devices, but you should run it in a desktop browser to get the most out of this post. For instance, pseudo-class `:active` does not affect touch devices, and the first example will make no sense.

I took the screenshots in this post with Google Chrome. What you see in your CodeSandbox may be different if you use a different browser. There are subtle cross-browser differences for the pseudo-classes covered in this post.

<Example />

## Pseudo-class :active

A browser applies `:active` when a user activates an element. Activation refers to the timespan between clicking an element and releasing the mouse button. `:active` can be applied to elements with which users interact, e.g., `<a>`, `<button>`, `<input>`, `<select>`, and `<textarea>`.

In the first example we look at `:active`. I applied `:active` to the input element and submit button with the following styles:

<Highlight language={css} code={ `input:active,\n` + `button:active {\n` + ` outline: dashed red;\n` + ` outline-offset: 1px;\n` + `}`} />

When you click the input field, you can see a dashed red outline until you release the mouse button:

<figure>
<Image
  ratio={630/198}
  alt="A simple web form with a name input field and a submit button. The name input field is active and highlighted with a red dashed outline."
  url="https://share.mailbox.org/ajax/share/09141b65090a757c997d40e90a754b5b825a2db2af774b90/1/8/MjM4/MjM4LzMzNw?dl=true"
  loading="lazy" />
</figure>

When you release the mouse button, the input field has focus. The browser draws a default outline around it to highlight its focus:

<figure>
<Image
  ratio={630/198}
  alt="A simple web form with a name input field and a submit button. The name input field has focus, and the browser applies a blue outline to it."
  url="https://share.mailbox.org/ajax/share/09ad53d00507a07692e9cbb507a04e1d9be3e0d320665945/1/8/MjM4/MjM4LzMzOA?dl=true"
  loading="lazy" />
</figure>

While you click the submit button, you can see the dashed red outline until you release it:

<figure>
<Image
  ratio={630/198}
  alt="A simple web form with a name input field and a submit button. The submit button is highlighted with a dashed red outline."
  url="https://share.mailbox.org/ajax/share/04327226046abf784b1bd4d46abf41df8f90493021f9d70b/1/8/MjM4/MjM4LzMzOQ?dl=true"
  loading="lazy" />
</figure>

The takeaway from this example is that `:active` styles are in effect while you press the mouse button until you release it.

## Pseudo-class :focus

A browser applies `:focus` when the activation is complete, and an element is ready for user interaction. There are different ways of giving focus to an element. You can click or tap the element or use keyboard navigation with the `Tab` key.

In the second example, we look at `:focus`. I applied `:focus` to the input element and submit button with the same styles as before:

<Highlight language={css} code={`input:focus,\n` + `button:focus {\n` + ` outline: dashed red;\n` + ` outline-offset: 1px;\n` + `}`} />

You can see the dashed red outline again when you click the input field. But this time, it stays until the input field loses focus:

<figure>
<Image
  ratio={630/198}
  alt="A simple web form with a name input field and a submit button. The input field is focused and highlighted with a dashed red outline."
  url="https://share.mailbox.org/ajax/share/0f780aee0520997dffbc585520994753b9e4a40d907f753d/1/8/MjM4/MjM4LzM0MA?dl=true"
  loading="lazy" />
</figure>

Likewise, when you click the submit button, you can see the dashed outline until it loses focus:

<figure>
<Image
  ratio={630/198}
  alt="A simple web form with a name input field and a submit button. The submit button has focus and the browser applied a dashed red outline to it."
  url="https://share.mailbox.org/ajax/share/0329528d0b95d7783aa9de6b95d7437189849fbb9d927b82/1/8/MjM4/MjM4LzM0MQ?dl=true"
  loading="lazy" />
</figure>

Instead of clicking the input field and submit button, you can use the `Tab` key to navigate between elements and focus them. Try it out in your CodeSandbox.

The takeaway from this example is that `:focus` styles are applied when an element has focus, and it does not matter whether a click, tap, or the `Tab` key triggers the focus.

## Pseudo-class :focus-visible

`:focus-visible` can only be applied when an element has focus. But a browser can decide whether or not to apply `:focus-visible` to an element with focus. Browsers use a heuristic to determine whether they apply `:focus-visible` to a focused element.

In the third example, we look at `:focus-visible`. I applied `:focus-visible` to the input element and submit button with the same styles as in the previous examples:

<Highlight language={css} code={`input:focus-visible,\n` + `button:focus-visible {\n` + ` outline: dashed red;\n` + ` outline-offset: 1px;\n` + `}`} />

When you click the input field, you can see the dashed red outline again when the input field has focus:

<figure>
<Image
  ratio={762/202}
  alt="A simple web form with a name input field and a submit button. The name input field has focus, and the browser applied :focus-visible and a dashed red outline."
  url="https://share.mailbox.org/ajax/share/06442a2a042a33716c7e54142a334dadbcffe26d19746c53/1/8/MjM4/MjM4LzM0Mg?dl=true"
  loading="lazy" />
</figure>

For the input field, there is no difference between `:focus` and `:focus-visible`. But when you click the submit button, the dashed red outline is not visible:

<figure>
<Image
  ratio={762/202}
  alt="A simple web form with a name input field and a submit button. Even though the submit has focus, the browser did not apply :focus-visible and the corresponding styling."
  url="https://share.mailbox.org/ajax/share/0d0478eb020b7d70d87b78020b7d4d4e871ece793c761f74/1/8/MjM4/MjM4LzM0Mw?dl=true"
  loading="lazy" />
</figure>

But when you use the `Tab` key to focus the submit button, the dashed red outline is visible:

<figure>
<Image
  ratio={762/202}
  alt="A simple web form with a name input field and a submit button. This time, the browser applied :focus-visible and a dashed red outline to the submit button."
  url="https://share.mailbox.org/ajax/share/040e46f1095f017c48d899a95f0142ffa27211e56c0128fd/1/8/MjM4/MjM4LzM0NA?dl=true"
  loading="lazy" />
</figure>

In this case, the browser decided against applying `:focus-visible` to an element with focus. And it makes sense. Once the input field is focused, the user must type in some information, and the styles applied with `:focus-visible` emphasize this expectation.

The submit button is a different story. After a user clicks the button, no other interaction is required; thus, the browser does not apply `:focus-visible`.

For most common use cases you will encounter as a developer, it makes sense to use the `:focus-visible` pseudo-class instead of `:focus`.
