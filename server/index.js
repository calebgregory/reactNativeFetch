const path = require('path');
const express = require('express');
const proto = require('./proto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

function init(root, app, protobufs) {
  const server = getServer(root, protobufs)
  console.log(server);

  const handle = getHandler(server)

  app.use('/api', handle);

  app.listen('3030', (err) => {
    if (err) {
      console.log('Error serving !', err);
      return;
    }

    console.log('Server listening on http://localhost:3030');
  });
}

/**
 * @param root      - generated code using protobufs
 * @param protobufs - formatted [ protobuf_name, servers ],
 *                    servers formatted [ server_name, server_methods ]
 *                    server_methods formatted { method_name: (ctx:Object, req:Object, callback:Function) }
 */
function getServer(root, protobufs) {
  const server = protobufs
    .reduce((acc, [ protobufName, [serviceName, serviceMethods] ]) => {
      const servicePath = `${protobufName}.${serviceName}`;
      const service = {
        [`/${servicePath}/`]: root[protobufName][`${serviceName}Server`].create(serviceMethods)
      };

      return Object.assign( {}, acc, service );
    }, {});

  return server;
}

function getHandler(server) {
  return function handle(req, res) {
    const service = req.headers['x-rpc-service'];
    const method  = req.headers['x-rpc-method'];

    if (!server[service] || !server[service][method]) {
      return res.sendStatus(404)
    }
    const ctx = {}; // if we had req.user, e.g., it would go on here

    try {
      server[service][method](ctx, req.body)
        .then((resp) => { // <- byte buffer
          res.send(resp);
        })
        .catch((error) => {
          console.error(`[prom-caught] :( calling service func. service: ${service} method: ${method} error: ${error}`)
          res.sendStatus(500);
        })
    } catch(error) {
      console.error(`[try-caught] :( calling service func. service: ${service} method: ${method} error: ${error}`)
      res.sendStatus(500);
    }
  }
}

/* Service Implementations, formated [service_name, { methods }] */
const messager = [ 'Messager', {
  sendMsg: (ctx, request, cb) => {
    // just send back a simple response 'ok'.
    return cb(null, { caller: 'server', response: 'ok', request });
  }
}];

/* array of tuples [protobuf_name, service_tuples] */
const protobufs = [
  ['data', messager]
];

init(proto, app, protobufs);
