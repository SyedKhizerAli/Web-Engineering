const express = require('express');
const router=express.Router();
const {check}=require('express-validator');

const usersController=require('../controllers/users-controller');
const checkAuth=require('../middlewares/check-auth');

router.post('/signup',
[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:5})
]
,usersController.signup);
router.post('/login',usersController.login);
router.use(checkAuth);
router.patch('/:uid/edit',usersController.editProfile);
router.get('/:uid/history',usersController.getUserHistory);
router.get('/:uid/wishlist',usersController.getUserWishlist);

module.exports=router;