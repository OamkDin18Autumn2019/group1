const express = require("express");
const async = require("express-async-await");
const fetch = require("node-fetch");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("static"));
app.use(bodyParser.json());
let trainNumber = undefined;

app.post("/api/train-num", (req, res) => {
    const trainNum = req.body;
    db.collection("user_values").insertOne(trainNum);
    res.send("the value has been added");
    db.collection("user_values").findOne().then(result => {
        trainNumber = result.trainNum;
        console.log(trainNumber); 
    });
});

app.get("/api/train-info", async function (req, res, next){
    function fetchData(){
        return fetch(`https://rata.digitraffic.fi/api/v1/trains/latest/${trainNumber}`);
    }
    const processData = async () => {
        const fetchedData = await fetchData();
        const trainJson = await fetchedData.json();
        const trainCategory = trainJson[0].trainCategory;
        const scheduledTime = trainJson[0].timeTableRows[0].scheduledTime;
        const actualTime = trainJson[0].timeTableRows[0].actualTime;
        const trackNumber = trainJson[0].timeTableRows[0].commercialTrack;
        res.send({"trainCategory": trainCategory, "scheduledTime": scheduledTime, "actualTime": actualTime, "trackNumber": trackNumber});
    }
    processData();
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