/** @type {import('./$types').PageLoad} */
export function load() {
	return { examples };
}

/** @type {{[key: string]: import('$lib/types').StackBlitzExample}} */
const examples = {
	'd3.min': {
		project: {
			template: 'javascript',
			title: 'd3.min',
			description: 'Compute minimum of an array of numbers with missing values',
			files: {
				'index.html': `<div id="app"></div>`,
				'index.js': `import { min } from 'https://cdn.jsdelivr.net/npm/d3-array@3';

const data = [null, undefined, 2, 3, 4, 5];

// d3.min can handle missing values.
const d3_min = min(data);

// Math.min cannot handle missing values.
const math_min = Math.min(data);

document.querySelector('#app').innerHTML = \`<div>
  <p>d3_min: \${d3_min}</p>
  <p>math_min: \${math_min}</p>
</div>\`;`
			}
		},
		options: {
			openFile: 'index.js'
		}
	},
	'd3.max': {
		project: {
			template: 'javascript',
			title: 'd3.max',
			description: 'Compute maximum of an array of objects using an accessor.',
			files: {
				'index.html': `<div id="app"></div>`,
				'index.js': `import { max, maxIndex } from 'https://cdn.jsdelivr.net/npm/d3-array@3';

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
export const max_date = max(data, accessor);

// Returns index of person with most recent date.
const index = maxIndex(data, accessor);

export const maxPerson = data[index];

document.querySelector('#app').innerHTML = \`<div>
  <p>max_date: \${max_date}</p>
  <p>max_person: \${JSON.stringify(maxPerson)}</p>
</div>\`;`
			}
		},
		options: {
			openFile: 'index.js'
		}
	},
	'd3.extent': {
		project: {
			template: 'javascript',
			title: 'd3.extent',
			description: 'Compute the extent of an array.',
			files: {
				'index.html': `<div id="app"></div>`,
				'index.js': `import { extent } from 'https://cdn.jsdelivr.net/npm/d3-array@3';

const data = [
	{
		name: 'Erich',
		score: 98
	},
	{
		name: 'Amandi',
		score: 79
	},
	{
		name: 'Warner',
		score: 68
	},
	{
		name: 'Obediah',
		score: 31
	},
	{
		name: 'Courtnay',
		score: 55
	},
	{
		name: 'Terri-jo',
		score: 8
	},
	{
		name: 'Harry',
		score: 99
	},
	{
		name: 'Jolynn',
		score: 53
	},
	{
		name: 'Xenia',
		score: 82
	},
	{
		name: 'Trista',
		score: 24
	},
	{
		name: 'Cirillo',
		score: 63
	},
	{
		name: 'Malorie',
		score: 27
	}
];

// d3.extent for score (numbers).
export const score_extent = extent(data, (d) => d.score);

// d3.extent for name (strings).
export const name_extent = extent(data, (d) => d.name);

document.querySelector('#app').innerHTML = \`<div>
  <p>Score extent: \${JSON.stringify(score_extent)}</p>
  <p>Name extent: \${JSON.stringify(name_extent)}</p>
</div>\`;`
			}
		},
		options: {
			openFile: 'index.js'
		}
	},
	'd3.range': {
		project: {
			template: 'javascript',
			title: 'd3.range',
			description: 'Multiple range examples.',
			files: {
				'index.html': `<div id="app"></div>`,
				'index.js': `import { range } from 'https://cdn.jsdelivr.net/npm/d3-array@3';

// start (default): 0
// stop: 10
// step (default): 1
export const stop_range = range(10);

// start: -10
// stop: 0
// step (default): 1
export const start_and_stop_range = range(-10, 0);

// start: 0
// stop: 1
// step: 0.2
export const floating_point_range = range(0, 1, 0.2);

// Round every element to 1 digit after the decimal point.
export const fixed_point_range = range(0, 1, 0.2).map((n) => n.toFixed(1));

// start: 0
// stop: 10
// step: -1
// Never reaches stop value.
export const infinite_loop_range = range(0, 10, -1);

document.querySelector('#app').innerHTML = \`<div>
  <p>stop_range: \${JSON.stringify(stop_range)}</p>
  <p>start_and_stop_range: \${JSON.stringify(start_and_stop_range)}</p>
  <p>floating_point_range: \${JSON.stringify(floating_point_range)}</p>
  <p>fixed_point_range: \${JSON.stringify(fixed_point_range)}</p>
  <p>infinite_loop_range: \${JSON.stringify(infinite_loop_range)}</p>
</div>\`;`
			}
		},
		options: {
			openFile: 'index.js'
		}
	},
	'd3.ticks': {
		project: {
			template: 'javascript',
			title: 'd3.ticks',
			description: 'Multiple ticks examples.',
			files: {
				'index.html': `<div id="app"></div>`,
				'index.js': `import { ticks } from 'https://cdn.jsdelivr.net/npm/d3-array@3';

// start: 0
// stop: 10
// count: 11
// Results in 11 ticks.
export const count_11_ticks = ticks(0, 10, 11);

// start: 0
// stop: 10
// count: 13
// Results in 11 ticks.
export const count_13_ticks = ticks(0, 10, 13);

// start: 0
// stop: 10
// count: 17
// Results in 21 ticks.
export const count_17_ticks = ticks(0, 10, 17);

document.querySelector('#app').innerHTML = \`<div>
  <p>count_11_ticks: \${JSON.stringify(count_11_ticks)} (\${count_11_ticks.length} ticks)</p>
  <p>count_13_ticks: \${JSON.stringify(count_13_ticks)} (\${count_13_ticks.length} ticks)</p>
  <p>count_17_ticks: \${JSON.stringify(count_17_ticks)} (\${count_17_ticks.length} ticks)</p>
</div>\`;`
			}
		},
		options: {
			openFile: 'index.js'
		}
	}
};
