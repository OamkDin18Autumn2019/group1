// Database settings
const url = 'mongodb://localhost:27017';
const db_name = 'trains';

const MongoClient = require('mongodb').MongoClient;
let mdb = null;


MongoClient.connect(url, { useUnifiedTopology: true },  function (err, client) {
  if (err) { 
    console.error('[ERROR] Failed to connect MongoDB ' + url);
    throw err;
  }
  mdb = client.db(db_name);
  console.log('[INFO] Connected to MongoDB: ' + url + ' using database: ' + db_name);
});


const api = {
  insert: (collection_name, object_to_insert) =>
  {
    console.log('[INFO] api::insert()  collection_name: ' +collection_name + '  object_to_insert:', object_to_insert);
    let promise = new Promise(function(resolve, reject) {
      mdb.collection(collection_name).insertOne(object_to_insert).toArray(function(err, data) {
        if(err) {
          reject(err) 
        } else {
          //console.log(data[0]);
          resolve(data[0]);
        }
      });
    });
    return promise;
  },

  query: (collection_name, query_object) =>
  {
    console.log('[INFO] api::query()  collection_name: ' +collection_name + '  query_object:', query_object);
    let promise = new Promise(function(resolve, reject) {
      mdb.collection(collection_name).find(query_object).toArray(function(err, data) {
        if(err) {
          reject(err) 
        } else {
          //console.log(data[0]);
          resolve(data[0]);
        }
      });
    });
    return promise;
  },

  closeAll: () => {
    mdb.close();
  }
};

module.exports = api;
