const express = require('express');
const dbSelect = require('../../db/queries/selects');
const { ObjectValues } = require('../routerHelper');

const router = express.Router();

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
