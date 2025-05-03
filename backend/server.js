var express = require("express");
var logger = require('morgan');
var cors = require('cors');

var app = express();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/db.sqlite')

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.get('/api/init', async function (req, res, next) {
    db.serialize(() => {
        // Drop tables if they exist
        db.run('DROP TABLE IF EXISTS Car');
        db.run('DROP TABLE IF EXISTS User');

        // Create tables
        db.run(`
            CREATE TABLE Car (
                vin TEXT PRIMARY KEY,
                ownerId INTEGER REFERENCES User,
                make TEXT,
                model TEXT,
                year INTEGER,
                mileage INTEGER,
                price INTEGER
            )
        `);
        db.run(`
            CREATE TABLE User (
                id INTEGER PRIMARY KEY,
                username TEXT,
                password TEXT
            )
        `);

        // Insert sample data into User table
        const stmt = db.prepare('INSERT INTO User (id, username) VALUES (?, ?)');
        stmt.run(1, 'user1');
        stmt.run(2, 'user2');
        stmt.finalize();

        // Insert sample data into Car table
        const stmt2 = db.prepare('INSERT INTO Car (vin, ownerId, make, model, year, mileage, price) VALUES (?, ?, ?, ?, ?, ?, ?)');
        stmt2.run('1GKFC13C88J190122', 1, 'Honda', 'Accord', 2008, 97384, 6500.00);
        stmt2.run('1FMNU41S02EA54871', 2, 'Toyota', 'Sienna', 2011, 70853, 9000.00);
        stmt2.finalize();
    });

    res.send('Database reset and initialized.');
});

app.get('/api/cars', async function (req, res, next) {
    db.all('SELECT vin, ownerId, make, model, year, mileage, price FROM Car', (err, rows) => {
    // db.all('SELECT rowid AS id, * FROM lorem', (err, rows) => {
        if (rows.length > 1) {
            res.type('application/json')
            res.send(rows)
        }
    })

})

app.get('/api/cars/:id', async function (req, res, next) {
    db.get('SELECT * FROM lorem WHERE rowid = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500)
            res.send(err.message)
        } else if (row) {
            res.type('application/json')
            res.send(row)
        }
        else {
            res.status(404)
            res.send('Car not found')
        }
    })
})

app.post('/api/cars', async function (req, res, next) {
    db.run("INSERT INTO lorem VALUES (?)", req.query.name, function (err) {
        if (err) {
            res.status(500)
            res.send(err.message)
        } else if (this.changes === 1) {
            res.status(201).send()
        }
    })

})

app.delete('/api/cars/:id', async function (req, res, next) {
    db.run('DELETE FROM lorem WHERE rowid = ?', req.params.id, function (err) {
        if (err) {
            res.status(500)
            res.send(err.message)
        } else if (this.changes === 0) {
            res.status(404)
            res.send('Car not found')
        } else {
            res.status(204).send()
        }
    })
})

app.listen(8080);
console.log('Express started on localhost:8080');