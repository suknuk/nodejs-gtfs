const express = require('express');
const multer = require('multer');

const router = express.Router();

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: Storage,
}).single('gtfs');

router.post('/addGTFS', upload, (req, res) => {
  upload(req, res, (uErr) => {
    if (uErr) {
      return res.end('Some error');
    }
    // console.log(req.file);
    return res.end('yay');
  });
});

module.exports = router;
