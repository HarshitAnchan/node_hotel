const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');



// Post method to add menu item
router.post('/', async (req, res) =>{
    try{
      const data = req.body
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log('data saved');
      res.status(200).json({response})
  
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server error'})
  
    }
  })
  
  
  //Get method for menu
  router.get('/' , async (req, res) =>{
  
    try{
      const data = await MenuItem.find();
      console.log('Data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  
    }
  })

  
router.get('/:taste' , async (req, res) =>{
    try{
        const taste =req.params.taste;
        if(taste =='sweet' || taste =='spicy' || taste =='sour'){
            const response = await MenuItem.find({taste: taste})

            console.log('response detected');
            res.status(200).json(response)
        }else{
            res.status(404).json({error: 'invalid server error'})
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})

    }
})

// Put method
router.put('/:id' , async (req, res) => {
  try{
    const menuId = req.params.id;
    const updatedMenuData = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData,{
        new: true,
        runValidators: true,

    })

    if(!response){
      return res.status(404).json({error: 'Menu not found'});
    }
    console.log('data updated');
    res.status(200).json(response);

  }
  catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });

  }
})


router.delete('/:id', async (req, res) =>{
  try{

    const menuId = req.params.id; //extract the person's Id from the url parameter
    //assuming you have a person model
    const response = await MenuItem.findByIdAndDelete(menuId);
    if(!response){
      return res.status(404).json({error: 'Person not found'})
    }else{
      console.log('data deleted');
      res.status(200).json({message: 'Menu deleted successfully'})
    }

  }
  catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})





  module.exports = router