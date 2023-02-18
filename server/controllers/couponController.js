import Coupon from "../models/Coupon.js"

export const createCoupon = async (req, res, next) =>{
    try {
        req.body.createBy = req.user.id
        await Coupon.create(req.body);
        res.status(200).send("Coupon create successfully.")
    } catch (error) {
        next(error)
    }
}

export const getAllCoupons = async (req,res,next) =>{
    try{
        const coupons = await Coupon.find().sort("-createdAt");
        res.status(200).json(coupons)
    }catch(err){
        next(err)
    }
}

export const getCoupon = async (req,res,next) =>{
    try{
        const coupon = await Coupon.findById(
            req.params.id,
        );
        if(!coupon) return next(createError(404, "Coupon not found."));
        else res.status(200).json(coupon)
    }catch(err){
        next(err);
    }
}

export const updateCoupon = async (req,res,next) =>{
    try{
        const coupon = await Coupon.findById(
            req.params.id,
        );
        if(!coupon) return next(createError(404, "Coupon not found."));
        else{
            const updatedCoupon = await Coupon.findByIdAndUpdate(
                req.params.id,
                { $set : req.body}, 
                { new : true});
            res.status(200).json(updatedCoupon)
        }
    }catch(err){
        next(err);
    }
}

export const deleteCoupon = async (req,res,next) =>{
    try{
        const coupon = await Coupon.findById(req.params.id);
        if(!coupon) return next(createError(404, "Coupon not found."));
        else {
            await Coupon.remove();
            res.status(200).json("Coupon has been deleted.")
        }
    }catch(err){
        next(err);
    }
}