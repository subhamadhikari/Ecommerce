const Category = require('../models/category')

const getCategoryById = async (req,res,next,id) => {
    const category = await Category.findById(id)
    if(!category){
        return res.json({
            err:"Category not found!"
        })
    }
    req.category = category
    next()
}

const createCategory = async (req,res) => {
    const category = await Category.create(req.body)
    if(!category){
        return res.json({
            err:"Error in creating Category"
        })
    }
    return res.json(category)
}

const getCategory = (req,res) => {
    return res.json(req.category)
}

const getAllCategory = async (req,res) => {
    const categories = await Category.find({})
    if(!categories){
        return res.json({
            err:"No categories found"
        })
    }
    return res.json(categories)
}

const updateCategory = async (req,res) => {
    const category = await Category.findByIdAndUpdate({_id:req.category._id},{name:req.body.name},{new:true})
    return res.json(category)
}

const deleteCategory = async (req,res) => {
    const category = await Category.deleteOne({_id:req.category._id})
    if(!category){
        return res.json({
            err:"No category to delete"
        })
    }
    return res.json({
        message:"Delete successful"
    })
}


module.exports = {getCategoryById,createCategory,getAllCategory,getCategory,updateCategory,deleteCategory}