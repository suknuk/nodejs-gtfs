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
function findInsertFunctionAndInsert(fileName, obj) {
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
    });
  }
}

function insertCSVdata(fileName) {
  return new Promise(((resolve, reject) => {
    fs.stat(`extracted/${fileName}`, (err, stat) => {
      if (err == null) {
        const stream = fs.createReadStream(`extracted/${fileName}`);

        csv.fromStream(stream, { headers: true })
          .on('data', (data) => {
            // console.log(`${entry.name} ${JSON.stringify(data)} ${Object.keys(data)}`);
            console.log(`${fileName} ${Object.keys(data)} ::: ${ObjectValues(data)}`);
            findInsertFunctionAndInsert(fileName, data);
          })
          .on('end', () => {
            console.log(`${fileName} done`);
            resolve();
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
  // await insertCSVdata('fare_rules.txt');
  // await insertCSVdata('shapes.txt');
  /*
  await insertCSVdata('trips.txt');
  await insertCSVdata('stop_times.txt');
  await insertCSVdata('frequencies.txt');
  await insertCSVdata('transfers.txt');
  await insertCSVdata('feed_info.txt');
  */
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

    /*
    zip.on('entry', (entry) => {
      const stream = fs.createReadStream(`extracted/${entry.name}`);

      csv
        .fromStream(stream, { headers: true })
        .on('data', (data) => {
          // console.log(`${entry.name} ${JSON.stringify(data)} ${Object.keys(data)}`);
          console.log(`${entry.name} ${Object.keys(data)} ::: ${ObjectValues(data)}`);
          findInsertFunction(entry.name, data);
        })
        .on('end', () => {
          console.log(`${entry.name} done`);
        });
    });
    */

    zip.on('ready', () => {
      // create directory if it does not exist
      if (!fs.existsSync('extracted')) {
        fs.mkdirSync('extracted');
      }
      zip.extract(null, './extracted', (err, count) => {
        // console.log(err ? 'Extract error' : `Extracted ${count} entries`);
        // console.log(Object.keys(zip.entries()));
        /*
        if (Object.prototype.hasOwnProperty.call(zip.entries(), 'agency.txt')) {
          console.log('has agency');
        }
        */
        insertOrder();
        zip.close();
      });
    });

    return res.end('Upload successfull\n');
  });
});

module.exports = router;
