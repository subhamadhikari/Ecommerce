const express = require('express')
const authRoutes = express.Router()

const { check , body } = require('express-validator');


const {signin,signup,signout,isSignedIn} = require('./../controller/auth')

authRoutes.post('/signin',
    check('email',"Enter the valid email").isEmail(),
    check('password',"Password should be 8 charactrs long").isLength({min:8})
    ,signin)
authRoutes.post('/signup',
    check('name',"Name should be 3 characters long").isLength({min:3}),
    check('email',"Enter the valid email").isEmail(),
    check('password',"Password should be 8 charactrs long").isLength({min:8})
    ,signup)
authRoutes.get('/signout',signout)

authRoutes.get('/test',isSignedIn, (req,res)=>{
    console.log(req.auth)
    res.json({
        message:"Protected route",
    })
})








module.exports = authRoutes;


// [
//     check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required'),
//     check('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required'),
//     check('service').escape(),
//     check('budget').escape(),
//     check('message').trim().isLength({ min: 3 }).escape().withMessage('Leave us a message'),
//   ],



//   [
//     check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required'),
//     check('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required'),
//     check('service').escape().withMessage('Select a service'),
//     check('budget').escape().withMessage('Choose a budget'),
//     check('message').trim().isLength({ min: 3 }).escape().withMessage('Leave us a message'),
//   ],