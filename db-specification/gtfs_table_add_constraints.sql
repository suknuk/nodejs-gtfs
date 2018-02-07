begin;


ALTER TABLE agency 
  ADD CONSTRAINT agency_id_unique UNIQUE(agency_id),
  ALTER COLUMN agency_name SET NOT NULL,
  ALTER COLUMN agency_url SET NOT NULL,
  ALTER COLUMN agency_timezone SET NOT NULL;


ALTER TABLE stops
  ADD PRIMARY KEY (stop_id),
  ADD CONSTRAINT location_type_fk 
    FOREIGN KEY (location_type)
    REFERENCES location_types(location_type),
  ADD CONSTRAINT parent_station_fk 
    FOREIGN KEY (parent_station)
    REFERENCES stops(stop_id),
  ADD CONSTRAINT wheelchair_boarding_fk 
    FOREIGN KEY (wheelchair_boarding)
    REFERENCES wheelchair_boardings(wheelchair_boarding);


commit;