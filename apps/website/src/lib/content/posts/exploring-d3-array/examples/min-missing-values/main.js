import { d3Min, mathMin } from './min';

document.querySelector('#app').innerHTML = `
  <div>
    <p>d3Min: ${d3Min}</p>
    <p>mathMin: ${mathMin}
  </div>
`;
