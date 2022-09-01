import { count11Ticks, count13Ticks, count17Ticks } from './ticks';

document.querySelector('#app').innerHTML = `
  <div>
    <p>count11Ticks: ${JSON.stringify(count11Ticks)} (${
  count11Ticks.length
} ticks)</p>
    <p>count13Ticks: ${JSON.stringify(count13Ticks)} (${
  count13Ticks.length
} ticks)</p>
    <p>count17Ticks: ${JSON.stringify(count17Ticks)} (${
  count17Ticks.length
} ticks)</p>
  </div>
`;
