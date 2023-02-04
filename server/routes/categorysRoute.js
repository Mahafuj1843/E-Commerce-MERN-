import express from 'express'
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from '../controllers/categoryController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middlewares/verify.js'
// import { upload } from '../utils/imageUplode.js'

const router = express.Router()

router.post('/', verifyAdmin, /*upload.single("image"),*/ createCategory)
router.get('/', getAllCategory)
router.get('/:id', getCategory)
router.put('/:id', verifyAdmin, /*upload.single("image"),*/ updateCategory)
router.delete('/:id', verifyAdmin, deleteCategory)

export default router