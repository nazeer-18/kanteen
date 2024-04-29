const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    mobileNumber : {
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    foodPreference:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User',userSchema);