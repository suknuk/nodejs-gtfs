
ALTER TABLE feed_info
  ALTER COLUMN feed_publisher_name DROP NOT NULL,
  ALTER COLUMN feed_publisher_url DROP NOT NULL,
  ALTER COLUMN feed_lang DROP NOT NULL;


ALTER TABLE transfers
  ALTER COLUMN from_stop_id DROP NOT NULL,
  ALTER COLUMN to_stop_id DROP NOT NULL,
  ALTER COLUMN transfer_type DROP NOT NULL,
  DROP CONSTRAINT transfers_transfer_type_fk CASCADE;


ALTER TABLE frequencies
  ALTER COLUMN trip_id DROP NOT NULL,
  ALTER COLUMN start_time DROP NOT NULL,
  ALTER COLUMN end_time DROP NOT NULL,
  ALTER COLUMN headway_secs DROP NOT NULL,
  DROP CONSTRAINT frequencies_stop_id_fk CASCADE;


drop index stop_times_stop_sequence_index;

ALTER TABLE stop_times
  ALTER COLUMN trip_id DROP NOT NULL,
  ALTER COLUMN arrival_time DROP NOT NULL,
  ALTER COLUMN departure_time DROP NOT NULL,
  ALTER COLUMN stop_id DROP NOT NULL,
  ALTER COLUMN stop_sequence DROP NOT NULL,
  DROP CONSTRAINT stop_times_trip_id_fk CASCADE,
  DROP CONSTRAINT stop_times_stop_id_fk CASCADE,
  DROP CONSTRAINT stop_times_pickup_type_fk CASCADE,
  DROP CONSTRAINT stop_times_drop_off_type_fk CASCADE,
  DROP CONSTRAINT stop_times_arrival_time_check,
  DROP CONSTRAINT stop_times_departure_time_check;


ALTER TABLE trips
  DROP CONSTRAINT trips_trip_id_pk CASCADE,
  ALTER COLUMN route_id DROP NOT NULL,
  ALTER COLUMN service_id DROP NOT NULL,
  DROP CONSTRAINT trips_route_id_fk CASCADE,
  DROP CONSTRAINT trips_service_id_fk CASCADE,
  DROP CONSTRAINT trips_direction_id_fk CASCADE;


ALTER TABLE shapes
  DROP CONSTRAINT shapes_shape_id_pk CASCADE,
  ALTER COLUMN shape_point DROP NOT NULL,
  ALTER COLUMN shape_pt_sequence DROP NOT NULL;


ALTER TABLE fare_rules
  ALTER COLUMN fare_id DROP NOT NULL,
  DROP CONSTRAINT fare_rules_fare_id_fk CASCADE,
  DROP CONSTRAINT fare_rules_route_id_fk CASCADE;


ALTER TABLE fare_attributes
  DROP CONSTRAINT fare_attributes_fare_id_fk CASCADE,
  ALTER COLUMN price DROP NOT NULL,
  ALTER COLUMN currency_type DROP NOT NULL,
  ALTER COLUMN payment_method DROP NOT NULL,
  ALTER COLUMN transfers DROP NOT NULL,
  DROP CONSTRAINT fare_attributes_payment_method_fk CASCADE,
  DROP CONSTRAINT fare_attributes_agency_id_fk CASCADE;


ALTER TABLE calendar_dates
  ALTER COLUMN service_id DROP NOT NULL,
  ALTER COLUMN date DROP NOT NULL,
  ALTER COLUMN exception_type DROP NOT NULL,
  DROP CONSTRAINT calendar_dates_service_id_fk CASCADE;


ALTER TABLE calendar
  DROP CONSTRAINT calendar_service_id_pk CASCADE,
  ALTER COLUMN monday DROP NOT NULL,
  ALTER COLUMN tuesday DROP NOT NULL,
  ALTER COLUMN wednesday DROP NOT NULL,
  ALTER COLUMN thursday DROP NOT NULL,
  ALTER COLUMN friday DROP NOT NULL,
  ALTER COLUMN saturday DROP NOT NULL,
  ALTER COLUMN sunday DROP NOT NULL,
  ALTER COLUMN start_date DROP NOT NULL,
  ALTER COLUMN end_date DROP NOT NULL;


ALTER TABLE routes
  DROP CONSTRAINT routes_route_id_pk CASCADE,
  ALTER COLUMN route_short_name DROP NOT NULL,
  ALTER COLUMN route_long_name DROP NOT NULL,
  ALTER COLUMN route_type DROP NOT NULL,
  DROP CONSTRAINT routes_agency_id_fk CASCADE,
  DROP CONSTRAINT routes_route_type_fk CASCADE;


ALTER TABLE stops
  ALTER COLUMN stop_name DROP NOT NULL,
  ALTER COLUMN stop_position DROP NOT NULL,
  DROP CONSTRAINT stops_location_type_fk CASCADE,
  DROP CONSTRAINT stops_parent_station_fk,
  DROP CONSTRAINT stops_wheelchair_boarding_fk CASCADE,
  DROP CONSTRAINT stops_stop_id_pk;


ALTER TABLE agency
  DROP CONSTRAINT agency_id_unique,
  ALTER COLUMN agency_name DROP NOT NULL,
  ALTER COLUMN agency_url DROP NOT NULL,
  ALTER COLUMN agency_timezone DROP NOT NULL;

