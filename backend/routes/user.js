const express = require('express')
const router = express.Router()

const {getUser,getUserById,updateUser,userPurchaseList} = require('../controller/user')
const {isAdmin,isAuthenticated,isSignedIn} = require('../controller/auth')

router.param("userId",getUserById) // whenever there is :userID this method will be automatically called

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)

//checkAdmin
// router.get("/user/")

//populate
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)

module.exports = router