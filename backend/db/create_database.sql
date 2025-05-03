DROP TABLE IF EXISTS Car

CREATE TABLE Car (
    vin TEXT PRIMARY KEY,
    ownerId INTEGER REFERENCES User,
    make TEXT,
    year INTEGER,
    mileage INTEGER,
    price INTEGER
);

DROP TABLE IF EXISTS User

CREATE TABLE User (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT
);