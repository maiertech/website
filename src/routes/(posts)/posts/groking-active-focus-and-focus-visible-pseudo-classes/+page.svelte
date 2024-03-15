<script>
	import Image from '$lib/components/image.svelte';
	import Highlight from 'svelte-highlight';
	import { css } from 'svelte-highlight/languages';
	import StackblitzEmbed from '$lib/components/stackblitz-embed.svelte';

	export let data;
</script>

<p>
	Recently, I worked on the newsletter sign-up form for this website. When I looked at examples, I
	saw that other developers used pseudo-classes
	<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:active">:active</a>,
	<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus">:focus</a>
	<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible">:focus-visible</a> to style
	form fields.
</p>

<p>
	My handle on these pseudo-classes could have been better, and I decided to read up on their
	specifications. In this post, I share my learnings. You can follow along with the StackBlitz
	workspace below. It also runs on mobile devices, but you should run it in a desktop browser to get
	the most out of this post. For instance, pseudo-class <code>:active</code> does not affect touch devices,
	and the first example will make no sense.
</p>

<p>
	I took the screenshots in this post with Google Chrome. What you see in your browser may be
	different. There are subtle cross-browser differences for the pseudo-classes covered in this post.
</p>

<StackblitzEmbed project={data.example.project} options={data.example.options} />

<h2>Pseudo-class :active</h2>

<p>
	A browser applies <code>:active</code> when a user activates an element. Activation refers to the
	timespan between clicking an element and releasing the mouse button. <code>:active</code> can be
	applied to elements with which users interact, e.g., <code>&lt;a&gt;</code>,
	<code>&lt;button&gt;</code>, <code>&lt;input&gt:</code>, <code>&lt;select&gt;</code>, and
	<code>&lt;textarea&gt;</code>.
</p>

<p>
	In the first example we look at <code>:active</code>. I applied <code>:active</code> to the input element
	and submit button with the following styles:
</p>

<figure>
	<Highlight
		language={css}
		code={`input:active,
button:active {
  outline: dashed red;
  outline-offset: 1px;
}`}
	/>
</figure>

<p>
	When you click the input field, you can see a dashed red outline until you release the mouse
	button:
</p>

<figure>
	<Image
		src="https://share.mailbox.org/ajax/share/09141b65090a757c997d40e90a754b5b825a2db2af774b90/1/8/MjM4/MjM4LzMzNw?dl=true"
		alt="A simple web form with a name input field and a submit button. The name input field is active and highlighted with a red dashed outline."
		ratio={630 / 198}
		loading="lazy"
	/>
</figure>

<p>
	When you release the mouse button, the input field has focus. The browser draws a default outline
	around it to highlight its focus:
</p>

<figure>
	<Image
		src="https://share.mailbox.org/ajax/share/09ad53d00507a07692e9cbb507a04e1d9be3e0d320665945/1/8/MjM4/MjM4LzMzOA?dl=true"
		alt="A simple web form with a name input field and a submit button. The name input field has focus, and the browser applies a blue outline to it."
		ratio={630 / 198}
		loading="lazy"
	/>
</figure>

<p>While you click the submit button, you can see the dashed red outline until you release it:</p>

<figure>
	<Image
		src="https://share.mailbox.org/ajax/share/04327226046abf784b1bd4d46abf41df8f90493021f9d70b/1/8/MjM4/MjM4LzMzOQ?dl=true"
		alt="A simple web form with a name input field and a submit button. The submit button is highlighted with a dashed red outline."
		ratio={630 / 198}
		loading="lazy"
	/>
</figure>

<p>
	The takeaway from this example is that <code>:active</code> styles are in effect while you press the
	mouse button until you release it.
</p>

<h2>Pseudo-class :focus</h2>

<p>
	A browser applies <code>:focus</code> when the activation is complete, and an element is ready for
	user interaction. There are different ways of giving focus to an element. You can click or tap the
	element or use keyboard navigation with the <key>Tab</key> key.
</p>

<p>
	In the second example, we look at <code>:focus</code>. I applied <code>:focus</code> to the input element
	and submit button with the same styles as before:
</p>

<figure>
	<Highlight
		language={css}
		code={`input:focus,
button:focus {
  outline: dashed red;
  outline-offset: 1px;
}`}
	/>
</figure>

<p>
	You can see the dashed red outline again when you click the input field. But this time, it stays
	until the input field loses focus:
</p>

<figure>
	<Image
		src="https://share.mailbox.org/ajax/share/0f780aee0520997dffbc585520994753b9e4a40d907f753d/1/8/MjM4/MjM4LzM0MA?dl=true"
		alt="A simple web form with a name input field and a submit button. The input field is focused and highlighted with a dashed red outline."
		ratio={630 / 198}
		loading="lazy"
	/>
</figure>

<p>
	Likewise, when you click the submit button, you can see the dashed outline until it loses focus:
</p>

<figure>
	<Image
		src="https://share.mailbox.org/ajax/share/0329528d0b95d7783aa9de6b95d7437189849fbb9d927b82/1/8/MjM4/MjM4LzM0MQ?dl=true"
		alt="A simple web form with a name input field and a submit button. The submit button has focus and the browser applied a dashed red outline to it."
		ratio={630 / 198}
		loading="lazy"
	/>
</figure>

<p>
	Instead of clicking the input field and submit button, you can use the <key>Tab</key> key to navigate
	between elements and focus them. Try it out in StackBlitz.
</p>

<p>
	The takeaway from this example is that <code>:focus</code> styles are applied when an element has
	focus, and it does not matter whether a click, tap, or the <key>Tab</key> key triggers the focus.
</p>

<h2>Pseudo-class :focus-visible</h2>

<p>
	<code>:focus-visible</code> can only be applied when an element has focus. But a browser can
	decide whether or not to apply <code>:focus-visible</code> to an element with focus. Browsers use
	a heuristic to determine whether they apply <code>:focus-visible</code> to a focused element.
</p>

<p>
	In the third example, we look at <code>:focus-visible</code>. I applied
	<code>:focus-visible</code> to the input element and submit button with the same styles as in the previous
	examples:
</p>

<figure>
	<Highlight
		language={css}
		code={`input:focus-visible,
button:focus-visible {
  outline: dashed red;
  outline-offset: 1px;
}`}
	/>
</figure>

<p>
	When you click the input field, you can see the dashed red outline again when the input field has
	focus:
</p>

<figure>
	<Image
		src="https://share.mailbox.org/ajax/share/06442a2a042a33716c7e54142a334dadbcffe26d19746c53/1/8/MjM4/MjM4LzM0Mg?dl=true"
		alt="A simple web form with a name input field and a submit button. The name input field has focus, and the browser applied :focus-visible and a dashed red outline."
		ratio={762 / 202}
		loading="lazy"
	/>
</figure>

<p>
	For the input field, there is no difference between <code>:focus</code> and
	<code>:focus-visible</code>. But when you click the submit button, the dashed red outline is not
	visible:
</p>

<figure>
	<Image
		src="https://share.mailbox.org/ajax/share/0d0478eb020b7d70d87b78020b7d4d4e871ece793c761f74/1/8/MjM4/MjM4LzM0Mw?dl=true"
		alt="A simple web form with a name input field and a submit button. Even though the submit has focus, the browser did not apply :focus-visible and the corresponding styling."
		ratio={762 / 202}
		loading="lazy"
	/>
</figure>

<p>
	But when you use the <key>Tab</key> key to focus the submit button, the dashed red outline is visible:
</p>

<figure>
	<Image
		src="https://share.mailbox.org/ajax/share/040e46f1095f017c48d899a95f0142ffa27211e56c0128fd/1/8/MjM4/MjM4LzM0NA?dl=true"
		alt="A simple web form with a name input field and a submit button. This time, the browser applied :focus-visible and a dashed red outline to the submit button."
		ratio={762 / 202}
		loading="lazy"
	/>
</figure>

<p>
	In this case, the browser decided against applying <code>:focus-visible</code> to an element with
	focus. And it makes sense. Once the input field is focused, the user must type in some
	information, and the styles applied with <code>:focus-visible</code> emphasize this expectation.
</p>

<p>
	The submit button is a different story. After a user clicks the button, no other interaction is
	required; thus, the browser does not apply <code>:focus-visible</code>. For most common use cases
	you will encounter as a developer, it makes sense to use the <code>:focus-visible</code>
	pseudo-class instead of
	<code>:focus</code>.
</p>
