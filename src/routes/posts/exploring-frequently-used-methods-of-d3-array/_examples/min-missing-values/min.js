import { min } from 'd3-array';

const data = [null, undefined, 2, 3, 4, 5];

// d3.min can handle missing values.
export const d3Min = min(data);

// Math.min can't handle missing values.
export const mathMin = Math.min(data);
