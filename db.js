const mongoose = require('mongoose');


//Define mongodb url
const mongoURL = 'mongodb://127.0.0.1:27017/hotels' // replace mydatabase with your database name in this case it is hotels



//setup mongodb connection 
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;



// define eventListner for database connection

db.on('connected', () =>{
    console.log("Connected to mongodb");

});

db.on('error', () =>{
    console.log("Mongodb connection error");

})

db.on('disconnected', () =>{
    console.log("Mongodb disconnected");

}) 



//export the database connection 

module.exports =db;









