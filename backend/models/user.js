const mongoose = require('mongoose')
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required :[true,'Name is required'],
        maxlength:20,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:20,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Enter the email"],
        unique:[true]
    },
    encry_password:{
        type:String,
        required:[true,"Enter the password"],
    },
    userInfo:{
        type:String,
        trim:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }

},{timestamps:true})

userSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt = uuidv4()
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {

    authenticate : function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword : function(plainpassword){
        if(plainpassword.trim().length <= 8) {
            throw new Error("Password length not matched ; less than 8")
        }
        try{
            return crypto.createHmac('sha256',this.salt).update(plainpassword).digest('hex')
        }catch(err){
            return ""
        }
    }
}




module.exports = mongoose.model("User",userSchema)