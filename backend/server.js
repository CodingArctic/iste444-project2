var express = require("express");
var logger = require('morgan');
var cors = require('cors');
var fs = require('fs');
var path = require('path');


var app = express();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/db.sqlite')

// create stream for logging to file
const logStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

// custom log format
function customFormat (tokens, req, res) {
    const requestorId = req.body?.requestorId || 'N/A';
    return [
        tokens.method(req, res),
        tokens.url(req, res), '|',
        tokens.status(req, res), 'HTTP Status in',
        tokens['response-time'](req, res), 'ms |',
        'UserID:', requestorId
    ].join(' ');
};

app.use(express.json());

// add morgan with custom logging format and log file stream
app.use(logger(customFormat, { stream: logStream }));

// standard formatted logs to console
app.use(logger('dev'))

app.use(cors());

app.get('/api/init', async function (req, res, next) {
    db.serialize(() => {
        // Drop tables if they exist
        db.run('DROP TABLE IF EXISTS User');
        db.run('DROP TABLE IF EXISTS Car');


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
        const stmt = db.prepare('INSERT INTO User (id, username, password) VALUES (?, ?, ?)');
        stmt.run(1, 'user1', 'password1');
        stmt.run(2, 'user2', 'password2');
        stmt.run(3, 'user3', 'password3');
        stmt.finalize();

        // Insert sample data into Car table
        const stmt2 = db.prepare('INSERT INTO Car (vin, ownerId, make, model, year, mileage, price) VALUES (?, ?, ?, ?, ?, ?, ?)');
        stmt2.run('1GKFC13C88J190122', 1, 'Honda', 'Accord', 2008, 97384, 6500.00);
        stmt2.run('1GKFC13C88J190123', 2, 'Honda', 'Accord', 2009, 95315, 6900.00);
        stmt2.run('1FMNU41S02EA54871', 2, 'Toyota', 'Sienna', 2011, 70853, 9000.00);
        stmt2.finalize();
    });

    res.send('Database reset and initialized.');
});

app.get('/api/cars', async function (req, res, next) {
    db.all('SELECT vin, ownerId, make, model, year, mileage, price FROM Car', (err, rows) => {
        if (rows.length > 1) {
            res.type('application/json')
            res.send(rows)
        }
    })

})

app.get('/api/car/:id', async function (req, res, next) {
    db.get('SELECT vin, ownerId, make, model, year, mileage, price FROM Car WHERE vin = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500)
            res.send(err.message)
        } else if (row) {
            res.type('application/json')
            res.send(row)
        }
        else {
            res.status(404)
            res.send({ error: "No car found with specified VIN" })
        }
    })
})

app.delete('/api/car/:vin', async function (req, res, next) {
    db.run('DELETE FROM Car WHERE vin = ?', req.params.vin, function (err) {
        if (err) {
            res.status(500)
            res.send(err.message)
        } else if (this.changes === 0) {
            res.status(404)
            res.send({ error: "No car found with specified VIN" })
        } else {
            res.status(204).send()
        }
    })
})

app.get('/api/cars/:userId', async function (req, res, next) {
    db.all('SELECT vin, ownerId, make, model, year, mileage, price FROM Car WHERE ownerId = ?', req.params.userId, (err, rows) => {
        if (err) {
            res.status(500)
            res.send(err.message)
        } else if (rows.length > 0) {
            res.type('application/json')
            res.send(rows)
        } else {
            res.status(404)
            res.send({ error: "No cars found with specified ownerId" })
        }
    })
})

app.post('/api/cars', async function (req, res, next) {
    const { vin, ownerId, make, model, year, mileage, price } = req.body;
    db.run("INSERT INTO Car (vin, ownerId, make, model, year, mileage, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [vin, ownerId, make, model, year, mileage, price],
        function (err) {
            if (err) {
                res.status(400)
                res.send(err.message)
            } else if (this.changes === 1) {
                res.status(201).send()
            }
        })
})

app.put('/api/cars', async function (req, res, next) {
    const { vin, ownerId, make, model, year, mileage, price } = req.body;
    db.run("UPDATE Car SET ownerId = ?, make = ?, model = ?, year = ?, mileage = ?, price = ? WHERE vin = ?",
        [ownerId, make, model, year, mileage, price, vin],
        function (err) {
            if (err) {
                res.status(400)
                res.send(err.message)
            } else if (this.changes === 1) {
                res.status(200).send()
            }
        })
})

app.post('/api/auth', async function (req, res, next) {
    const { username, password } = req.body;
    db.get('SELECT id FROM User WHERE username = ? AND password = ?', [username, password], function (err, row) {
        if (err) {
            res.status(500).send(err.message)
        } else if (row) {
            res.json(row)
        } else {
            res.status(404).send()
        }
    })
})

app.listen(8080);
console.log('Express started on localhost:8080');