const   express         = require('express'),
        app             = express(),
        port            = 8000,
        mongoose        = require('mongoose'),
        shortId         = require('shortid'),
        validUrl        = require('valid-url');

const   MongoClient         = require('mongodb').MongoClient,
        assert              = require('assert'),
        ObjectId            = require('mongodb').ObjectID,
        path                = require('path');

let db;
app.use(express.static( __dirname + '/views'));
app.use(express.static( __dirname + '/scripts'));

MongoClient.connect('mongodb://localhost:27017/url_parser', (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(port, () => console.log('Server running on: ', port));
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/new/:url', (req, res) => {
    console.log(req.params);
    if (validUrl.isUri(req.params.url)) {
        res.send(`url param is ${req.params.url}`);        
    } else {
        res.send('Invalid Url: Please try again');
    }
})

