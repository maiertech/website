import { maxDate, maxPerson } from './max';

document.querySelector('#app').innerHTML = `
  <div>
    <p>maxDate: ${maxDate}</p>
    <p>maxPerson: ${JSON.stringify(maxPerson)}</p>
  </div>
`;
