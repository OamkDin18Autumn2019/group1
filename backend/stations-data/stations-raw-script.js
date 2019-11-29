const fs = require ('fs');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/TrainsApp';
let path = './stations.json';
let stationsJSON = undefined;

// reading json from the file

try{
    const jsonString = fs.readFileSync(path);
    stationsJSON = JSON.parse(jsonString);   
} catch (err) {
    console.log(err);
    return;
}

// feeding the database: creating database and inserting records.

MongoClient.connect(url, function(err, db){
    
    let dbh = db.db("TrainsApp");
    dbh.createCollection("stationsRawData", function(err, res){
        // do something if error occurs
    });
    dbh.collection("stationsRawData").insert(stationsJSON);
    console.log("stationsRawData data successfully inserted!")
    db.close();
});


