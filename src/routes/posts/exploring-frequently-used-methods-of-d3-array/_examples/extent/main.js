import { scoreExtent, nameExtent } from './extent';

document.querySelector('#app').innerHTML = `
  <div>
    <p>Score extent: ${JSON.stringify(scoreExtent)}</p>
    <p>Name extent: ${JSON.stringify(nameExtent)}</p>
  </div>
`;
