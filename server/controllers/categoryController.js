import fs from 'fs'
import slugify from 'slugify'
import Category from '../models/category.js';
import { createError } from "../utils/error.js";

export const createCategory = async (req,res,next)=>{
    try{
        var newCategory = new Category({
            title : req.body.title,
            slug : slugify(req.body.title),
            desc : req.body.desc,
            //image : req.file.path
        });
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    }catch(err){
        next(err);
    }
}

export const getAllCategory = async (req,res,next) =>{
    try{
        const Categorys = await Category.find().sort("-createdAt");
        res.status(200).json(Categorys)
    }catch(err){
        next(err)
    }
}

export const getCategory = async (req,res,next) =>{
    try{
        const category = await Category.findById(
            req.params.id,
        );
        if(!category) return next(createError(404, "Category not found."));
        else res.status(200).json(category)
    }catch(err){
        next(err);
    }
}

export const updateCategory = async (req,res,next) =>{
    try{
        const category = await Category.findById(
            req.params.id,
        );
        if(!category) return next(createError(404, "Category not found."));
        else{
            if(req.body.title) req.body.slug = slugify(req.body.title)
            // if(req.file){
            //     fs.unlink(Category.image, (err)=>{
            //         if(err) next(err);
            //     });
            //     req.body.image = req.file.path;
            // }
            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                { $set : req.body}, 
                { new : true});
            res.status(200).json(updatedCategory)
        }
    }catch(err){
        next(err);
    }
}

export const deleteCategory = async (req,res,next) =>{
    try{
        const category = await Category.findById(req.params.id);
        if(!category) return next(createError(404, "Category not found."));
        else {
            // fs.unlink(Category.image, (err)=>{
            //     if(err) next(err);
            // });
            await category.remove();
            res.status(200).json("Category has been deleted.")
        }
    }catch(err){
        next(err);
    }
}