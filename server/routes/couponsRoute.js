import express from 'express'
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from '../controllers/couponController.js'
import { verifyAdmin } from '../middlewares/verify.js'

const router = express.Router()

router.post('/', verifyAdmin, createCoupon)
router.get('/', verifyAdmin, getAllCoupons)
router.get('/:id', verifyAdmin, getCoupon)
router.put('/:id', verifyAdmin, updateCoupon)
router.delete('/:id', verifyAdmin, deleteCoupon)

export default router