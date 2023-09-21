const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Enter the product name"],
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        required:[true,"Enter the product description"],
        maxlength:2000
    },
    price:{
        type:Number,
        required:[true,"Enter the product price"],
        maxlength:32,
        trim:true
    },
    category:{
        type:ObjectId,
        ref:"Category",
        required:[true,"Define Category"],
    },
    stock:{
        type:Number,
    }
    ,sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)