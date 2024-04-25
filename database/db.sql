CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  password VARCHAR
);

CREATE TABLE active_session (
  id SERIAL PRIMARY KEY,
  person_id INTEGER,
  token VARCHAR,
  FOREIGN KEY (person_id) REFERENCES person (id)
);

CREATE TABLE measurement (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER,
  value FLOAT,
  FOREIGN KEY (topic_id) REFERENCES topic (id)
);

CREATE TABLE topic (
  id SERIAL PRIMARY KEY,
  country VARCHAR,
  city VARCHAR,
  building VARCHAR,
  space VARCHAR,
  sensor VARCHAR
);


