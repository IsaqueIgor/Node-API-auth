const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const port = 9999;

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
    {userNewUrlParser: true},    
    () => console.log(' Database connected!')
);

//Middleware
app.use(express.json());

//Import Routes
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/user' , authRoute);

app.listen(port, () => console.log('Server Up and running'));