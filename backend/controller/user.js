const User = require('./../models/user')
const Order = require('../models/order')


const getUserById = async (req,res,next,id) => {
    const user = await User.findById(id)

    if(!user){
        return res.status(400).json({
            err:"No user found"
        })
    }

    req.profile = user;
    next()

}

// const checkAdmin = async (req,res,id) => {
//     const profile = await User.findById(id);
//     if(profile.role === 1){
//         return profile
//     }else{
//         return false
//     }
// }

const getUser = (req,res) => {
    //get back here for password;
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined

    return res.json(req.profile)
}

const updateUser = async (req,res) => {
    const user = await User.findByIdAndUpdate({_id:req.profile._id} ,{$set:req.body},{new:true})
    if(!user){
        console.log("User not Found")
    }

    
    user.salt = undefined
    user.encry_password = undefined
    user.createdAt = undefined
    user.updatedAt = undefined
    res.json(user)
}



//Populating
const userPurchaseList = async(req,res) => {
   const order = await Order.find({user:req.profile_id})
    .populate('user',"_id name")

    if(!order){
        return res,json({
            err:"No order in this account"
        })
    }

    return res.json(order)
}

//push order 
const pushOrderInPurchaseList = async (req,res,next) => {
    let purchases1 = [];
    req.body.order.products.forEach(prod => {    //req.body.order.produucts comes from frontend
        purchases1.push({
            _id: prod._id,
            name:prod.name,
            description : prod.description,
            category : prod.category,
            quantity : prod.quantity,
            amount : req.body.order.amount,
            transaction_id : req.body.order.transaction_id

        })
    });  // go to product controller

    //store in db
    await User.findOneAndUpdate({_id:req.profile._id},{$push :{purchases:purchases1}},{new:true})

    next()
}

module.exports = {
    getUser,
    getUserById,
    updateUser,
    userPurchaseList,
    pushOrderInPurchaseList
}