const {Order,Cart} = require("../models/order")

exports.getOrderById = async (req,res,next,id) => {
    const orders = await Order.findById(id).populate("products.product","name price")
    if(!orders){
        return res.json({
            err:"No order found in db"
        })
    }
    req.order = order;
    next()
}


exports.createOrder = async (req,res) => {
    req.body.order.user = req.profile;
    const order = await Order.create(req.body.order)
    return res.json(order)
}

exports.getAllOrders = async (req,res) => {
    const orders = await Order.find({}).populate("user","_id name")
    if(!orders){
        return res.json({
            err:"No Orders yet"
        })
    }

    return res.json(orders)
}

exports.getOrderStatus = (req,res) => {
    res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus = async (req,res) => {
    const order = await Order.updateOne({_id:req.order.id},{status:req.body.status},{new:true})
    if(!order){
        return res.json({
            err:"Updation failed"
        })
    }
    return res.json(order)
}