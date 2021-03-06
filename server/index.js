const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const proto = require('../proto');

const app = express();
app.use(bodyParser.raw());
app.use((req, res, next) => {
  console.log('<-', req.method, req.url, 'body', req.body)
  return next();
});

/* Service Implementations, formatted as tuple
 *   [
 *     service_name,
 *     {
 *       [methodName]: (ctx, req, cb) => { ...cb(err, resp) }
 *     }
 *  ]
 */
const messager = [ 'Messager', {
  sendMsg: (ctx, request, cb) => {
    console.log('sendMsg', request)
    // just send back a simple response 'ok'.
    return cb(null, { caller: 'server', response: 'ok', request });
  }
} ];

/*
 * array of tuples, formatted
 *   [ protobuf_name, service_tuple ]
 * (see above for service_tuple format)
 */
const protobufs = [
  ['data', messager]
];

/*
 * serve and listen, routing /api calls to handler
 */
function init(root, app, protobufs) {
  const server  = getServer(root, protobufs)
  const handler = getHandler(server)

  app.use('/api', handler);

  app.listen('3030', (err) => {
    if (err) {
      console.log('Error serving !', err);
      return;
    }

    console.log('Server listening on http://localhost:3030');
  });
}

/*
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

/*
 * @param server - generated by getServer above, formatted as object
 *   {
 *     [service_path]: ProtobufService
 *   }
 *
 * , e.g.,
 *
 *   {
 *     "/root.Messager/": Service { ... SendMsg() {...} ... }
 *   }
 */
function getHandler(server) {
  return function handler(req, res) {
    const service = req.headers['x-rpc-service'];
    const method  = req.headers['x-rpc-method'];

    if (!server[service] || !server[service][method]) {
      return res.sendStatus(404)
    }

    const ctx = {}; // if we had req.user, e.g., it would go on here

    try {
      server[service][method](ctx, req.body, function(error, resp) {
        if (error) {
          console.error(`[prom-cb] :( calling service func. service: ${service} method: ${method} error: ${error}`)
          res.sendStatus(500);
        }

        console.log('->', req.method, req.url, 'resp', resp)
        res.send(resp);
      })
    } catch(error) {
      console.error(`[try-caught] :( calling service func. service: ${service} method: ${method} error: ${error}`)
      res.sendStatus(500);
    }
  }
}

/*
 * vroom vroom, motherfuckers
 */
init(proto, app, protobufs);
