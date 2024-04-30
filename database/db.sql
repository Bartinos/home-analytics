CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE active_session (
  id SERIAL PRIMARY KEY,
  person_id INTEGER NOT NULL,
  token VARCHAR UNIQUE NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person (id)
);

CREATE TABLE topic (
  id SERIAL PRIMARY KEY,
  country VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  building VARCHAR NOT NULL,
  space VARCHAR NOT NULL,
  sensor VARCHAR NOT NULL,
  UNIQUE(country, city, building, space, sensor)
);

CREATE TABLE measurement (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER NOT NULL,
  value FLOAT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (topic_id) REFERENCES topic (id)
);



