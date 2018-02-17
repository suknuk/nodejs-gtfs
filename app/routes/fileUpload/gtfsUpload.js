const express = require('express');
const multer = require('multer');
const StreamZip = require('node-stream-zip');
const fs = require('fs');

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

    // upload has succeeded, unzip file
    const zip = new StreamZip({
      file: req.file.path,
      storeEntries: true,
    });

    // Handle errors
    zip.on('error', err => res.end(err));

    zip.on('ready', () => {
      // create directory if it does not exist
      if (!fs.existsSync('extracted')) {
        fs.mkdirSync('extracted');
      }
      zip.extract(null, './extracted', (err, count) => {
        console.log(err ? 'Extract error' : `Extracted ${count} entries`);
        zip.close();
      });
    });

    return res.end('yay');
  });
});

module.exports = router;
