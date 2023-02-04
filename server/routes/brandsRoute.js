import express from 'express'
import { createBrand, deleteBrand, getAllBrand, getBrand, updateBrand } from '../controllers/brandController.js'
import { verifyAdmin } from '../middlewares/verify.js'
// import { upload } from '../utils/imageUplode.js'

const router = express.Router()

router.post('/', verifyAdmin, /*upload.single("image"),*/ createBrand)
router.get('/', getAllBrand)
router.get('/:id', getBrand)
router.put('/:id', verifyAdmin, /*upload.single("image"),*/ updateBrand)
router.delete('/:id', verifyAdmin, deleteBrand)

export default router