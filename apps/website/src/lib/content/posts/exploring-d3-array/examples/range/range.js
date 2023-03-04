import { range } from 'd3-array';

// start (default): 0
// stop: 10
// step (default): 1
export const stopArgRange = range(10);

// start: -10
// stop: 0
// step (default): 1
export const startAndStopArgsRange = range(-10, 0);

// start: 0
// stop: 1
// step: 0.2
export const floatingPointRange = range(0, 1, 0.2);

// Round every element of range to 1 digit after the decimal point.
export const toFixedRange = range(0, 1, 0.2).map((n) => n.toFixed(1));

// start: 0
// step: -1
// Never reaches stop value 10.
export const infiniteLoopRange = range(0, 10, -1);
