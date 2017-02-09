const express = require('express');
const app = express();

const protobuf = require('protobufjs');

let MsgReply;
let MsgRequest;
protobuf.load("../proto/data.proto", (err, root) => {
  if (err) throw err;

  MsgRequest = root.lookup("MsgRequest");
  MsgReply   = root.lookup("MsgReply");
});

app.use('/api/binary', (req, res) => {
  // TODO: marshal Request, send reply
  res.send(1337);
});

app.listen('3030', (err) => {
  if (err) {
    console.log('Error serving !', err);
    return;
  }

  console.log('Server listening on http://localhost:3030');
});
