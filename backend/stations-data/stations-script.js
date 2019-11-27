const fs = require ('fs');
const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/TrainsApp';
let path = './stations.json';
let stationsJSON = undefined;
let stationNames = [];
let stationFirstLetters = [];
let stationFirstLettersUnique = [];
let stationsOrdered = [];

// reading json from the file

try{
    const jsonString = fs.readFileSync(path);
    stationsJSON = JSON.parse(jsonString);   
} catch (err) {
    console.log(err);
    return;
}

// parsing json

for (var i=0; i<stationsJSON.length; i++){    
    stationNames.push(stationsJSON[i].stationName);
}
for (var i=0; i<stationNames.length; i++){
    stationFirstLetters.push(stationNames[i].slice(0,1));
}
for (var i=0; i<stationFirstLetters.length; i++){
    if(stationFirstLetters[i] !== stationFirstLetters[i+1]){
        stationFirstLettersUnique.push(stationFirstLetters[i]);
    }
}

for (var i=0; i<stationFirstLettersUnique.length; i++){
    let outterObj = new Object();
    outterObj.cate_name = stationFirstLettersUnique[i];
    outterObj[stationFirstLettersUnique[i]] = [];
    for (var j=0; j<stationFirstLetters.length; j++){
        if (stationFirstLetters[j] === stationFirstLettersUnique[i]) {
            let innerObj = new Object();
            innerObj.stationId = stationsJSON[j].stationShortCode;
            innerObj.stationName = stationsJSON[j].stationName;
            outterObj[stationFirstLettersUnique[i]].push(innerObj);
        }
    }
    stationsOrdered.push(outterObj);
}

// feeding the database: creating database and inserting records.

MongoClient.connect(url, function(err, db){
    
    let dbh = db.db("TrainsApp");
    dbh.createCollection("stations", function(err, res){
        // do something if error occurs
    });
    dbh.collection("stations").insertMany(stationsOrdered);
    console.log("stations data successfully inserted!")
    db.close();
});


