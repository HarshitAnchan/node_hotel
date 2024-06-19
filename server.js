// function add (a,b) {
//     return a+b;
// }

// let add = function (a,b){
//     return a+b;
// }

// let add= (a,b) =>{
//     return a+b;
// }
// let result = add(2,4);

// console.log(result);

// (function(){
//     console.log('harsh');
// })();




// function callBack(){
//     console.log('now adding is completed');
// }
// const add = function (a,b, callBack){
//     let result = a+b;
//     console.log(result);
//     callBack();
// }

// add(3,4, callBack);

// add(2,3, () => console.log("add completed"));


// let fs = require('fs');
// let os = require('os');

// let user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt', 'hi ' +user.username +'!', ()=>{
//     console.log('file is created');
// });


// const notes = require('./notes.js')
// var _ = require('lodash');


// console.log("server is loaded");

// let age = notes.age;
// console.log(age);

// let addNumber = notes.addNumber(3,4);
// console.log(addNumber);

// var data =["person", "person", 1,2,1,2,"name", "age", '2'];

// var filter = _.uniq(data);
// console.log(filter);



//JSON

// const jsonString = '{"name": "Harshit" , "age": 34 , "city": "Vasai"}'
// const jsonObject = JSON.parse(jsonString);

// console.log(jsonObject.name);



// convert obj to json
// const objectToConvert ={
//     name: "Harshit",
//     age: 34,

// };
// const json = JSON.stringify(objectToConvert);

// console.log(json);





//express

// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//   res.send('Welcome to my hotel.... How can i help u')
// })






// app.get('/chicken', (req, res) =>{
//     res.send('sure sir i would love to serve chicken')
// })
// app.get('/idli', (req, res) =>{
//     let cutsomized = {
//         name: 'rava idli',
//         size: '10 cm idli',
//         isSambar: true,
//         isChuttney: false

//     }
//     res.send(cutsomized);
// })




// app.post('/items', (req, res) => {
//   console.log("data is saved");
// })

// app.post('/person', (req, res) => {
//     console.log("data is saved");
//   })


// app.listen(3000, ()=>{
   
//     console.log("server is running in 3000");
// })



const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body



app.get('/', function (req, res) {
  res.send('Welcome to our hotel')
})


// post route to add a person
// app.post('/person', async (req, res) => { // Corrected endpoint path
//   try {
//     const data = req.body; // Assuming the req body contains the person data

//     // Create a new document using the mongoose model
//     const newPerson = new Person(data);

//     // Save the new person
//     const response = await newPerson.save();
//     console.log('Data saved');
//     res.status(201).json(response);
//   } catch (err) {
//     console.log('Error saving data:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// Get method to get the person
// app.get('/person' , async (req, res) =>{

//   try{
//     const data = await Person.find();
//     console.log('Data fetched');
//     res.status(200).json(data);

//   }catch(err){
//     console.log(err);
//     res.status(500).json({ error: 'Internal server error' });

//   }
// })




// app.get('/person/:workType', async (req, res)=>{

//  try{
//   const workType =req.params.workType;
//   if(workType == 'chef' || workType == 'manager' || workType =='waiter'){
    
//     const response = await Person.find({work: workType})
//     console.log('response detched');
//     res.status(200).json(response)
//   }else{
//     res.status(404).json({error: 'invalid worktype'})
//   }

//  }catch(err){
//   console.log(err);
//   res.status(500).json({ error: 'Internal server error' });


//  }
// })


//Import the router files
const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuItemRoutes')

//  use the router
app.use('/person', personRoutes);
app.use('/menu', MenuItemRoutes);


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});














