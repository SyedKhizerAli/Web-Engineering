const express = require('express');
const router=express.Router();
const {check}=require('express-validator');
const checkAuth=require('../middlewares/check-auth');

const tripsController=require('../controllers/trips-controller');

router.post('/',
tripsController.insertPlace
);
router.get('/',tripsController.getPlaces)
router.get('/reviews',tripsController.getReviews)
router.use(checkAuth)
router.post('/:uid/:tid/booking',tripsController.bookTrip);
router.post('/:uid/:tid/wishlist',tripsController.addWishlist);
router.delete('/:uid/:tid/wishlist',tripsController.removeWishlist);
router.post('/:uid/:tid/rating',tripsController.rateTrips);

module.exports=router;