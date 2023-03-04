import {
	stopArgRange,
	startAndStopArgsRange,
	floatingPointRange,
	toFixedRange,
	infiniteLoopRange
} from './range';

document.querySelector('#app').innerHTML = `
  <div>
    <p>stopArgRange: ${JSON.stringify(stopArgRange)}</p>
    <p>startAndStopArgsRange: ${JSON.stringify(startAndStopArgsRange)}</p>
    <p>floatingPointRange: ${JSON.stringify(floatingPointRange)}</p>
    <p>toFixedRange: ${JSON.stringify(toFixedRange)}</p>
    <p>infiniteLoopRange: ${JSON.stringify(infiniteLoopRange)}</p>
  </div>
`;
