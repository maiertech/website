import { max, maxIndex } from 'd3-array';

const data = [
  {
    first_name: 'Tanhya',
    last_name: 'Grinnikov',
    date: '6/17/2022',
  },
  {
    first_name: 'Shayne',
    last_name: 'Tresler',
    date: '12/24/2021',
  },
  {
    first_name: 'Hans',
    last_name: 'Coffee',
    date: '6/3/2022',
  },
  {
    first_name: 'Miquela',
    last_name: 'Prangle',
    date: '6/24/2022',
  },
];

// Accessor retrieves and transforms a property value.
const accessor = (d) => new Date(d.date);

// Apply d3.max to array of transformed date properties (returns most recent date).
export const maxDate = max(data, accessor);

// Get index of person with most recent date.
const index = maxIndex(data, accessor);
export const maxPerson = data[index];
