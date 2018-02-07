begin;


ALTER TABLE agency 
  ADD CONSTRAINT agency_id_unique UNIQUE(agency_id),
  ALTER COLUMN agency_name SET NOT NULL,
  ALTER COLUMN agency_url SET NOT NULL,
  ALTER COLUMN agency_timezone SET NOT NULL;


ALTER TABLE stops
  ADD CONSTRAINT stops_stop_id_pk
    PRIMARY KEY (stop_id),
  ALTER COLUMN stop_name SET NOT NULL,
  ALTER COLUMN stop_position SET NOT NULL,
  ADD CONSTRAINT stops_location_type_fk 
    FOREIGN KEY (location_type)
    REFERENCES location_types(location_type),
  ADD CONSTRAINT stops_parent_station_fk 
    FOREIGN KEY (parent_station)
    REFERENCES stops(stop_id),
  ADD CONSTRAINT stops_wheelchair_boarding_fk 
    FOREIGN KEY (wheelchair_boarding)
    REFERENCES wheelchair_boardings(wheelchair_boarding);


ALTER TABLE routes
  ADD CONSTRAINT routes_route_id_pk
    PRIMARY KEY (route_id),
  ALTER COLUMN route_short_name SET NOT NULL,
  ALTER COLUMN route_long_name SET NOT NULL,
  ALTER COLUMN route_type SET NOT NULL,
  ADD CONSTRAINT routes_agency_id_fk 
    FOREIGN KEY (agency_id)
    REFERENCES agency(agency_id),
  ADD CONSTRAINT routes_route_type_fk 
    FOREIGN KEY (route_type)
    REFERENCES route_types(route_type);


ALTER TABLE calendar
  ADD CONSTRAINT calendar_service_id_pk
    PRIMARY KEY (service_id),
  ALTER COLUMN monday SET NOT NULL,
  ALTER COLUMN tuesday SET NOT NULL,
  ALTER COLUMN wednesday SET NOT NULL,
  ALTER COLUMN thursday SET NOT NULL,
  ALTER COLUMN friday SET NOT NULL,
  ALTER COLUMN saturday SET NOT NULL,
  ALTER COLUMN sunday SET NOT NULL,
  ALTER COLUMN start_date SET NOT NULL,
  ALTER COLUMN end_date SET NOT NULL;


ALTER TABLE calendar_dates
  ALTER COLUMN service_id SET NOT NULL,
  ALTER COLUMN date SET NOT NULL,
  ALTER COLUMN exception_type SET NOT NULL,
  ADD CONSTRAINT calendar_dates_service_id_fk
    FOREIGN KEY (service_id)
    REFERENCES calendar(service_id);


ALTER TABLE fare_attributes
  ADD CONSTRAINT fare_attributes_fare_id_fk
    PRIMARY KEY (fare_id),
  ALTER COLUMN price SET NOT NULL,
  ALTER COLUMN currency_type SET NOT NULL,
  ALTER COLUMN payment_method SET NOT NULL,
  ALTER COLUMN transfers SET NOT NULL,
  ADD CONSTRAINT fare_attributes_payment_method_fk
    FOREIGN KEY (payment_method)
    REFERENCES payment_methods(payment_method),
  ADD CONSTRAINT fare_attributes_agency_id_fk
    FOREIGN KEY (agency_id)
    REFERENCES agency(agency_id);


ALTER TABLE fare_rules
  ALTER COLUMN fare_id SET NOT NULL,
  ADD CONSTRAINT fare_rules_fare_id_fk
    FOREIGN KEY (fare_id)
    REFERENCES fare_attributes(fare_id),
  ADD CONSTRAINT fare_rules_route_id_fk
    FOREIGN KEY (route_id)
    REFERENCES routes(route_id);


ALTER TABLE shapes
  ADD CONSTRAINT shapes_shape_id_pk
    PRIMARY KEY (shape_id),
  ALTER COLUMN shape_point SET NOT NULL,
  ALTER COLUMN shape_pt_sequence SET NOT NULL;


ALTER TABLE trips
  ADD CONSTRAINT trips_trip_id_pk
    PRIMARY KEY (trip_id),
  ALTER COLUMN route_id SET NOT NULL,
  ALTER COLUMN service_id SET NOT NULL,
  ADD CONSTRAINT trips_route_id_fk
    FOREIGN KEY (route_id)
    REFERENCES routes(route_id),
  ADD CONSTRAINT trips_service_id_fk
    FOREIGN KEY (service_id)
    REFERENCES calendar(service_id),
  ADD CONSTRAINT trips_direction_id_fk
    FOREIGN KEY (direction_id)
    REFERENCES directions(direction_id);


ALTER TABLE stop_times
  ALTER COLUMN trip_id SET NOT NULL,
  ALTER COLUMN arrival_time SET NOT NULL,
  ALTER COLUMN departure_time SET NOT NULL,
  ALTER COLUMN stop_id SET NOT NULL,
  ALTER COLUMN stop_sequence SET NOT NULL,
  ADD CONSTRAINT stop_times_trip_id_fk
    FOREIGN KEY (trip_id)
    REFERENCES trips(trip_id),
  ADD CONSTRAINT stop_times_stop_id_fk
    FOREIGN KEY (stop_id)
    REFERENCES stops(stop_id),
  ADD CONSTRAINT stop_times_pickup_type_fk
    FOREIGN KEY (pickup_type)
    REFERENCES pickup_dropoff_types(type_id),
  ADD CONSTRAINT stop_times_drop_off_type_fk
    FOREIGN KEY (drop_off_type)
    REFERENCES pickup_dropoff_types(type_id),
  ADD CONSTRAINT stop_times_arrival_time_check
    CHECK (arrival_time LIKE '__:__:__'),
  ADD CONSTRAINT stop_times_departure_time_check
    CHECK (departure_time LIKE '__:__:__');

CREATE INDEX stop_times_stop_sequence_index 
  ON stop_times(trip_id,stop_sequence);



ALTER TABLE frequencies
  ALTER COLUMN trip_id SET NOT NULL,
  ALTER COLUMN start_time SET NOT NULL,
  ALTER COLUMN end_time SET NOT NULL,
  ALTER COLUMN headway_secs SET NOT NULL,
  ADD CONSTRAINT frequencies_stop_id_fk
    FOREIGN KEY (trip_id)
    REFERENCES trips(trip_id);


ALTER TABLE transfers
  ALTER COLUMN from_stop_id SET NOT NULL,
  ALTER COLUMN to_stop_id SET NOT NULL,
  ALTER COLUMN transfer_type SET NOT NULL,
  ADD CONSTRAINT transfers_transfer_type_fk
    FOREIGN KEY (transfer_type)
    REFERENCES transfer_types(transfer_type);


ALTER TABLE feed_info
  ALTER COLUMN feed_publisher_name SET NOT NULL,
  ALTER COLUMN feed_publisher_url SET NOT NULL,
  ALTER COLUMN feed_lang SET NOT NULL;

commit;