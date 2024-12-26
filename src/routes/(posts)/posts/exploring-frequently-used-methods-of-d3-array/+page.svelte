<script lang="ts">
	import { StackblitzEmbed } from '$lib/components';
	import { Code, Figure, H2, P, Shiki } from '@maiertech/sveltekit-helpers';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<P>
	In this post, I will introduce you to the methods from
	<a href="https://github.com/d3/d3-array">d3-array</a>, which I use often for data visualization.
	All examples run inside your browser using
	<a href="https://stackblitz.com/">StackBlitz</a>. StackBlitz currently supports Chromium-based and
	Firefox browsers only.
</P>

<H2>d3.min, d3.max and d3.extent</H2>

<P>
	<a href="https://github.com/d3/d3-array#min">d3.min</a> returns the minimum of an array using the
	natural order. Unlike
	<a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min"
	>
		Math.min
	</a>, d3.min can handle missing values.
</P>

<P>Let's look at an example:</P>

<Figure class="mb-6">
	<StackblitzEmbed
		project={data.examples['d3.min'].project}
		options={data.examples['d3.min'].options}
	/>
</Figure>

<P>
	Likewise, <a href="https://github.com/d3/d3-array#max">d3.max</a> returns the maximum. But what
	happens when the array, for which we would like to compute the maximum, contains objects? We can
	use an
	<em>accessor function</em> to retrieve a specific object property and transform it. In the following
	example, accessor
</P>

<Figure class="mb-6">
	<Shiki lang="javascript" code={`(d) => new Date(d.date);`} />
</Figure>

<P>
	extracts the date property and converts it into a JavaScript
	<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">
		Date
	</a>, which is used for comparison. This returns the most recent date (maximum). But what we need
	is the object with the most recent date, not just the most recent date. We can use
	<a href="https://github.com/d3/d3-array#maxIndex">d3.maxIndex</a> to retrieve the index of the object
	with the most recent date.
</P>

<P>Let's look at an example:</P>

<Figure class="mb-6">
	<StackblitzEmbed
		project={data.examples['d3.max'].project}
		options={data.examples['d3.max'].options}
	/>
</Figure>

<P>
	To create an axis for numeric values with D3, you need to know the extent of the data along that
	axis. Extent means the minimum and maximum values.
	<a href="https://github.com/d3/d3-array#extent">d3.extent</a> returns an array with these values. It
	not only works with numeric values but with any values that have a natural sort order.
</P>

<P>Let's look at an example:</P>

<Figure class="mb-6">
	<StackblitzEmbed
		project={data.examples['d3.extent'].project}
		options={data.examples['d3.extent'].options}
	/>
</Figure>

<H2>d3.range</H2>

<P>
	<a href="https://github.com/d3/d3-array#range">d3.range</a> returns an array of evenly spaced
	numbers. It has three arguments: <em>start</em>, <em>stop</em> and <em>step</em>. The only
	required attribute is <em>stop</em>. <em>start</em> defaults to 0 and <em>step</em> defaults to 1.
	<em>start</em> is inclusive, <em>stop</em> is exclusive.
</P>

<P>Let's look at an example:</P>

<Figure class="mb-6">
	<StackblitzEmbed
		project={data.examples['d3.range'].project}
		options={data.examples['d3.range'].options}
	/>
</Figure>

<P>
	As the <code>floating_point_range</code> example shows, with d3.range you can run into the
	<a href="https://stackoverflow.com/questions/588004/is-floating-point-math-broken">
		pitfalls of binary floating point math
	</a>. You can fix this issue with
	<a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed"
	>
		Number.toFixed
	</a>:
</P>

<Figure class="mb-6">
	<Shiki lang="javascript" code={`range(0, 1, 0.2).map((n) => n.toFixed(1));`} />
</Figure>

<P>
	And finally, if you try to create a range that causes an infinite loop, like the
	<Code>infinite_loop_range</Code>, d3.range returns an empty array.
</P>

<H2>d3.ticks</H2>

<P>
	<a href="https://github.com/d3/d3-array#ticks">d3.ticks</a> generates an array of nicely-rounded
	numbers inside an interval [<em>start</em>, <em>stop</em>]. You have to pass in three arguments:
</P>

<Figure class="mb-6">
	<Shiki lang="javascript" code={`ticks(start, stop, count);`} />
</Figure>

<P>
	<Code>count</Code> is the number of ticks you are aiming for. But there is no guarantee that you will
	get this number. As the example below shows, you may get more or fewer ticks. The only thing that matters
	to d3.ticks is that the ticks are nicely rounded and inside [<em>start</em>,
	<em>stop</em>]. <em>start</em> and <em>stop</em> can be part of the ticks.
</P>

<P>Let's look at an example:</P>

<Figure class="mb-6">
	<StackblitzEmbed
		project={data.examples['d3.ticks'].project}
		options={data.examples['d3.ticks'].options}
	/>
</Figure>

<H2>JavaScript Array methods</H2>

<P>
	The <a href="https://github.com/d3/d3-array#d3-array">d3-array documentation</a> points out that
	you should master
	<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">
		JavaScript's built-in Array methods
	</a>. d3-array complements them but does not replace them. You cannot do data visualization with
	JavaScript without knowing built-in Array methods like the back of your hand.
</P>
