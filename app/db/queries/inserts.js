const db = require('../index');

function doQuery(queryString, body, callback) {
  db.query(queryString, body)
    .then(dbRes => {
      callback(null, dbRes);
    })
    .catch(dbErr => {
      callback(dbErr);
    });
}

var self = module.exports = {

  insertAgency: function(body, callback) {
    queryString = `
    INSERT INTO agency(agency_id, agency_name, agency_url, agency_timezone,
      agency_lang, agency_phone, agency_fare_url, agency_email)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;

    doQuery(queryString, body, callback);
  },

  insertStop: function(body, callback) {
    queryString = `
    INSERT INTO stops(stop_id, stop_code, stop_name, stop_desc, stop_position, 
      zone_id, stop_url, location_type, parent_station, stop_timezone,
      wheelchair_boarding)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;

    doQuery(queryString, body, callback);
  }, 

  insertRoute: function(body, callback) {
    queryString = `
    INSERT INTO routes(route_id, agency_id, route_short_name, route_long_name,
      route_desc, route_type, route_url, route_color, route_text_color,
      route_sort_order)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;

    doQuery(queryString, body, callback);
  }, 

  insertCalendar: function(body, callback) {
    queryString = `
    INSERT INTO calendar(service_id, monday, tuesday, wednesday, thursday,
      friday, saturday, sunday, start_date, end_date)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;

    doQuery(queryString, body, callback);
  }, 

  insertCalendarDate: function(body, callback) {
    queryString = `
    INSERT INTO calendar_dates(service_id, date, exception_type)
    VALUES ($1,$2,$3)`;

    doQuery(queryString, body, callback);
  }

}