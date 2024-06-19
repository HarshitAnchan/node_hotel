const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

// const PORT = process.env.PORT || 3000;




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
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});













