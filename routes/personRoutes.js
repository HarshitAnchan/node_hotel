const express = require('express');
const router = express.Router();
const Person = require('./../models/person');


router.post('/', async (req, res) => { // Corrected endpoint path
    try {
      const data = req.body; // Assuming the req body contains the person data
  
      // Create a new document using the mongoose model
      const newPerson = new Person(data);
  
      // Save the new person
      const response = await newPerson.save();
      console.log('Data saved');
      res.status(201).json(response);
    } 
    catch (err) {
      console.log('Error saving data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// Get method to get the person
router.get('/' , async (req, res) =>{

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














