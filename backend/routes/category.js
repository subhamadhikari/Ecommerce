const express = require('express')
const router = express.Router()

const {getCategoryById,createCategory,getAllCategory,getCategory,updateCategory,deleteCategory} = require('../controller/category')
const {isSignedIn,isAuthenticated,isAdmin} = require('../controller/auth')
const {getUserById} = require('../controller/user')

//params
router.param('userId',getUserById)
router.param('categoryId',getCategoryById)
//
router.post('/category/create/:userId',isSignedIn,isAuthenticated,isAdmin,createCategory)
router.get('/category/:categoryId',getCategory)
router.get('/categories',getAllCategory)
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory)


module.exports = router;