const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

const saltRounds = 4;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/all_stations', (req, res) => {
    db.collection('stations').find().toArray()
    .then(categories => {
        const total_count = {count: categories.length};
        res.json({_total_count: total_count, categories: categories });
    }).catch(error => {
        console.log(error);
    });
});

app.get('/api/stations_raw_data', (req, res) => {
    db.collection('stationsRawData').find().toArray()
    .then(data => {
        const total_count = {count: data.length};
        res.json({_total_count: total_count, data: data });
    }).catch(error => {
        console.log(error);
    });
});

app.post('/api/resolve_station', (req, res) => {
    const stationReq = req.body;
    db.collection('stations').find({cate_name: stationReq.letter}).toArray()
    .then(arr => {
        let letter = arr[0].cate_name;
        res.json(arr[0][letter]);
    });
});


// Register a new user
// Needs following arguments: full_name, username, password
// Returns response with status 201 for OK or status 500 for ERROR (with error message)
app.post('/api/users/register', (req, res) => {
  console.log('[INFO] main-server.js post(/api/users/register) full_name:"' + req.body.full_name + '" username:"' + req.body.username + '" password:"' + req.body.password +'"');

  // First check if username already exists in database
  db.collection('users').find({ username: req.body.username }).toArray().then(arr => {
    if(arr.length != 0) {
      // Results found for given username, send error response
      console.log('[INFO] main-server.js post(/api/users/register) username:"' + req.body.username + '" already exists, sending error response(500, Username already exists)');
      res.status(500).send('Username already exists');
    } else {
      // Hash password and insert new user to database
      bcrypt.hash(req.body.password, saltRounds).then(hash => {
        console.log('[INFO] main-server.js post(/api/users/register) db insertOne(full_name:"' + req.body.full_name + '" username:"' + req.body.username + '" password:"' + hash +'")');
        db.collection('users').insertOne({ full_name: req.body.full_name, username: req.body.username, password: hash }).then(arr => {
          res.sendStatus(201);
        }).catch(error =>  {
          console.log('[ERROR] main-server.js post(/api/users/register) db insertOne() failed: ' + error);
          res.sendStatus(500)
        })
      }).catch(error =>  {
        console.log('[ERROR] main-server.js post(/api/users/register) bcrypt.hash failed: ' + error);
        res.sendStatus(500)
      })
    }
  }).catch(error => {
    console.log('[ERROR] main-server.js post(/api/users/register) db find() failed: ' + error);
    return res.sendStatus(500);
  });
});


// Used for checking user authentication
passport.use(new Strategy((username, password, cb) => {
  console.log('[INFO] main-server.js passport.use() username:"' + username + '" password:"' + password + '"');
  // Check if username exists in database
  db.collection('users').find({ username: username }).toArray().then(arr => {
    if(arr.length == 1) {
      // Found given username, check if password from database matches with given password
      bcrypt.compare(password, arr[0].password).then(bcryptResult => {
        if(bcryptResult == true) {
           console.log('[INFO] main-server.js passport.use() authentication succesful');
          cb(null, { id: arr[0]._id, username: arr[0].username, full_name: arr[0].full_name });
        } else {
           console.log('[INFO] main-server.js passport.use() authentication failed');
          return cb(null, false);
        }
      })
    } else {
      // Username not found from database
      console.log('[INFO] main-server.js passport.use() username:"' + username + '" not found from db');
      return cb(null, false);
    }
  }).catch(error => {
    console.log('[ERROR] main-server.js passport.use() db find() failed: ' + error);
    return cb(null, false);
  });
}));


// Checks user login and authentication
// Needs following arguments: username
// Returns users full name in argument full_name if authetication is succesful
app.get('/api/users/login',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    // Send back user full name
    res.json( { full_name: req.user } );
});


let db;
MongoClient.connect("mongodb://localhost/TrainsApp", { useUnifiedTopology: true }).then(connection => {
    db = connection.db("TrainsApp");
    app.listen(4000, () => {
        console.log('App started on port 4000');
    });
}).catch(error => {
    console.log("ERROR: ", error);
});
