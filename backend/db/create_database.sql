CREATE TABLE Car (
    vin INTEGER PRIMARY KEY,
    ownerId INTEGER REFERENCES User
    make TEXT,
    year INTEGER,
    MILAGE INTEGER,
    price INTEGER,
)

CREATE TABLE User (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password BLOB,
)