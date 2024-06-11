const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user' //user,cashier,server,admin
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);