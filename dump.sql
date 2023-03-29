CREATE TABLE
  specialties (
    PRIMARY KEY (id),
    id SERIAL,
    name VARCHAR(50) NOT NULL UNIQUE
  );

CREATE TABLE
  users (
    PRIMARY KEY (id),
    id SERIAL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL UNIQUE
  );

CREATE TABLE
  doctors (
    PRIMARY KEY (id),
    id SERIAL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL UNIQUE,
    specialty_id INTEGER NOT NULL REFERENCES specialties (id)
  );

CREATE TABLE
  doctors_schedule (
    PRIMARY KEY (id),
    id SERIAL,
    doctor_id INTEGER NOT NULL REFERENCES doctors (id),
    date DATE NOT NULL,
    time TIME NOT NULL
  );

CREATE TABLE
  doctors_office (
    PRIMARY KEY (id),
    id SERIAL,
    doctor_id INTEGER NOT NULL REFERENCES doctors (id),
    city VARCHAR(30) NOT NULL,
    state VARCHAR(2) NOT NULL,
    street VARCHAR(255) NOT NULL,
    zip_code VARCHAR(8) NOT NULL,
    neighborhood VARCHAR(255) NOT NULL,
    address_number VARCHAR(6) NOT NULL
  );

CREATE TABLE
  appointments (
    PRIMARY KEY (id),
    id SERIAL,
    user_id INTEGER NOT NULL REFERENCES users (id),
    schedule_id INTEGER NOT NULL REFERENCES doctors_schedule (id),
    is_confirmed BOOLEAN NOT NULL DEFAULT false,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW ()
  );

-- DATA INSERT
INSERT INTO
  specialties (name)
VALUES
  ('Allergy and immunology'),
  ('Anesthesiology'),
  ('Dermatology'),
  ('Diagnostic radiology'),
  ('Emergency medicine'),
  ('Family medicine'),
  ('Internal medicine'),
  ('Medical genetics'),
  ('Neurology'),
  ('Nuclear medicine'),
  ('Obstetrics and gynecology'),
  ('Ophthalmology'),
  ('Pathology'),
  ('Pediatrics'),
  ('Physical medicine and rehabilitation'),
  ('Preventive medicine'),
  ('Psychiatry'),
  ('Radiation oncology'),
  ('Surgery'),
  ('Urology')