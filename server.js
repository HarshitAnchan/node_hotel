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













