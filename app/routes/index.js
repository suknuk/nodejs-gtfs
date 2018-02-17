const express = require('express');
const dbSelect = require('../db/queries/selects');

const router = express.Router();

function ObjectValues(obj) {
  const keys = Object.keys(obj);
  const vals = [];
  for (let i = 0; i < keys.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(obj, keys[i])) {
      vals.push(obj[keys[i]]);
    }
  }
  return vals;
}

router.get('/agency', (req, res) => {
  // console.log(`keys: ${Object.keys(req.query)}`);
  // console.log(`vals: ${ObjectValues(req.query)}`);

  dbSelect.getAgency(Object.keys(req.query), ObjectValues(req.query), (cErr, cRes) => {
    if (cErr) {
      res.status(400).send(cErr);
    } else {
      res.send(cRes.rows);
    }
  });
});

module.exports = router;
