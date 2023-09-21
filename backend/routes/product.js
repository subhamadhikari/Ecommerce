const express = require('express')
const router = express.Router()

const {isAdmin,isSignedIn,isAuthenticated} = require('../controller/auth')
const {getProduct,getProuctById,createProduct,photo,
    deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require('../controller/product')
const {getUserById} = require('../controller/user')


router.param("productId",getProuctById)
router.param("userId",getUserById)


//
router.get('/product/:productId',getProduct)
router.get('/product/photo/:productId',photo) // clear up with front-end
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct)
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct)
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProduct)

//listing route for homepage
router.get('/products',getAllProducts)
//listing product categories
router.get("/products/categories",getAllUniqueCategories)
module.exports = router