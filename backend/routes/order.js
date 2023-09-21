const express = require('express')
const router = express.Router()

const {isAdmin,isSignedIn,isAuthenticated} = require('../controller/auth')
const {getUserById, pushOrderInPurchaseList} = require('../controller/user')
const {getOrderById,createOrder,getAllOrders,updateStatus,getOrderStatus} = require('../controller/order')
const {updateStock} = require('../controller/product')

//params
router.param("userId",getUserById)
router.param("orderId",getOrderById)

//
router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)
router.get("/order/all/:userId",isSignedIn,isAuthenticated.apply,isAdmin,getAllOrders)


//status of order
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("/order/status/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)

module.exports = router