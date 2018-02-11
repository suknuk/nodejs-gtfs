const express = require('express');
const app = express();

const dbInsertQueries = require('./db/queries/inserts');

qbody = ['myAgencyId2','myAgName','myAgURL','asdasd',null,null,null,null];


dbInsertQueries.insertAgency(qbody, (res,err) => {
  console.log(res);
  console.log(err);
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));