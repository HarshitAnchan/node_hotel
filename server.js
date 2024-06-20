const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();
const passport=require('./auth');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const Person = require('./models/person');


const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

// middleware function
const logRequest = (req, res, next) =>{
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next();// move on to nect phase
}


app.use(logRequest);

// passport.use(new LocalStrategy(async (USERNAME, password, done)=>{
//   //authenticate logic heUSERNAME
//   try{
//     console.log('Received credentials:', USERNAME, password);

//     const user = await Person.findOne({username:USERNAME});

//     if(!user)
//       return done(null, false , {message: 'Incorrect username'});
//     const  isPasswordMatch = user.password === password ? true :false;
   
//     if(isPasswordMatch){
//       return done(null, user);

//     }else{
//       return done(null, false,{message:'Incorrect password'})
//     }

//   }catch(err){
//     return done(err);

//   }
// }))

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session: false});
app.get('/',  function (req, res) {
  res.send('Welcome to our hotel')
})



//Import the router files
const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuItemRoutes')

//  use the router
app.use('/person',  personRoutes);
app.use('/menu' ,  MenuItemRoutes);



// Start the server
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});













