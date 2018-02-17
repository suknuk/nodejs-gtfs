const express = require('express');
const dbSelect = require('../../db/queries/selects');
const { ObjectValues } = require('../routerHelper');

const router = express.Router();

router.get('/fareAttributes', (req, res) => {
  dbSelect.getFareAttributes(Object.keys(req.query), ObjectValues(req.query), (cErr, cRes) => {
    if (cErr) {
      res.status(400).send(cErr);
    } else {
      res.send(cRes.rows);
    }
  });
});

module.exports = router;
