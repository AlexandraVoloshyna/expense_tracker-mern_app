import { Router } from "express"
import { upload } from "../middleware/uploadMiddleware.js" 
import { addExpense, deleteExpense, deleteProfile, getExpenses, updateProfile, updateAvatar, getAvatar, getName } from "../controllers/profileControllers.js"

const router = new Router()
 //http://localhost:5002/api/profile/
router.post('/addExpense',  addExpense )
router.post(`/deleteExpense/:id`, deleteExpense )
router.get('/getExpenses',  getExpenses )
router.get('/getName',  getName )
router.get('/getAvatar',  getAvatar )
router.patch('/updateProfile', updateProfile)
router.patch('/upload', upload.single('avatar'), updateAvatar)
router.post('/deleteProfile',  deleteProfile )


export default router