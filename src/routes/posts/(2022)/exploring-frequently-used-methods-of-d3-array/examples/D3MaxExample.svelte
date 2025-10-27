<script>
	// @ts-nocheck
	import { max, maxIndex } from 'd3-array';

	const data = [
		{
			first_name: 'Tanhya',
			last_name: 'Grinnikov',
			date: '2022-06-17'
		},
		{
			first_name: 'Shayne',
			last_name: 'Tresler',
			date: '2021-12-24'
		},
		{
			first_name: 'Hans',
			last_name: 'Coffee',
			date: '2022-06-03'
		},
		{
			first_name: 'Miquela',
			last_name: 'Prangle',
			date: '2022-06-24'
		}
	];

	const accessor = (d) => new Date(d.date);

	// Returns most recent date.
	export const maxDate = max(data, accessor);

	// Returns index of person with most recent date.
	const index = maxIndex(data, accessor);
</script>

<ul>
	<li>maxDate: {maxDate}</li>
	<li>maxIndex: {index}</li>
</ul>
