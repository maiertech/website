<script>
	// @ts-nocheck
	import { range } from 'd3-array';

	// start (default): 0
	// stop: 10
	// step (default): 1
	export const stopRange = range(10);

	// start: -10
	// stop: 0
	// step (default): 1
	export const startAndStopRange = range(-10, 0);

	// start: 0
	// stop: 1
	// step: 0.2
	export const floatingPointRange = range(0, 1, 0.2);

	// Round every element to 1 digit after the decimal point.
	export const fixedPointRange = range(0, 1, 0.2).map((n) => n.toFixed(1));

	// start: 0
	// stop: 10
	// step: -1
	// Never reaches stop value.
	export const infiniteLoopRange = range(0, 10, -1);
</script>

<ul>
	<li>stopRange: {JSON.stringify(stopRange)}</li>
	<li>startAndStopRange: {JSON.stringify(startAndStopRange)}</li>
	<li>floatingPointRange: {JSON.stringify(floatingPointRange)}</li>
	<li>fixedPointRange: {JSON.stringify(fixedPointRange)}</li>
	<li>infiniteLoopRange: {JSON.stringify(infiniteLoopRange)}</li>
</ul>
