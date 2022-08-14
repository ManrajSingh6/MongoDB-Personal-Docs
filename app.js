// Learning MongoDB - I'm creating personal documentation
// The following applies when using NodeJS

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = "mongodb://localhost:27017";

// Database name
const dbName = 'experimentalDB'

// Creating new Mongo Client
const client = new MongoClient(url);

// Using the connect method to connect to Server
client.connect(function(err){
    assert.equal(null, err);
    console.log("Connected Successfully to server");

    const db = client.db(dbName);

    // Calling the function to insert documents, then closing the
    // connection with the Client once finished insertion
    // insertDocuments(db, function(){
    //     client.close();
    // })

    // Calling the function to find documents, closing the connection after found
    findDocuments(db, function(){
        client.close();
    });
});


// Inserting items into DB
const insertDocuments = function(db, callback){
    // Creating a new collection called 'cars'
    const collection = db.collection('cars');
    // Inserting items into the 'cars' collection
    collection.insertMany([
        // Each item is considered a 'document'
        // Format: {<carName>, <personalRating>}
        {GTR: 10}, 
        {GT3RS: 9},
        {SUPRA: 8.5}
    ], function(err, result){
        // Following line added for validation when inserting
        assert.equal(err, null);
        console.log("Inserted 3 documents into the collection (cars)");
        callback(result);
    });
};

// Reading items from DB
const findDocuments = function(db, callback){
    // Get documents from 'cars' collection
    const collection = db.collection('cars');
    // Find some documents
    collection.find({}).toArray(function(err, cars){
        assert.equal(err, null);
        console.log("Found the following records in (cars): ");
        console.log(cars);
        callback(cars);
    });
};