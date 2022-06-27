import { extent } from 'd3-array';

const data = [
  {
    name: 'Erich',
    score: 98,
  },
  {
    name: 'Amandi',
    score: 79,
  },
  {
    name: 'Warner',
    score: 68,
  },
  {
    name: 'Obediah',
    score: 31,
  },
  {
    name: 'Courtnay',
    score: 55,
  },
  {
    name: 'Terri-jo',
    score: 8,
  },
  {
    name: 'Harry',
    score: 99,
  },
  {
    name: 'Jolynn',
    score: 53,
  },
  {
    name: 'Xenia',
    score: 82,
  },
  {
    name: 'Trista',
    score: 24,
  },
  {
    name: 'Cirillo',
    score: 63,
  },
  {
    name: 'Malorie',
    score: 27,
  },
];

// d3.extent for score: [8, 99].
export const scoreExtent = extent(data, (d) => d.score);

// d3.extent for name: ["Amandi", "Xenia"]
export const nameExtent = extent(data, (d) => d.name);
