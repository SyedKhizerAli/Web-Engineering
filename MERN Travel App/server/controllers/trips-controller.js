const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error')
const Trip = require('../schema/trip');
const Booking = require('../schema/booking');
const History = require('../schema/history');
const User = require('../schema/user');
const Wishlist = require('../schema/wishlist');
const Review=require('../schema/reviews')

const getPlaces = async (req, res, next) => {
    let places;
    try {
        places = await Trip.find({})
    } catch (error) {
        return next(new HttpError(error, 500));
    }
    res.json({ trips: places.map(u => u.toObject({ getters: true })) });
}

const insertPlace = async (req, res, next) => {
    const { image, name, seats,startDate,endDate,description } = req.body; //extracting data from request
    const createdPlace = Trip({
        image,
        name,
        seats,
        startDate,
        endDate,
        description
    });

    try {
        await createdPlace.save();
    } catch (error) {
        return next(new HttpError(error, 500));
    }
    res.status(201).json({ image, name, seats });
}

const bookTrip = async (req, res, next) => {
    const userId = req.params.uid;
    const tripId = req.params.tid;
    const seats = req.body.seats
    let place;
    try {
        place=await History.findOne({userID:userId,tripID:tripId})
    } catch (error) {
        return next(new HttpError(error, 404));   
    }
    if(place)
    {
        return next(new HttpError("Trip already booked!",404));
    }
    try {
        place = await Trip.findById(tripId)
    } catch (error) {
        return next(new HttpError(error, 404));
    }
    if (seats > place.seats || seats<1) {
        return next(new HttpError("Invalid Seats", 404));
    }
    let book = Booking({
        tripId,
        userId,
        seats
    });
    try {
        book = await book.save()
    } catch (error) {
        return next(new HttpError(error, 404));
    }
    let hist = History({
        tripID: tripId,
        userID: userId,
        seats
    })
    try {
        await hist.save();
    } catch (error) {
        return next(new HttpError(error, 404));
    }
    let currentUser;
    try {
        currentUser = await User.findById(userId);
        currentUser.history.push(place);
        await currentUser.save();
    } catch (error) {
        return next(new HttpError(error, 404));
    }
    place.seats=place.seats-seats;
    try {
        await place.save();
    } catch (error) {
        return next(new HttpError(error, 404));
    }
    res.json({ message: "Booking Done" })
}
const addWishlist = async (req, res, next) => {
    const userId = req.params.uid;
    const tripId = req.params.tid;
    let place,checkPlace;
    try {
        checkPlace = await Wishlist.findOne({ userID: userId, tripID: tripId });
    } catch (error) {
        return new HttpError(error, 404);
    }
    if (checkPlace) {
        return next(new HttpError("Trip already in wishlist",404));
    }
    try {
        place = await Trip.findById(tripId)
    } catch (error) {
        return next(new HttpError(error, 404));
    }
    let wish = Wishlist({
        userID: userId,
        tripID: tripId
    })
    try {
        await wish.save();
    } catch (error) {
        return next(new HttpError(error, 404));
    }
    let currentUser;
    try {
        currentUser = await User.findById(userId);
        currentUser.wishlist.push(place);
        await currentUser.save();
    } catch (error) {
        return next(new HttpError(error, 404));
    }
    res.json({ message: "Trip added to Wishlist" });
}
const removeWishlist=async(req,res,next)=>{
    const userId = req.params.uid;
    const tripId = req.params.tid;
    let user,trip,wish;
    try {
        user=await User.findById(userId);
    } catch (error) {
        return next(new HttpError(error,404));
    }
    try {
        trip=await Trip.findById(tripId);
    } catch (error) {
        return next(new HttpError(error,404));
    }
    try {
        wish=await Wishlist.findOne({userID:userId,tripID:tripId}).populate('userID')
    } catch (error) {
        return next(new HttpError(error,404));
    }
    try {
        await wish.remove();
        wish.userID.wishlist.pull(trip)
        await wish.userID.save()
    } catch (error) {
        return next(new HttpError(error,404));
    }
    res.json({message:"Place removed from wishlist"});
}

const rateTrips=async(req,res,next)=>{
    const userId = req.params.uid;
    const tripId = req.params.tid;
    const {rating,review}=req.body;
    let r=Review({
        userID:userId,
        tripID:tripId,
        rating,
        review
    })
    try {
        await r.save();        
    } catch (error) {
        return next(new HttpError(error,404));
    }
    let h;
    try {
        h=await History.findOne({userID:userId,tripID:tripId})
    } catch (error) {
        return next(new HttpError(error,404));
    }
    h.rated=true;
    try {
        await h.save();
    } catch (error) {
        return next(new HttpError(error,404));
    }
    res.json({message:"Rating Done!"});
}

const getReviews=async(req,res,next)=>{
    let r;
    try {
        r=await Review.find({})
    } catch (error) {
        return next(new HttpError(error,404));
    }
    let temp=[];
    for (const e in r){
        let u,v;
        try {
             u=await User.findById(r[e].userID)
        } catch (error) {
         return next(new HttpError(error,404));
        }
        v={
         name:u.name,
         rating:r[e].rating,
         review:r[e].review
        }
        temp.push(v)
    }
    temp.sort((a,b)=>b.rating-a.rating);
    res.json({ratings:temp})
}

exports.insertPlace = insertPlace;
exports.getPlaces = getPlaces;
exports.bookTrip = bookTrip;
exports.addWishlist = addWishlist;
exports.rateTrips=rateTrips;
exports.removeWishlist=removeWishlist;
exports.getReviews=getReviews;