const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');


//database
mongoose.connect(process.env.MONGO_URI, {

})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log('MongoDB Connected...',err));
 
//middleware
const app = express();
app.use(express.json());


//routes
app.use('/', require('./routes/authRoutes'));

//server start
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

