<script>
	// @ts-nocheck
	import { ticks } from 'd3-array';

	// start: 0
	// stop: 10
	// count: 11
	// Results in 11 ticks.
	export const elevenTicks = ticks(0, 10, 11);

	// start: 0
	// stop: 10
	// count: 13
	// Results in 11 ticks.
	export const thirteenTicks = ticks(0, 10, 13);

	// start: 0
	// stop: 10
	// count: 17
	// Results in 21 ticks.
	export const seventeenTicks = ticks(0, 10, 17);
</script>

<ul>
	<li>elevenTicks: {JSON.stringify(elevenTicks)} ({elevenTicks.length} ticks)</li>
	<li>thirteenTicks: {JSON.stringify(thirteenTicks)} ({thirteenTicks.length} ticks)</li>
	<li>seventeenTicks: {JSON.stringify(seventeenTicks)} ({seventeenTicks.length} ticks)</li>
</ul>
