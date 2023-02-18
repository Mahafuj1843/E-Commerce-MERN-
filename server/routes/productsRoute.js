import express from 'express'
import { createProduct, deleteProduct, filterProduct, getAllProduct, getProduct, rating, updateProduct } from '../controllers/productController.js'
import { uploadPhoto } from '../middlewares/uploadImage.js'
import { verifyAdmin, verifyToken} from '../middlewares/verify.js'

const router = express.Router()

router.post('/', verifyAdmin, uploadPhoto.array('images', 3), createProduct)
router.get('/', getAllProduct)
router.get('/:id', getProduct)
router.put('/:id', verifyAdmin, uploadPhoto.array('images', 3), updateProduct)
router.delete('/:id', verifyAdmin, deleteProduct)
router.get('/p/filter', filterProduct)
router.put('/p/rating', verifyToken, rating)

export default router