const express = require('express');
const app = express();

app.use('/api/binary', (req, res) => {
  const data = [0x4D, 0x41, 0x20, 0x44, 0x41, 0x57, 0x47];
  res.send(Buffer.from(data));
});

app.listen('3030', (err) => {
  if (err) {
    console.log('Error serving !', err);
    return;
  }

  console.log('Server listening on http://localhost:3030');
});
