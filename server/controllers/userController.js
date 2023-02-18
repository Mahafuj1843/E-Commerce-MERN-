import Product from "../models/Product.js";
import User from "../models/User.js"
import Coupon from "../models/Coupon.js"
import Order from "../models/Order.js"
import { createError } from "../utils/error.js";

const findCoupon = async (coupon) => {
    const result = await Coupon.findOne(
        {
            title: coupon,
            expiresAt: { $gt: Date.now() },
        }
    )
    return result;
}

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(
            req.params.id,
        );
        const { password, ...otherDetails } = user._doc;
        res.status(200).json({ ...otherDetails })
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json("User has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err);
    }
}

export const addToWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const alreadyAdded = user.wishlist.find((id) => id.toString() === req.body.product)
        if (alreadyAdded) {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: { wishlist: req.body.product },
            });
            res.status(200).send("Prduct remove from wishlist.")
        } else {
            await User.findByIdAndUpdate(req.user.id, {
                $push: { wishlist: req.body.product },
            });
            res.status(200).send("Prduct added in wishlist.")
        }
    } catch (err) {
        next(err);
    }
}

export const getWishList = async (req, res, next) => {
    try {
        const wishlist = await User.findById(req.user.id, { wishlist: 1 }).populate('wishlist')
        res.status(200).json(wishlist)
    } catch (error) {
        next(error)
    }
}

export const addToCart = async (req, res, next) => {
    try {
        const alreadyAdded = await User.find({ _id: req.user.id, "cart.productId": req.body.product }, { cart: 1 })
        const prod = await Product.findById(req.body.product)
        if (alreadyAdded.length) return res.status(200).send(`${prod.title} already to cart.`)
        else {
            await User.findByIdAndUpdate(req.user.id,
                {
                    $push:
                    {
                        cart: {
                            productId: req.body.product,
                        }
                    }
                }, { new: true })
            return res.status(200).send(`${prod.title} added to cart.`)
        }
    } catch (err) {
        next(err);
    }
}

export const removeFromCart = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id,
            {
                $pull: { cart: { "productId": req.body.product } },
            }, { new: true })
        res.status(200).send("Product remove form cart.")
    } catch (err) {
        next(err);
    }
}

export const getCart = async (req, res, next) => {
    try {
        const cartProduct = await User.findById(req.user.id, { cart: 1 }).populate('cart.productId')
        res.status(200).json(cartProduct)
    } catch (error) {
        next(error)
    }
}

export const emptyCart = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id,
            {
                cart: []
            })
        res.status(200).send("All product remove from cart.")
    } catch (error) {
        next(error)
    }
}

export const incrementCartProductQty = async (req, res, next) => {
    try {
        await User.updateOne(
            { _id: req.user.id, "cart.productId": req.body.product },
            {
                $inc: { "cart.$.quantity": 1 }
            }
        )
        res.status(200).send("Product quantity increase")
    } catch (err) {
        next(err);
    }
}

export const decrementCartProductQty = async (req, res, next) => {
    try {
        await User.updateOne(
            { _id: req.user.id, "cart.productId": req.body.product },
            {
                $inc: { "cart.$.quantity": -1 }
            }
        )
        res.status(200).send("Product quantity decrease")
    } catch (err) {
        next(err);
    }
}

export const applyCoupon = async (req, res, next) => {
    try {
        const result = await findCoupon(req.body.coupon)
        if (!result) return next(createError(404, "Invalid or Expired Token."));
        else {
            const total = (req.body.cartTotal - (req.body.cartTotal * (result.discount / 100))).toFixed(2);
            res.status(200).json({ "isApplied": true, total });
        }
    } catch (error) {
        next(error)
    }
}

export const createOrder = async (req, res, next) => {
    try {
        const cart = await User.findById(req.user.id, { cart: 1, _id:-1 }).populate("cart.productId")
        if (cart.cart.length) {
            const coupon = await findCoupon(req.body.coupon)
            const cartTotal = cart.cart.map(x => x.productId.price * x.quantity).reduce((prev, curr) => prev + curr, 0)
            let newOrder = await new Order({
                products: cart.cart,
                subTotal: cartTotal,
                discount: {
                    coupon: coupon ? coupon.title : "",
                    discounts: coupon ? coupon.discount : 0
                },
                total: coupon ? (cartTotal - (cartTotal * (coupon.discount / 100))).toFixed(2) : cartTotal,
                orderBy: req.user.id,
                shipping: {
                    fullname: req.body.fullname,
                    phone: req.body.phone,
                    streetAddress: req.body.streetAddress,
                    village: req.body.village,
                    state: req.body.state,
                    city: req.body.city
                }
            }).save()
            if (newOrder) {
                let update = cart.cart.map((item)=>{
                    return{
                        updateOne: {
                            filter: { _id: item.productId._id},
                            update: {$inc: {quantity: -item.quantity, sold: +item.quantity}}
                        }
                    }
                })
                await Product.bulkWrite(update, {})
                await User.findByIdAndUpdate(req.user.id,
                    {
                        cart: []
                    })
                res.status(200).send("Order has been completed.")
            } else return res.status(500).send("Something went wrong.");
        } else {
            return res.status(500).send("Something went wrong.");
        }
    } catch (error) {
        next(error)
    }
}

export const getUserOrder = async (req, res, next) => {
    try {
        const order = await Order.find({orderBy : req.params.id}).populate("products.productId")
        res.status(200).json(order)
    } catch (error) {
        next(error)
    }
}

export const getAllOrder = async (req, res, next) => {
    try {
        const order = await Order.find().sort("-orderStatus").populate("products.productId")
        res.status(200).json(order)
    } catch (error) {
        next(error)
    }
}