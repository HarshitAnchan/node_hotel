const passport = require('passport');
const LocalStrategy = require('passport-local');
const Person = require('./models/person');


passport.use(new LocalStrategy(async (username, password, done)=>{
    //authenticate logic heUSERNAME
    try{
    //   console.log('Received credentials:', USERNAME, password);
  
      const user = await Person.findOne({username});
  
      if(!user)
        return done(null, false , {message: 'Incorrect username'});

      const  isPasswordMatch = await user.comparePassword(password);
     
      if(isPasswordMatch){
        return done(null, user);
  
      }else{
        return done(null, false,{message:'Incorrect password'})
      }
  
    }catch(error){
      return done(error);
  
    }
  }));

  module.exports = passport;  // export configured passport