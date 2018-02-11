-- many things taken from https://github.com/cbick/gtfs_SQL_importer/tree/master/src


begin;

create table agency (
  agency_id       text,--UNIQUE
  agency_name     text,-- NOT NULL
  agency_url      text,-- NOT NULL
  agency_timezone text,-- NOT NULL
  agency_lang     text,
  agency_phone    text,
  agency_fare_url text,
  agency_email    text
);


--related to stops(location_type)
create table location_types (
  location_type int PRIMARY KEY,
  description   text
);

insert into location_types(location_type, description) 
  values (0,'stop');
insert into location_types(location_type, description) 
  values (1,'station');
insert into location_types(location_type, description) 
  values (2,'station entrance/exit');

--related to stops(wheelchair_boarding)
create table wheelchair_boardings (
  wheelchair_boarding int PRIMARY KEY,
  description         text
);

insert into wheelchair_boardings(wheelchair_boarding, description)
  values (0, 'No accessibility information available for the stop');
insert into wheelchair_boardings(wheelchair_boarding, description)
  values (1, 'At least some vehicles at this stop can be boarded by a rider in a wheelchair');
insert into wheelchair_boardings(wheelchair_boarding, description)
  values (2, 'Wheelchair boarding is not possible at this stop');

create table stops (
  stop_id       text,--PRIMARY KEY
  stop_code     text,
  stop_name     text, --NOT NULL
  stop_desc     text,
  stop_position geometry(Point, 4326), --NOT NULL
  zone_id       text,
  stop_url      text,
  location_type   int, --FOREIGN KEY REFERENCES location_types(location_type)
  parent_station  text, --FOREIGN KEY REFERENCES stops(stop_id)
  stop_timezone   text,
  wheelchair_boarding int --FOREIGN KEY REFERENCES wheelchair_boardings(wheelchair_boarding)
);


create table route_types (
  route_type int PRIMARY KEY,
  description text
);

insert into route_types (route_type, description) values (0, 'Street Level Rail');
insert into route_types (route_type, description) values (1, 'Underground Rail');
insert into route_types (route_type, description) values (2, 'Intercity Rail');
insert into route_types (route_type, description) values (3, 'Bus');
insert into route_types (route_type, description) values (4, 'Ferry');
insert into route_types (route_type, description) values (5, 'Cable Car');
insert into route_types (route_type, description) values (6, 'Suspended Car');
insert into route_types (route_type, description) values (7, 'Steep Incline Rail');

create table routes (
  route_id    text ,--PRIMARY KEY
  agency_id   text , --FOREIGN KEY REFERENCES agency(agency_id)
  route_short_name  text, --NOT NULL
  route_long_name   text, --NOT NULL
  route_desc  text,
  route_type  int , --NOT NULL FOREIGN KEY REFERENCES route_types(route_type)
  route_url   text,
  route_color text,
  route_text_color  text,
  route_sort_order int
);


create table calendar (
  service_id  text,--PRIMARY KEY,
  monday      NUMERIC(1), --NOT NULL
  tuesday     NUMERIC(1), --NOT NULL
  wednesday   NUMERIC(1), --NOT NULL
  thursday    NUMERIC(1), --NOT NULL
  friday      NUMERIC(1), --NOT NULL
  saturday    NUMERIC(1), --NOT NULL
  sunday      NUMERIC(1), --NOT NULL
  start_date  date, --NOT NULL
  end_date    date  --NOT NULL
);

create table calendar_dates (
  service_id  text, --REFERENCES calendar(service_id)
  date        date, --NOT NULL
  exception_type int  --NOT NULL
);


create table payment_methods (
  payment_method  NUMERIC(1) PRIMARY KEY,
  description     text
);

insert into payment_methods (payment_method, description) values (0,'On Board');
insert into payment_methods (payment_method, description) values (1,'Prepay');

create table fare_attributes (
  fare_id       text,--PRIMARY KEY
  price         double precision,--NOT NULL
  currency_type text,--NOT NULL
  payment_method NUMERIC(1),--NOT NULL REFERENCES payment_methods,
  transfers         int, --NOT NULL
  agency_id         text,--REFERENCES agency(agency_id)
  transfer_duration int
);

create table fare_rules (
  fare_id     text, --NOT NULL REFERENCES fare_attributes(fare_id),
  route_id    text, --REFERENCES routes(route_id),
  origin_id   text, -- referencing zone TODO
  destination_id text, -- referencing zone TODO
  contains_id text -- referencing zone TODO
);


create table shapes (
  shape_id    text, --PRIMARY KEY
  shape_point geometry(Point, 4326), --NOT NULL
  shape_pt_sequence int, --NOT NULL
  shape_dist_traveled double precision
);


create table directions (
  direction_id int PRIMARY KEY,
  description text
);

insert into directions (direction_id, description) values (0,'Travel in one direction ');
insert into directions (direction_id, description) values (1,'Travel in the opposite direction');

create table trips (
  route_id      text, --NOT NULL REFERENCES routes(route_id),
  service_id    text, --NOT NULL REFERENCES calendar(service_id),
  trip_id       text, --PRIMARY KEY,
  trip_headsign text,
  trip_short_name text,
  direction_id  int, --REFERENCES directions(direction_id),
  block_id      text,
  shape_id      text,  
  wheelchair_accessible int, --TODO
  bikes_allowed int --TODO
);



create table pickup_dropoff_types (
  type_id     int PRIMARY KEY,
  description text
);

insert into pickup_dropoff_types (type_id, description) values (0,'Regularly Scheduled');
insert into pickup_dropoff_types (type_id, description) values (1,'Not available');
insert into pickup_dropoff_types (type_id, description) values (2,'Phone arrangement only');
insert into pickup_dropoff_types (type_id, description) values (3,'Driver arrangement only');

create table stop_times (
  trip_id       text, --NOT NULL REFERENCES trips(trip_id),
  arrival_time  text, --NOT NULL CHECK (arrival_time LIKE '__:__:__'),
  departure_time text, --NOT NULL CHECK (departure_time LIKE '__:__:__'),
  stop_id       text, --NOT NULL REFERENCES stops(stop_id),
  stop_sequence int, --NOT NULL,
  stop_headsign text,
  pickup_type   int, --REFERENCES pickup_dropoff_types(type_id),
  drop_off_type int, --REFERENCES pickup_dropoff_types(type_id),
  shape_dist_traveled double precision,
  timepoint int
);


create table frequencies (
  trip_id     text, --NOT NULL REFERENCES trips(trip_id),
  start_time  text, --NOT NULL,
  end_time    text, --NOT NULL,
  headway_secs int, --NOT NULL
  exact_times int
);



create table transfer_types (
  transfer_type int PRIMARY KEY,
  description text
);

insert into transfer_types (transfer_type, description) 
  values (0,'Recommended transfer point');
insert into transfer_types (transfer_type, description) 
  values (1,'Timed transfer point');
insert into transfer_types (transfer_type, description) 
  values (2,'Timed transfer point with minimum amount of time');
insert into transfer_types (transfer_type, description) 
  values (3,'Transfers not possible');

create table transfers (
  from_stop_id  text, --NOT NULL REFERENCES stops(stop_id)
  to_stop_id    text, --NOT NULL REFERENCES stops(stop_id)
  transfer_type int, --NOT NULL REFERENCES transfer_types(transfer_type)
  min_transfer_time int --TODO check
);


create table feed_info (
  feed_publisher_name text, --NOT NULL
  feed_publisher_url  text, --NOT NULL
  feed_lang           text, --NOT NULL
  feed_start_date text,
  feed_end_date   text,
  feed_version    text  
);

commit;