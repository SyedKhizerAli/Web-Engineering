const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const Schema=mongoose.Schema;

const tripsSchema=Schema({
    image:{type:String,required:true},
    name:{type:String,required:true,unique:true},
    seats:{type:Number,required:true,min:0},
    startDate:{type:String,required:true},
    endDate:{type:String,required:true},
    description:{type:String}
});

tripsSchema.plugin(uniqueValidator);

module.exports=mongoose.model('Trips',tripsSchema);