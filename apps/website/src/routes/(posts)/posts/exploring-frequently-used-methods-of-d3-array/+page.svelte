<script>
	import StackblitzEmbed from '$lib/components/stackblitz-embed.svelte';
	import Highlight from 'svelte-highlight';
	import { javascript } from 'svelte-highlight/languages';
	import { Tweet } from 'sveltekit-embed';

	export let data;
	const { examples } = data;
</script>

<p>
	In this post, I will introduce you to the methods from
	<a href="https://github.com/d3/d3-array">d3-array</a>, which I use often for data visualization.
	All examples run inside your browser using
	<a href="https://stackblitz.com/">StackBlitz</a>. StackBlitz currently supports Chromium-based and
	Firefox browsers only.
</p>

<h2>d3.min, d3.max and d3.extent</h2>

<p>
	<a href="https://github.com/d3/d3-array#min">d3.min</a> returns the minimum of an array using the
	natural order. Unlike
	<a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min"
		>Math.min</a
	>, d3.min can handle missing values.
</p>

<p>Let's look at an example:</p>

<StackblitzEmbed project={examples['d3.min'].project} options={examples['d3.min'].options} />

<p>
	Likewise, <a href="https://github.com/d3/d3-array#max">d3.max</a> returns the maximum. But what
	happens when the array, for which we would like to compute the maximum, contains objects? We can
	use an
	<em>accessor function</em> to retrieve a specific object property and transform it. In the following
	example, accessor
</p>

<figure>
	<Highlight language={javascript} code={`(d) => new Date(d.date);`} />
</figure>

<p>
	extracts the date property and converts it into a JavaScript
	<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date"
		>Date</a
	>, which is used for comparison. This returns the most recent date (maximum). But what we need is
	the object with the most recent date, not just the most recent date. We can use
	<a href="https://github.com/d3/d3-array#maxIndex">d3.maxIndex</a> to retrieve the index of the object
	with the most recent date.
</p>

<p>Let's look at an example:</p>

<StackblitzEmbed project={examples['d3.max'].project} options={examples['d3.max'].options} />

<p>
	To create an axis for numeric values with D3, you need to know the extent of the data along that
	axis. Extent means the minimum and maximum values.
	<a href="https://github.com/d3/d3-array#extent">d3.extent</a> returns an array with these values. It
	not only works with numeric values but with any values that have a natural sort order.
</p>

<p>Let's look at an example:</p>

<StackblitzEmbed project={examples['d3.extent'].project} options={examples['d3.extent'].options} />

<h2>d3.range</h2>

<p>
	<a href="https://github.com/d3/d3-array#range">d3.range</a> returns an array of evenly spaced
	numbers. It has three arguments: <em>start</em>, <em>stop</em> and <em>step</em>. The only
	required attribute is <em>stop</em>. <em>start</em> defaults to 0 and <em>step</em> defaults to 1.
	<em>start</em> is inclusive, <em>stop</em> is exclusive.
</p>

<p>Let's look at an example:</p>

<StackblitzEmbed project={examples['d3.range'].project} options={examples['d3.range'].options} />

<p>
	As the <code>floating_point_range</code> example shows, with d3.range you can run into the
	<a href="https://stackoverflow.com/questions/588004/is-floating-point-math-broken"
		>pitfalls of binary floating point math</a
	>. You can fix this issue with
	<a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed"
		>Number.toFixed</a
	>:
</p>

<figure>
	<Highlight language={javascript} code={`range(0, 1, 0.2).map((n) => n.toFixed(1));`} />
</figure>

<p>
	And finally, if you try to create a range that causes an infinite loop, like the
	<code>infinite_loop_range</code>, d3.range returns an empty array.
</p>

<h2>d3.ticks</h2>

<p>
	<a href="https://github.com/d3/d3-array#ticks">d3.ticks</a> generates an array of nicely-rounded
	numbers inside an interval [<em>start</em>, <em>stop</em>]. You have to pass in three arguments:
</p>

<figure>
	<Highlight language={javascript} code={`ticks(start, stop, count);`} />
</figure>

<p>
	<code>count</code> is the number of ticks you are aiming for. But there is no guarantee that you
	will get this number. As the example below shows, you may get more or fewer ticks. The only thing
	that matters to d3.ticks is that the ticks are nicely rounded and inside [<em>start</em>,
	<em>stop</em>]. <em>start</em> and <em>stop</em> can be part of the ticks.
</p>

<p>Let's look at an example:</p>

<StackblitzEmbed project={examples['d3.ticks'].project} options={examples['d3.ticks'].options} />

<h2>JavaScript Array methods</h2>

<p>
	The <a href="https://github.com/d3/d3-array#d3-array">d3-array documentation</a> points out that
	you should master
	<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
		>JavaScript's built-in Array methods</a
	>. d3-array complements them but does not replace them. You cannot do data visualization with
	JavaScript without knowing built-in Array methods like the back of your hand.
</p>

<p>
	Here is a cheat sheet that is a great starting point to understanding what some of the Array
	methods do:
</p>

<Tweet tweetLink="sulco/status/1281545450273865730" />
