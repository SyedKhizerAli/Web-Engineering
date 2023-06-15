const{validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const HttpError=require('../models/http-error')
const User=require("../schema/user");
const jwt=require('jsonwebtoken');
const Trip=require('../schema/trip');
const History=require('../schema/history');

const login=async (req,res,next)=>{
    const {email,password}=req.body;

    let existingUser;
    try {
        existingUser=await User.findOne({email:email}); //checking if user already exists
    } catch (error) {
        return next(new HttpError(error,500));
    }

    if(!existingUser)
    {
        const error=new HttpError("Login Failed!",401);
        return next(error);
    }
    let isValidPassword=false;

    try {
        isValidPassword=await bcrypt.compare(password,existingUser.password);
    } catch (error) {
        return next(new HttpError("Server error"),500);
    }

    if(!isValidPassword)
    {
        const error=new HttpError("Login Failed!",401);
        return next(error);
    }

    let token;
    try {
        token=jwt.sign({userId:existingUser.id,email:existingUser.email},'Verysecret',{expiresIn:'1h'});
    } catch (error) {
        return next(new HttpError(error,500));   
    }
    res.json
    ({
        userId:existingUser.id,email:existingUser.email,token:token,name:existingUser.name
    });
}
const signup=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return next(new HttpError("Invalid Inputs",422));
    }
    
    const {name,email,password}=req.body; //extracting data from request

    let existingUser;
    try {
        existingUser=await User.findOne({email:email}); //checking if user already exists
    } catch (error) {
        return next(new HttpError(error,500));
    }
    if(existingUser)
    {
        const error=new HttpError(
            'User already exists',422
        );
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword=await bcrypt.hash(password,12);
    } catch (error) {
       return next(new HttpError("Server error",500));
    }
  
    const createdUser=User({
        name,
        email,
        password:hashedPassword,
        history:[],
        wishlist:[]
    });

    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError(error,500));
    }
    let token;
    try {
        token = jwt.sign({userId:createdUser.id,email:createdUser.email},'Verysecret',{expiresIn:'1h'});
    } catch (error) {
        return next(new HttpError(error,500));   
    }
    res.status(201).json({userId:createdUser.id,email:createdUser.email,token:token,name:name});
}
const getUserHistory=async(req,res,next)=>
{
    const userId=req.params.uid;
    let currentUser;
    try {
        currentUser=await User.findById(userId); //fetching user details
    } catch (error) {
        return next(new HttpError(error,404))
    }
    let trips=[];
    let p;
    for (const t in currentUser.history)//accessing user history
    {
        let temp,l;
        try {
            histDetails=await History.findOne({userID:userId,tripID:currentUser.history[t]});
            temp=await Trip.findById(currentUser.history[t]);
            p={
                tripDetails:temp,
                ratingStatus:histDetails.rated,
                seatsBooked:histDetails.seats
            }
            trips.push(p)
        } catch (error) {
            return next(new HttpError(error,404));
        }
    }
    res.json({userHist:trips}); 
}
const getUserWishlist=async(req,res,next)=>{
    const userId=req.params.uid;
    let currentUser;
    try {
        currentUser=await User.findById(userId); //fetching user details
    } catch (error) {
        return next(new HttpError(error,404))
    }
    let trips=[];
    for (const t in currentUser.wishlist)//accessing user history
    {
        let temp;
        try {
            temp=await Trip.findById(currentUser.wishlist[t]);
            trips.push(temp)
        } catch (error) {
            return next(new HttpError(error,404));
        }
    }
    res.json({userWish:trips});
}
const editProfile=async(req,res,next)=>{
    const userId=req.params.uid;
    const {name,email,password}=req.body;
    let currentUser;
    try {
        currentUser=await User.findById(userId); //fetching user details
    } catch (error) {
        return next(new HttpError(error,404))
    }
    let hashedPassword;
    try {
        hashedPassword=await bcrypt.hash(password,12);
    } catch (error) {
       return next(new HttpError(error,500));
    }
    currentUser.name=name;
    currentUser.email=email;
    currentUser.password=hashedPassword;
    try {
        await currentUser.save();
    } catch (error) {
        return next(new HttpError(error,500));
    }
    res.json({email:currentUser.email,name:currentUser.name});
}

exports.signup=signup;
exports.login=login;
exports.getUserHistory=getUserHistory;
exports.getUserWishlist=getUserWishlist;
exports.editProfile=editProfile;