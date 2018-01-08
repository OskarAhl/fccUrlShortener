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
const Schema = mongoose.Schema;
const urlSchema = new Schema({
    url: String,
    short_url: String,
    url_number: Number,
});
let Url = mongoose.model('Url', urlSchema);

app.use(express.static( __dirname + '/views'));
app.use(express.static( __dirname + '/scripts'));

mongoose.connect('mongodb://localhost:27017/url_parser', { useMongoClient: true });
db = mongoose.connection;
db.on('error', console.error.bind(console,  'db connection error'));
db.once('open', function () {
    app.listen(port, () => console.log('Server running on: ', port));
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/goto/:urlId', (req, res) => {
    let dbUrl;
    Url.findOne({'url_number': req.params.urlId}, (err, dbRes) => {
        if (err) {
            console.log('error: ', err);
            res.send('Something went wrong');
        }
        if (dbRes) {
            dbUrl = dbRes;
            console.log('success: ', dbRes);
            res.redirect(dbRes.url);
        }
    });

});

app.post('/new/:url', (req, res) => {
    if (validUrl.isUri(req.params.url)) {
        let randomNr = randomDigit();
        let newUrl = new Url({
            url: req.params.url,
            short_url: 'http://localhost:8000/goto/' + randomNr,
            url_number: randomNr,
        });
        newUrl.save(function(err, success) {
            if (err) {console.log('Error saving url: ', err); }
            if (success) {
                console.log(`saved: ${newUrl}`);
                res.send(
                    {
                        original_url: newUrl.url,
                        short_url: newUrl.short_url
                    }
                )
                // res.send(`The shortened url is: ${newUrl.short_url}`);        
            }
        })
    } else {
        res.send('Invalid Url: Please try again');
    }
});

// helper functions: 
function randomDigit() {
    return Math.floor(Math.random() * 100000);    
}

