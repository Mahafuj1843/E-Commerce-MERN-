import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser } 
        from '../controllers/userController.js'
import { verifyAdmin, verifyUser } from '../middlewares/verify.js'

const router = express.Router()

//update
router.put('/:id', verifyUser,  updateUser)
//delete
router.delete('/:id', verifyUser, deleteUser)
//get
router.get('/:id', verifyUser, getUser)
//get all
router.get('/', verifyAdmin, getAllUser)

export default router