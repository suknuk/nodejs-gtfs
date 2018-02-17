const db = require('../../db/index');

// import { query } from '../index';

function insertQueryCreation(tableName, attributes, values) {
  if (attributes.length < 1 || attributes.length !== values.length) {
    return '';
  }
  let queryString = `INSERT INTO ${tableName}(`;

  // attribute name addition
  for (let i = 0; i < attributes.length; i += 1) {
    // Add comma for each attribute after the first one
    if (i > 0) {
      queryString += ',';
    }
    queryString += attributes[i];
  }
  queryString += ') VALUES(';

  // attribute value addition
  for (let i = 0; i < values.length; i += 1) {
    // Add comma for each value after the first one
    if (i > 0) {
      queryString += ',';
    }
    queryString += values[i];
  }
  queryString += ')';

  return queryString;
}

function doQuery(tableName, attributes, values, callback) {
  const queryString = insertQueryCreation(tableName, attributes, values);
  db.query(queryString)
    .then((dbRes) => {
      callback(null, dbRes);
    })
    .catch((dbErr) => {
      callback(dbErr);
    });
}

const functions = {

  insertAgency(attributes, values, callback) {
    doQuery('agency', attributes, values, callback);
  },

  insertStop(attributes, values, callback) {
    doQuery('stops', attributes, values, callback);
  },

  insertRoute(attributes, values, callback) {
    doQuery('routes', attributes, values, callback);
  },

  insertCalendar(attributes, values, callback) {
    doQuery('calendar', attributes, values, callback);
  },

  insertCalendarDate(attributes, values, callback) {
    doQuery('calendar_dates', attributes, values, callback);
  },

  insertFareAttribute(attributes, values, callback) {
    doQuery('fare_attributes', attributes, values, callback);
  },

  insertFareRule(attributes, values, callback) {
    doQuery('fare_rules', attributes, values, callback);
  },

  insertShape(attributes, values, callback) {
    doQuery('shapes', attributes, values, callback);
  },

  insertTrip(attributes, values, callback) {
    doQuery('trips', attributes, values, callback);
  },

  insertStopTime(attributes, values, callback) {
    doQuery('stop_times', attributes, values, callback);
  },

  insertFrequency(attributes, values, callback) {
    doQuery('frequencies', attributes, values, callback);
  },

  insertTransfer(attributes, values, callback) {
    doQuery('transfers', attributes, values, callback);
  },

  insertFeedInfo(attributes, values, callback) {
    doQuery('feed_info', attributes, values, callback);
  },

};

export default functions;
