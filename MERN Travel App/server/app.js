const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const mongoose=require('mongoose')
const app=express()
const usersroutes=require('./routes/user-routes');
const tripsroutes=require('./routes/trip-routes')
const dotenv = require('dotenv');
dotenv.config();

const connectionString=`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.4oyzq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/users',usersroutes);
app.use('/api/trips',tripsroutes);
//checking for invalid routes
app.use((req,res,next)=>{
    const error=new HttpError('Could not find this route',404);
    throw error;
})
//this will execute if any error is thrown
app.use((err,req,res,next)=>{ //error handling
    res.status(err.code || 500);
    res.json({message:err.message}||'Unknown error occured')
})
mongoose.connect(connectionString)
.then(
    app.listen(5000))
.catch(err=>{
    console.log("Connection error");
    console.log(err)
})