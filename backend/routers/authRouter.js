import { Router } from "express"
import {check} from 'express-validator'
import { logIn, register, logOut,  resetPassword,  refreshToken } from "../controllers/authControllers.js"

const router = new Router()

router.post('/registration',[
    check('email').isEmail(),
    check('password').isLength({min: 6})

], register )


router.post('/login', [
    check('email').isEmail(),
    check('password').exists()

], logIn )


router.post('/logout',logOut )

router.patch('/resetPassword',[
    check('email').isEmail(),
    check('password').isLength({min: 6})

], resetPassword)
router.get('/refresh', refreshToken);



export default router