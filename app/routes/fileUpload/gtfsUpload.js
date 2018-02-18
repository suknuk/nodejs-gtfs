const express = require('express');
const multer = require('multer');
const StreamZip = require('node-stream-zip');
const fs = require('fs');
const csv = require('fast-csv');
const { ObjectValues } = require('../routerHelper');
const dbInsert = require('../../db/queries/inserts');

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

// Associating the correct insert function with the file
function findInsertFunctionAndInsert(fileName, obj, callback) {
  let insertFunction = null;
  if (fileName === 'agency.txt') {
    insertFunction = dbInsert.insertAgency;
  } else if (fileName === 'stops.txt') {
    insertFunction = dbInsert.insertStop;
  } else if (fileName === 'routes.txt') {
    insertFunction = dbInsert.insertRoute;
  } else if (fileName === 'calendar.txt') {
    insertFunction = dbInsert.insertCalendar;
  } else if (fileName === 'calendar_dates.txt') {
    insertFunction = dbInsert.insertCalendarDate;
  } else if (fileName === 'fare_attributes.txt') {
    insertFunction = dbInsert.insertFareAttribute;
  } else if (fileName === 'fare_rules.txt') {
    insertFunction = dbInsert.insertFareRule;
  } else if (fileName === 'shapes.txt') {
    insertFunction = dbInsert.insertShape;
  } else if (fileName === 'trips.txt') {
    insertFunction = dbInsert.insertTrip;
  } else if (fileName === 'stop_times.txt') {
    insertFunction = dbInsert.insertStopTime;
  } else if (fileName === 'frequencies.txt') {
    insertFunction = dbInsert.insertFrequency;
  } else if (fileName === 'transfers.txt') {
    insertFunction = dbInsert.insertTransfer;
  } else if (fileName === 'feed_info.txt') {
    insertFunction = dbInsert.insertFeedInfo;
  }

  if (insertFunction != null) {
    insertFunction(Object.keys(obj), ObjectValues(obj), (err) => {
      if (err) {
        console.log(err);
      }
      callback();
    });
  }
}

function insertCSVdata(fileName) {
  return new Promise(((resolve, reject) => {
    // Check if file exists
    fs.stat(`extracted/${fileName}`, (err, stat) => {
      if (err == null) {
        // Count lines of file
        let lineCount = 0;
        let insertedTimes = 0;
        fs.createReadStream(`extracted/${fileName}`)
          .on('data', (chunk) => {
            for (let i = 0; i < chunk.length; i += 1) {
              if (chunk[i] === 10) lineCount += 1;
            }
          })
          .on('end', () => {
            const stream = fs.createReadStream(`extracted/${fileName}`);

            csv.fromStream(stream, { headers: true })
              .on('data', (data) => {
                findInsertFunctionAndInsert(fileName, data, () => {
                  
                  insertedTimes += 1;
                  // console.log(`inserting finished. times = ${insertedTimes}, total = ${lineCount}`);
                  if (insertedTimes === lineCount) {
                    resolve();
                  }
                });
              })
              .on('end', () => {
                console.log(`${fileName} done`);
              });
          });
      } else {
        console.log(`${fileName} does not exist`);
        resolve();
      }
    });
  }));
}

// async block insertion to not validate DB constraints
const insertOrder = async () => {
  await insertCSVdata('agency.txt');
  await insertCSVdata('stops.txt');
  await insertCSVdata('routes.txt');
  await insertCSVdata('calendar.txt');
  await insertCSVdata('calendar_dates.txt');
  await insertCSVdata('fare_attributes.txt');
  await insertCSVdata('fare_rules.txt');
  await insertCSVdata('shapes.txt');
  await insertCSVdata('trips.txt');
  await insertCSVdata('stop_times.txt');
  await insertCSVdata('frequencies.txt');
  await insertCSVdata('transfers.txt');
  await insertCSVdata('feed_info.txt');
};

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
        insertOrder();
        zip.close();
      });
    });

    return res.end('Upload successfull\n');
  });
});

module.exports = router;
