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
  },

  insertFareAttribute: function(body, callback) {
    queryString = `
    INSERT INTO fare_attributes(fare_id, price, currency_type, payment_method,
      transfers, agency_id, transfer_duration)
    VALUES ($1,$2,$3,$4,$5,$6,$7)`;

    doQuery(queryString, body, callback);
  },

  insertFareRule: function(body, callback) {
    queryString = `
    INSERT INTO fare_rules(fare_id, route_id, origin_id, destination_id,
      contains_id)
    VALUES ($1,$2,$3,$4,$5)`;

    doQuery(queryString, body, callback);
  },

  insertFareAttribute: function(body, callback) {
    queryString = `
    INSERT INTO fare_attributes(fare_id, price, currency_type, payment_method,
      transfers, agency_id, transfer_duration)
    VALUES ($1,$2,$3,$4,$5,$6,$7)`;

    doQuery(queryString, body, callback);
  },

  insertShape: function(body, callback) {
    queryString = `
    INSERT INTO shapes(shape_id, shape_point, shape_pt_sequence,
      shape_dist_traveled)
    VALUES ($1,$2,$3,$4)`;

    doQuery(queryString, body, callback);
  },

  insertTrip: function(body, callback) {
    queryString = `
    INSERT INTO trips(route_id, service_id, trip_id, trip_headsign,
      trip_short_name, direction_id, block_id, shape_id,
      wheelchair_accessible, bikes_allowed)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;

    doQuery(queryString, body, callback);
  },

  insertStopTime: function(body, callback) {
    queryString = `
    INSERT INTO stop_times(trip_id, arrival_time, departure_time, stop_id,
      stop_sequence, stop_headsign, pickup_type, drop_off_type,
      shape_dist_traveled, timepoint)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;

    doQuery(queryString, body, callback);
  },

  insertFrequency: function(body, callback) {
    queryString = `
    INSERT INTO frequencies(trip_id, start_time, end_time, headway_secs,
      exact_times)
    VALUES ($1,$2,$3,$4,$5)`;

    doQuery(queryString, body, callback);
  },

  insertTransfer: function(body, callback) {
    queryString = `
    INSERT INTO transfers(from_stop_id, to_stop_id, transfer_type,
      min_transfer_time)
    VALUES ($1,$2,$3,$4)`;

    doQuery(queryString, body, callback);
  },

  insertFeedInfo: function(body, callback) {
    queryString = `
    INSERT INTO feed_info(feed_publisher_name, feed_publisher_url,
      feed_lang, feed_start_date, feed_end_date, feed_version)
    VALUES ($1,$2,$3,$4,$5,$6)`;

    doQuery(queryString, body, callback);
  }
  

}