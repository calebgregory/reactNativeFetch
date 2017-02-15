import satchelRpc from 'satchel-rpc';
import root from '../proto';

const services = [
  'data.Messager'
];

const options = {
  transportType: 'http',
  url: 'http://locahlost:3030/api'
}

export default satchelRpc.create(root, services, options);
