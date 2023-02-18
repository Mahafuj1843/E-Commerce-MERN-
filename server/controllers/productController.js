import fs from 'fs'
import slugify from 'slugify'
import Product from "../models/Product.js"
import { createError } from "../utils/error.js";
import { cloudinaryDeleteImg, productImageUpload }from "../utils/cloudinary.js";

const calcTotalRating = async (product) =>{
    const getProduct = await Product.findById(product)
    let totalRating = getProduct.rating.length
    const ratingSum = getProduct.rating.map((i)=> i.star).reduce((prev, curr)=> prev+curr, 0)

    let actualRating = Math.round(ratingSum/totalRating)
    console.log(actualRating)
    await Product.findByIdAndUpdate(product,
        {
            totalrating : actualRating
        }, { new : true})
}

export const createProduct = async (req, res, next) => {
    try {
        var newProduct = new Product({
            title: req.body.title,
            slug: slugify(req.body.title),
            desc: req.body.desc,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            brand: req.body.brand,
            image : await productImageUpload(req.files, `e-commerce[MERN]/product`)
        });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        next(err);
    }
}

export const getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find().sort("-createdAt");
        res.status(200).json(products)
    } catch (err) {
        next(err)
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(
            req.params.id,
        );
        if (!product) return next(createError(404, "Product not found."));
        else res.status(200).json(product)
    } catch (err) {
        next(err);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(
            req.params.id,
        );
        if (!product) return next(createError(404, "Product not found."));
        else {
            if (req.body.title) req.body.slug = slugify(req.body.title)
            if(req.files){
                product.image.map((image)=>{
                    cloudinaryDeleteImg(image.publicId)
                })
                req.body.image = await productImageUpload(req.files, `e-commerce[MERN]/product`);
            }
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true });
            res.status(200).json(updatedProduct)
        }
    } catch (err) {
        next(err);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(createError(404, "Product not found."));
        else {
            product.image.map((image)=>{
                cloudinaryDeleteImg(image.publicId)
            })
            await product.remove();
            res.status(200).json("Product has been deleted.")
        }
    } catch (err) {
        next(err);
    }
}

export const filterProduct = async (req, res, next) => {
    try {
        const page = req.query.page ? req.query.page : 1;
        const perPage = req.query.perPage ? req.query.perPage : 1;
        const args = {}
        if (req.query.brand) args.brand = req.query.brand
        if (req.query.price) {
            const sortBy = req.query.price.split(",")
            args.price = { $gte: sortBy[0], $lte: sortBy[1] };
        }
        const products = await Product.find(args).skip((page - 1) * perPage).limit(perPage).sort(req.query.sort)
        res.status(200).json(products)
    } catch (err) {
        next(err)
    }
}

export const rating = async (req, res, next) => {
    try {
        const product = await Product.findById(req.body.product)
        let alreadyRated = product.rating.find((prod) => prod.postedBy.toString() === req.user.id.toString())
        if(alreadyRated){
            await Product.updateOne(
                {
                    rating : {$elemMatch : alreadyRated},
                },
                {
                    $set : {
                        "rating.$.star" : req.body.star,
                        "rating.$.review" : req.body.review,
                        "rating.$.date" : Date.now()
                    }
                }
            )
        calcTotalRating(req.body.product)
        return res.status(200).send("Product rating update.")
        }else{
            await Product.findByIdAndUpdate(req.body.product,
                {$push : 
                    {rating : {
                        star : req.body.star,
                        review : req.body.review,
                        date : Date.now(),
                        postedBy : req.user.id
                    }
                }
            }, { new : true} )
        calcTotalRating(req.body.product)
        return res.status(200).send("Product rated successfully.")
        }
    } catch (error) {
        next(error)
    }
}