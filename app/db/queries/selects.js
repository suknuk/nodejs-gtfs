const db = require('../index');

function doQuery(queryString, body, callback) {
  db.query(queryString, body)
    .then((dbRes) => {
      callback(null, dbRes);
    })
    .catch((dbErr) => {
      callback(dbErr);
    });
}
