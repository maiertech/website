import { ticks } from 'd3-array';

// start: 0
// stop: 10
// count: 11
// Results in 11 ticks.
export const count11Ticks = ticks(0, 10, 11);

// start: 0
// stop: 10
// count: 13
// Results in 11 ticks.
export const count13Ticks = ticks(0, 10, 13);

// start: 0
// stop: 10
// count: 17
// Results in 21 ticks.
export const count17Ticks = ticks(0, 10, 17);
