var express = require("express");
var logger = require('morgan');

var app = express();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

app.use(logger('dev'));
app.use(express.json());

db.serialize(() => {
    db.run('CREATE TABLE lorem (info TEXT)')
    const stmt = db.prepare('INSERT INTO lorem VALUES (?)')

    for (let i = 0; i < 10; i++) {
        stmt.run(`Car ${i}`)
    }

    stmt.finalize()
})

app.get('/api/cars', async function (req, res, next) {
    // db.all('SELECT vin, ownerId, make, mileage, price FROM Car', (err, rows) => {
    db.all('SELECT * FROM lorem', (err, rows) => {
        if (rows.length > 1) {
        res.type('application/json')
        res.send(rows)
    }
    })
    
})

app.get('/api/cars/:id', async function (req, res, next) {
  db.get('SELECT * FROM lorem WHERE rowid = ?', req.params.id, (err, row) => {
    if (err) {
        res.status(500 )
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