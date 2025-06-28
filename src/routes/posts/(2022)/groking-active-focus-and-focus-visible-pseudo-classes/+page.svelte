<script lang="ts">
	import { StackblitzEmbed } from '$lib/components';
	import { Code, CodeSnippet, Figure, H2, P, VercelImage } from '@maiertech/sveltekit-helpers';
	import type { PageProps } from './$types';
	import active_example_button_active_origin_image from './active-example-button-active.png';
	import active_example_input_active_origin_image from './active-example-input-active.png';
	import active_example_input_focus_origin_image from './active-example-input-focus.png';
	import focus_example_button_origin_image from './focus-example-button.png';
	import focus_example_input_origin_image from './focus-example-input.png';
	import focus_visible_example_button_keyboard_origin_image from './focus-visible-example-button-keyboard.png';
	import focus_visible_example_button_mouse_origin_image from './focus-visible-example-button-mouse.png';
	import focus_visible_example_input_origin_image from './focus-visible-example-input.png';

	let { data }: PageProps = $props();
</script>

<P>
	Recently, I worked on the newsletter sign-up form for this website. When I looked at examples, I
	noticed that other developers used the pseudo-classes
	<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:active">:active</a>,
	<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus">:focus</a>, and
	<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible">:focus-visible</a> to style
	form fields.
</P>

<P>
	My understanding of these pseudo-classes could have been better, so I decided to read up on their
	specifications. In this post, I share my learnings. You can follow along with the StackBlitz
	workspace below. It also runs on mobile devices, but you should use a desktop browser to get the
	most out of this post. For instance, the pseudo-class <Code>:active</Code> does not affect touch devices,
	and the first example will make no sense.
</P>

<P>
	I took the screenshots in this post with Google Chrome. What you see in your browser may be
	different. There are subtle cross-browser differences for the pseudo-classes covered in this post.
</P>

<Figure class="mb-6">
	<StackblitzEmbed project={data.example.project} options={data.example.options} />
</Figure>

<H2>Pseudo-class :active</H2>

<P>
	A browser applies <Code>:active</Code> when a user activates an element. Activation refers to the timespan
	between clicking an element and releasing the mouse button. <Code>:active</Code> can be applied to
	elements with which users interact, e.g., <Code>&lt;a&gt;</Code>,
	<Code>&lt;button&gt;</Code>, <Code>&lt;input&gt;</Code>, <Code>&lt;select&gt;</Code>, and
	<Code>&lt;textarea&gt;</Code>.
</P>

<P>
	In the first example, we look at <Code>:active</Code>. I applied <Code>:active</Code> to the input
	element and submit button with the following styles:
</P>

<Figure class="mb-6">
	<CodeSnippet
		lang="css"
		src={`input:active,
button:active {
  outline: dashed red;
  outline-offset: 1px;
}`}
	/>
</Figure>

<P>
	When you click the input field, you can see a dashed red outline until you release the mouse
	button:
</P>

<Figure class="mb-6">
	<VercelImage
		src={active_example_input_active_origin_image}
		alt="A simple web form with a name input field and a submit button. The name input field is active and highlighted with a red dashed outline."
	/>
</Figure>

<P>
	When you release the mouse button, the input field has focus. The browser draws a default outline
	around it to highlight its focus:
</P>

<Figure class="mb-6">
	<VercelImage
		src={active_example_input_focus_origin_image}
		alt="A simple web form with a name input field and a submit button. The name input field has focus, and the browser applies a blue outline to it."
	/>
</Figure>

<P>While you click the submit button, you can see the dashed red outline until you release it.</P>

<Figure class="mb-6">
	<VercelImage
		src={active_example_button_active_origin_image}
		alt="A simple web form with a name input field and a submit button. The submit button is highlighted with a dashed red outline."
	/>
</Figure>

<P>
	The takeaway from this example is that <Code>:active</Code> styles are in effect while you press the
	mouse button, until you release it.
</P>

<H2>Pseudo-class :focus</H2>

<P>
	A browser applies <Code>:focus</Code> when the activation is complete and an element is ready for user
	interaction. There are different ways of giving focus to an element. You can click or tap the element
	or use keyboard navigation with the <key>Tab</key> key.
</P>

<P>
	In the second example, we look at <Code>:focus</Code>. I applied <Code>:focus</Code> to the input element
	and submit button with the same styles as before:
</P>

<Figure class="mb-6">
	<CodeSnippet
		lang="css"
		src={`input:focus,
button:focus {
  outline: dashed red;
  outline-offset: 1px;
}`}
	/>
</Figure>

<P>
	You can see the dashed red outline again when you click the input field. But this time, it stays
	until the input field loses focus:
</P>

<Figure class="mb-6">
	<VercelImage
		src={focus_example_input_origin_image}
		alt="A simple web form with a name input field and a submit button. The input field is focused and highlighted with a dashed red outline."
	/>
</Figure>

<P>
	Likewise, when you click the submit button, you can see the dashed outline until it loses focus:
</P>

<Figure class="mb-6">
	<VercelImage
		src={focus_example_button_origin_image}
		alt="A simple web form with a name input field and a submit button. The submit button has focus and the browser applied a dashed red outline to it."
	/>
</Figure>

<P>
	Instead of clicking the input field and submit button, you can use the <key>Tab</key> key to navigate
	between elements and focus them. Try it out in StackBlitz.
</P>

<P>
	The takeaway from this example is that <Code>:focus</Code> styles are applied when an element has focus,
	and it does not matter whether a click, tap, or the <key>Tab</key> key triggers the focus.
</P>

<H2>Pseudo-class :focus-visible</H2>

<P>
	<Code>:focus-visible</Code> can only be applied when an element has focus. However, a browser can decide
	whether or not to apply <Code>:focus-visible</Code> to an element with focus. Browsers use a heuristic
	to determine whether they apply <Code>:focus-visible</Code> to a focused element.
</P>

<P>
	In the third example, we look at <Code>:focus-visible</Code>. I applied
	<Code>:focus-visible</Code> to the input element and submit button with the same styles as in the previous
	examples:
</P>

<Figure class="mb-6">
	<CodeSnippet
		lang="css"
		src={`input:focus-visible,
button:focus-visible {
  outline: dashed red;
  outline-offset: 1px;
}`}
	/>
</Figure>

<P>
	When you click the input field, you can see the dashed red outline again when the input field has
	focus:
</P>

<Figure class="mb-6">
	<VercelImage
		src={focus_visible_example_input_origin_image}
		alt="A simple web form with a name input field and a submit button. The name input field has focus, and the browser applied :focus-visible and a dashed red outline."
	/>
</Figure>

<P>
	For the input field, there is no difference between <Code>:focus</Code> and
	<Code>:focus-visible</Code>. However, when you click the submit button, the dashed red outline is
	not visible:
</P>

<Figure class="mb-6">
	<VercelImage
		src={focus_visible_example_button_mouse_origin_image}
		alt="A simple web form with a name input field and a submit button. Even though the submit has focus, the browser did not apply :focus-visible and the corresponding styling."
	/>
</Figure>

<P>
	But when you use the <key>Tab</key> key to focus the submit button, the dashed red outline is visible:
</P>

<Figure class="mb-6">
	<VercelImage
		src={focus_visible_example_button_keyboard_origin_image}
		alt="A simple web form with a name input field and a submit button. This time, the browser applied :focus-visible and a dashed red outline to the submit button."
	/>
</Figure>

<P>
	In this case, the browser decided against applying <Code>:focus-visible</Code> to an element with focus.
	And it makes sense. Once the input field is focused, the user must type in some information, and the
	styles applied with <Code>:focus-visible</Code> emphasize this expectation.
</P>

<P>
	The submit button is a different story. After a user clicks the button, no other interaction is
	required; thus, the browser does not apply <Code>:focus-visible</Code>. For most common use cases
	you will encounter as a developer, it makes sense to use the <Code>:focus-visible</Code>
	pseudo-class instead of
	<Code>:focus</Code>.
</P>
