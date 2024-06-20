const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/signup', async (req, res) => { // Corrected endpoint path
    try {
      const data = req.body; // Assuming the req body contains the person data
  
      // Create a new document using the mongoose model
      const newPerson = new Person(data);
  
      // Save the new person
      const response = await newPerson.save();
      console.log('Data saved');

      const payload = {
        id: response.id,
        username: response.username
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      console.log("token is : ", token);

      
      res.status(201).json({response: response, token:token});
    } 
    catch (err) {
      console.log('Error saving data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Login Route
router.post('/login', async(req, res) => {
  try{
      // Extract username and password from request body
      const {username, password} = req.body;

      // Find the user by username
      const user = await Person.findOne({username: username});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token 
      const payload = {
          id: user.id,
          username: user.username
      }
      const token = generateToken(payload);

      // resturn token as response
      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})


// Get method to get the person
router.get('/' ,jwtAuthMiddleware,  async (req, res) =>{

    try{
      const data = await Person.find();
      console.log('Data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  
    }
  })
  
  router.get('/:workType', async (req, res)=>{

    try{
     const workType =req.params.workType;
     if(workType == 'chef' || workType == 'manager' || workType =='waiter'){
       
       const response = await Person.find({work: workType})
       console.log('response detected');
       res.status(200).json(response)
     }else{
       res.status(404).json({error: 'invalid worktype'})
     }
   
    }catch(err){
     console.log(err);
     res.status(500).json({ error: 'Internal server error' });
   
   
    }
   })


   //Put method 

router.put('/:id' , async (req, res) =>{
  try{

    const personId = req.params.id; // Extract the id from the url parameter
    const updatedPersonData = req.body; // updated data for the person
    
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // return the updated document
      runValidators:true,// run mongoose validation


    })

    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('data updated');
    res.status(200).json(response);

  } 
  catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });

  }

})
   

router.delete('/:id', async (req, res)=>{
  try{
    const personId = req.params.id; // Extract the person's ID from the url parameter
    //assuming you have a person model 
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error: 'Person not found'})
    }else{
      console.log('data deleted');
      res.status(200).json({message: 'Person deleted successfully'});
    }

  
  }
  catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });

  }
})


module.exports = router;














