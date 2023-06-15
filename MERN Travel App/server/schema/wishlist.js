const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const Schema=mongoose.Schema;

const wishlistSchema=Schema({
    tripID:{type:String,required:true,ref:'Trips'},
    userID:{type:String,required:true,ref:'User'}
});

wishlistSchema.plugin(uniqueValidator);

module.exports=mongoose.model('Wishlist',wishlistSchema);