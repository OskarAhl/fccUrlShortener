const   express         = require('express'),
        app             = express(),
        port            = 8000,
        mongoose        = require('mongoose');

const   MongoClient         = require('mongodb').MongoClient,
        assert              = require('assert'),
        ObjectId            = require('mongodb').ObjectID,
        path                = require('path');

let db;
app.use(express.static( __dirname + '/views'));

MongoClient.connect('mongodb://localhost:27017/url_parser', (err, database) => {
    if (err) return console.log(err);
    db = database;
    db.collection('url').save({test: 'test'});
    app.listen(port, () => console.log('Server running on: ', port));
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/new/:url', (req, res) => {
    res.send(`url param is ${req.params.url}`);
})

