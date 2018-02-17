const express = require('express');
const router = require('./routes/index');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', router);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
