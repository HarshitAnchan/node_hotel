const mongoose = require('mongoose');
require('dotenv').config();

//Define mongodb url
// const mongoURL = process.env.MONGODB_URL_LOCAL // replace mydatabase with your database name in this case it is hotels
// const mongoURL ='mongodb+srv://helloworld:Harshit8069@cluster0.oeseszj.mongodb.net/'

const mongoURL = process.env.MONGODB_URL;

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









