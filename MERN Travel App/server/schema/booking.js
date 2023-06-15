const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const Schema=mongoose.Schema;

const bookingSchema=Schema({
    userId:{type:String,required:true,ref:"User"},
    tripId:{type:String,required:true,ref:"Trips"},
    seats:{type:Number,required:true,min:0}
});

bookingSchema.plugin(uniqueValidator);

module.exports=mongoose.model('Bookings',bookingSchema);