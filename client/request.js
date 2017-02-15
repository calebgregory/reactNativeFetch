const generateHttpRpcImpl = require('./rpc-impl/http');

const SUPPORTED_TRANSPORT_TYPES = [ 'http' ];

/**
 * @param root - generated protobuf code
 * @param services - list of services, formatted [{ protobufName, serviceName }]
 * @param config - configuration for transport layer
 *    options:
 *      - transportType _default "http"_
 *      - url           if trasnportType = 'http', url endpoint of server API (required)
 *      - auth          object <- { type: 'basic', apiKey<String>, apiSecret<String> },
 *                                { type: 'token', token<String> }
 *                       _default { type: 'none' }_
 *      - respDecorator decorator function wrapping the callback, to do something with
 *                      the response before returning response.body to the caller
 *                      _default function(next) { return next; }_. for example, you will
 *                      want to use this to respond to receiving response with header
 *                      "X-Token-Will-Expire-In-T-Minutes".
 *
 * @return interface - returns request fan-in object, with camelcased method names,
 *   generated from the services param and config object.
 */
function create(root, services, config) {
  // declare default options
  config = Object.assign({}, config, {
    transportType : config.transportType || 'http',
    auth          : config.auth || { type: 'none' },
  });

  // validate these options
  validate(config);

  const clients = services.reduce((acc, s) => {
    const service = createClient(root, s.protobufName, s.serviceName, config);
    const methodName = camelize(s.serviceName);
    acc[ methodName ] = service;
    return acc;
  }, {})

  return clients;
}

function validate(config) {
  let errors = [];
  if (SUPPORTED_TRANSPORT_TYPES.indexOf(config.transportType) < 0) {
    errors.push(new Error(`Invalid transport type: "${config.transportType}". transportType must be one of ${SUPPORTED_TRANSPORT_TYPES}.`));
  }
  if (config.transportType === 'http' && !config.url) {
    errors.push(new Error('Given transportType = "http", but no url provided. Please provide a url in the config.'));
  }

  if (errors.length > 0) {
    throw errors;
  }
}

function camelize(str) {
  return `${str[0].toLowerCase()}${str.slice(1)}`;
}

function createClient(root, protobufName, serviceName, config) {
  const rpcImpl = generateRpcImpl(protobufName, serviceName, config);

  return root[protobufName][serviceName].create(rpcImpl, false, false);
}

function generateRpcImpl(protobufName, serviceName, config) {
  const servicePath = `/${protobufName}.${serviceName}/`;

  switch (config.transportType) {
    case 'http': // 'http' is default value for transportType (see `create`)
      const httpRpcImpl = generateHttpRpcImpl(servicePath, config);
      return httpRpcImpl;
  }
}

/* ################################################## */

import root from '../proto';

const API_URL = 'http://localhost:3030/api';

var services = [
  {protobufName: 'data', serviceName: 'Messager'}
];

var options = {
  transportType   : 'http',
  url             : API_URL
};

const client = create(root, services, options)
export default client;
