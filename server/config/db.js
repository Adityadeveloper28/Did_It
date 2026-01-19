const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DataBase Connected Successfully");
    } catch (error) {
        console.log("Error in DB Connection", error);
        process.exit(1);
    }
}

module.exports = connectDB;