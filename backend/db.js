require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Db connected');
}

module.exports = connectDB;