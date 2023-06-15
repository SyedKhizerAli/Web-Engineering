const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const Schema=mongoose.Schema;

const reviewSchema=Schema({
    tripID:{type:String,required:true,ref:'Trips'},
    userID:{type:String,required:true,ref:'User'},
    rating:{type:Number,required:true},
    review:{type:String,required:true}
});

reviewSchema.plugin(uniqueValidator);

module.exports=mongoose.model('Reviews',reviewSchema);