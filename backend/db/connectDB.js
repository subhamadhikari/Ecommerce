const mongoose = require("mongoose");

const connectDB = (uri) => {
    return mongoose.connect(uri).then(() => {
        console.log("connected to db")
    })
}

module.exports = connectDB;

