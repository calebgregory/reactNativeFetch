const path = require('path');
const express = require('express');
const protobuf = require('protobufjs');

const app = express();

/* Load protocol buffer root */
let root = false;
protobuf.load(path.resolve(__dirname, './data.proto'), (err, _root) => {
  if (err) throw err;

  root = _root;
});

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

function getServer(root /* protobuf */, protobufs /* [protobuf_name, [[service_name, service_methods]]] */) {
  const server = protobufs
    .reduce((acc, [protobufName, [serviceName, methods] ]) => {
      const servicePath = `${protobufName}.${serviceName}`;
      const Service = root.lookup(servicePath);
      const service = {
        [`/${servicePath}/`]: Service.create(methods)
      };

      return Object.assign( {}, acc, service );
    }, {});

  return server;
}

function getHandler(server) {
  return function handle(req, res) {
    const service = req.headers['x-rpc-service'];
    const method  = req.headers['x-rpc-method'];

    try {
      const ctx = {};
      server[service][method](ctx, req.body)
        .then((resp) => {
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
const messagerService = [ 'Messager', {
  sendMsg: (ctx, request, cb) => {
    // just send back a simple response 'ok'.
    return cb(null, { caller: 'server', response: 'ok', request });
  }
}];

/* array of tuples [protobuf_name, service_tuples] */
const protobufs = [
  ['data', messagerService]
];

function tryInit([t0, t1], n) {
  if (n > 10) {
    console.log("Tried 10 times and still no root. Sorry.")
    return;
  }

  if (root) {
    init(root, app, protobufs);
    return;
  }

  setTimeout(() => tryInit([t1, t0 + t1], n + 1), t1)
}

tryInit([0, 100], 0)
