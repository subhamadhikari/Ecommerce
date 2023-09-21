const Product = require('../models/product')
const formidable = require('formidable');
const _ = require('lodash')
const fs = require('fs')

const getProuctById = async(req,res,next,id) => {
    const product = await Product.findById(id).populate('category')
    if(!product){
        return res.json({
            err:"No product found"
        })
    }
    req.product = product
    next()
}

const getProduct = (req,res) => {
    req.product.photo = undefined  //undefining bulky photo so that it doesn't slow the system
    return res.json(req.product)
}

//middleware
const photo = (req,res,next) => {
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}
////
const createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true

     form.parse(req,async(err,fields,file) => {
         if(err){
            console.log(err,"formidable err")
            return res.status(400).json({
                err:"Error in uploading"
            })
        }

        //restrictions on field
        console.log(fields)
        const {price,name,description,category,stock} = fields

        if(!name || !description || !price || !category || !stock){
            return res.json({
                err:"All fields required"
            })
        }

        let product = new Product(fields)

        //handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    err:"File size too big"
                })
            }

            // mention the photo path in data(Buffer)
            try {
                product.photo.data = await fs.readFileSync(file.photo.filepath)
                product.photo.contentType = await file.photo.mimetype
            } catch (error) {
                console.log(error)
                return res.json({
                    err:"Error in photo"
                })
            }
        }

        //save to db
        product.save((err,prod) => {
            if(err || !prod){
                return res.status(400).json({
                    err:"Product creation failed"
                })
            }
            return res.json(prod)
        })
    })
}
/////
const deleteProduct = async (req,res) =>{
    const prod = await Product.deleteOne({_id:req.product._id})
    return res.json({
        message:`${req.product.name} has been successfully deleted`
    })
}
/////
const updateProduct =(req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true

     form.parse(req,async(err,fields,file) => {
         if(err){
            console.log(err,"formidable err")
            return res.status(400).json({
                err:"Error in uploading"
            })
        }

        //updation code
        let product = req.product
        product = _.extend(product,fields)


        //handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    err:"File size too big"
                })
            }

            // mention the photo path in data(Buffer)
            try {
                product.photo.data = await fs.readFileSync(file.photo.filepath)
                product.photo.contentType = await file.photo.mimetype
            } catch (error) {
                console.log(error)
                return res.json({
                    err:"Error in photo"
                })
            }
        }

        //save to db
        product.save((err,prod) => {
            if(err || !prod){
                return res.status(400).json({
                    err:"Product updation failed"
                })
            }
            return res.json(prod)
        })
    })
}

//productListiong
const getAllProducts = async (req,res)=>{

    const limit =  Number(req.query.limit) || 8

    let product = Product.find({}).select("-photo").limit(limit)

    if(req.query.sortBy){
        const sortList = req.query.sortBy.split(',').join(' ')
        product = product.sort(sortList)
    }else{
        product = product.sort({_id:-1})
    }

    product = product.populate('category')
    const result = await product
    
    if(!result){
        return res.json({
            err:"No Product found"
        })
    }
    return res.json(result)
}


const getAllUniqueCategories = async (req,res) => {
   const categories = await Product.distinct("category")
   if(!categories){
    return res.json({
        err:"Please insert Category"
    })
   }

   return res.json(categories)

}

//
const updateStock = async (req,res,next) => {
    let  myOperaions = req.body.order.products.map(prod => {
        return {
            updateOne : {
                filter : {_id:prod._id},
                update: { $inc: { stock: -prod.count , sold: +prod.count }}
            }
        }
    })

    const products = await Product.bulkWrite(myOperaions)
    if(!products){
        return res.json({
            err:'Problem adding to cart'
        })
    }

    next()

}
module.exports = {
    getProuctById,
    getProduct,
    createProduct,
    photo,
    deleteProduct,
    updateProduct,
    getAllProducts,
    updateStock,
    getAllUniqueCategories
}