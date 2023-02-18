import express from 'express'
import { addToCart, addToWishlist, applyCoupon, createOrder, decrementCartProductQty, deleteUser, emptyCart, getAllOrder, getAllUser, getCart, getUser, getUserOrder, getWishList, incrementCartProductQty, removeFromCart, updateUser } 
        from '../controllers/userController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middlewares/verify.js'

const router = express.Router()

router.put('/:id', verifyUser,  updateUser)
router.delete('/:id', verifyUser, deleteUser)
router.get('/:id', verifyUser, getUser)
router.get('/', verifyAdmin, getAllUser)

router.put('/addedTo/cart', verifyToken, addToCart)
router.get('/get/cart', verifyToken, getCart)
router.put('/removeFrom/cart', verifyToken, removeFromCart)
router.put('/empty/cart', verifyToken, emptyCart)
router.put('/cart/increment', verifyToken, incrementCartProductQty)
router.put('/cart/decrement', verifyToken, decrementCartProductQty)

router.post('/apply-coupon', verifyToken, applyCoupon)

router.post('/order', verifyToken, createOrder)
router.get('/order/:id', verifyUser, getUserOrder)
router.get('/all/orders', verifyAdmin, getAllOrder)

router.put('/addedTo/wishlist', verifyToken, addToWishlist)
router.get('/get/wishlist', verifyToken, getWishList)

export default router