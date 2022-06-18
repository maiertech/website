---
title: ':active, :focus and :focus-visible pseudo-classes'
author: thilo
published: 2022-06-15
modified: 2022-06-15
description: TBD
tags: [css, til]
category: web-development
---

<script>
  import Example from './_example.svelte';
</script>

<Example />

## :active

Pseudo-class `:active` is applied when an element is activated. The pseudo class
is applied between when the user clicks the element and releases the mouse
button.

Active can be applied to elements with which a user interacts: `<a>`,
`<button>`, `<input>`, `<select>`, `<textarea>`.

## :focus

Pseudo-class `:focus` is applied when an element is in focus, i.e. it is ready
to be interacted with.

## :focus-within

Pseudo-class `:focus-within` is applied to a parent element, when one of its
children is in focus, i.e. ready to be interacted with.

## :focus-visible

Can be applied only if `:focus` would be applied. But will only be applied if
browser determines it makes sense to apply. E.g. `:focus-visible` will be
applied if user uses tab navigation, but not if user clicks mouse.

You can display no outline for `:focus` and only display outline for
`:focus-visible`.

## Links

- https://bharathvaj.me/blog/focus-vs-within-vs-visible`
