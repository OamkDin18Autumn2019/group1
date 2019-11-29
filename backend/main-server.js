const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require('cors');

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

let db;
MongoClient.connect("mongodb://localhost/TrainsApp").then(connection => {
    db = connection.db("TrainsApp");
    app.listen(4000, () => {
        console.log('App started on port 4000');
    });
}).catch(error => {
    console.log("ERROR: ", error);
});
