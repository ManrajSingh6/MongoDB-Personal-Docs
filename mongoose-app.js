// Learning MongoDB - I'm creating personal documentation
// The following applies when using NodeJS
// This is the version using Mongoose ODM

//Will make a conenction to the MongoDB server, the connect to the carsDB
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/carsDB");
console.log("Succesfully connected to db using Mongoose.")

// Inserting items into DB using Mongoose
// 1. Create a new Schema
const carsSchema = new mongoose.Schema({
    name: {
      type: String, 
      required: [true, "Please check your data entry, a name must be specified!"]  
    },
    rating: {
        type: Number,
        min: 0,             // min and max are data validators 
        max: 10
    },
    review: String
});

// 2. Create a new Mongoose model (collection)
// Paramaters -> ("<Singular name of collection - String>", <schemaName>)
const Car = mongoose.model("Car", carsSchema);

// 3. Create a new document
const vehicle = new Car({
    name: "Nissan GTR",
    rating: 10,
    review: "Solid car"
});
// Save the 'vehicle' document into the Car collection inside the carsDB - only run this line once!
// Otherwise it will keep saving the document repeatedly
// vehicle.save();

// Further practice - Mongoose ODM insertion is much simpler
const planeSchema = new mongoose.Schema({
    name: String,
    speed: Number,
    rating: Number
});
const Plane = mongoose.model("Plane", planeSchema);
const airplane = new Plane({
    name: "Airbus A380",
    speed: 1185,
    rating: 10
});
// airplane.save();


// Inserting multiple documents in a collection
// Creating multiple documents
const GT3RS = new Car({
    name: "Porsche GT3RS",
    rating: 10,
    review: "Very fast"
});
const Huracan = new Car({
    name: "Huracan",
    rating: 9,
    review: "Aerodynamic"
});
const McLaren = new Car({
    name: "McLaren",
    rating: 8.5,
    review: "Needs better build quality"
});

// Using insertMany() to insert in DB
// params -> ([<arrayOfDocumentsToAdd>], callBackFunction())
// Car.insertMany([GT3RS, Huracan, McLaren], function(err){
//     if (err){console.log(err);}
//     else{console.log("Success in insertion!");}
// });


// Finding items using Mongoose
// Has a callback function
// params -> (err, <itemsReturnedFromCollection>)
Car.find(function(err, carsReturned){
    if (err){
        console.log(err);
    }
    else{

        // Closing the Mongoose connection
        mongoose.connection.close();

        carsReturned.forEach(function(car){
            console.log(car.name);
        });

    }
});


// Updating and Deleting data using Mongoose
// params -> ({<itemToUpdate>}, {<fieldToUpdate>}, callBackFunction)
Car.updateOne({name: "Huracan"}, {rating: 9.5}, function(err){
    if (err){
        console.log(err);
    }
    else{
        console.log("Sucessfully updated document.")
    }
});

Car.deleteOne({name: "McLaren"}, function(err){
    if (err){
        console.log("Could not delete + '\n'" + err);
    }
    else{
        console.log("Sucessfully deleted item.");
    }
});