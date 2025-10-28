<script>
	// @ts-nocheck
	import { min } from 'd3-array';

	const data = [null, undefined, 2, 3, 4, 5];

	const mathMin = Math.min(data);
	const d3Min = min(data);
</script>

<ul>
	<li>mathMin: {mathMin}</li>
	<li>d3Min: {d3Min}</li>
</ul>
