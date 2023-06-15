const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const Schema=mongoose.Schema;

const historySchema=Schema({
    tripID:{type:String,required:true,ref:'Trips'},
    userID:{type:String,required:true,ref:'User'},
    rated:{type:Boolean,default:false},
    seats:{type:Number,required:true,min:0}
});

historySchema.plugin(uniqueValidator);

module.exports=mongoose.model('History',historySchema);