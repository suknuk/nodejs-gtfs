const db = require('../index');

function whereStatementCreation(attributes, values) {
  if (attributes.length > 0 && attributes.length === values.length) {
    let whereString = ' WHERE ';
    for (let i = 0; i < attributes.length; i += 1) {
      // Adding 'AND' for every where condition that is not the first
      if (i > 0) {
        whereString += ' AND ';
      }
      whereString += `${attributes[i]} = ${values[i]}`;
    }
    return whereString;
  }
  return '';
}

function doQuery(query, attributes, values, callback) {
  const queryString = query + whereStatementCreation(attributes, values);
  db.query(queryString)
    .then((dbRes) => {
      callback(null, dbRes);
    })
    .catch((dbErr) => {
      callback(dbErr);
    });
}

const functions = {
  getAgency(attributes, values, callback) {
    const queryString = 'SELECT * FROM agency';
    doQuery(queryString, attributes, values, callback);
  },

  getStops(attributes, values, callback) {
    const queryString = 'SELECT * FROM stops';
    doQuery(queryString, attributes, values, callback);
  },

  getRoutes(attributes, values, callback) {
    const queryString = 'SELECT * FROM routes';
    doQuery(queryString, attributes, values, callback);
  },

  getCalendar(attributes, values, callback) {
    const queryString = 'SELECT * FROM calendar';
    doQuery(queryString, attributes, values, callback);
  },

  getCalendarDate(attributes, values, callback) {
    const queryString = 'SELECT * FROM calendar_dates';
    doQuery(queryString, attributes, values, callback);
  },

  getFareAttributes(attributes, values, callback) {
    const queryString = 'SELECT * FROM fare_attributes';
    doQuery(queryString, attributes, values, callback);
  },

  getFareFareRules(attributes, values, callback) {
    const queryString = 'SELECT * FROM fare_rules';
    doQuery(queryString, attributes, values, callback);
  },

  getShapes(attributes, values, callback) {
    const queryString = 'SELECT * FROM shapes';
    doQuery(queryString, attributes, values, callback);
  },

  getTrips(attributes, values, callback) {
    const queryString = 'SELECT * FROM trips';
    doQuery(queryString, attributes, values, callback);
  },

  getStopTimes(attributes, values, callback) {
    const queryString = 'SELECT * FROM stop_times';
    doQuery(queryString, attributes, values, callback);
  },

  getFrequencies(attributes, values, callback) {
    const queryString = 'SELECT * FROM frequencies';
    doQuery(queryString, attributes, values, callback);
  },

  getTransfers(attributes, values, callback) {
    const queryString = 'SELECT * FROM transfers';
    doQuery(queryString, attributes, values, callback);
  },

  getFeedInfo(attributes, values, callback) {
    const queryString = 'SELECT * FROM feed_info';
    doQuery(queryString, attributes, values, callback);
  },
};

export default functions;
