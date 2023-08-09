import { Router } from "express"
import {check} from 'express-validator'
import { logIn, register, logOut,  resetPassword, activateProfile, refreshToken } from "../controllers/authControllers.js"

const router = new Router()
//http://localhost:5002/api/auth/registration
router.post('/registration',[
    check('email').isEmail(),
    check('password').isLength({min: 6})

], register )

//http://localhost:5002/api/auth/login
router.post('/login', [
    check('email').isEmail(),
    check('password').exists()

], logIn )
//http://localhost:5002/api/auth/logout

router.post('/logout',logOut )
//http://localhost:5002/api/auth/resetPassword
router.patch('/resetPassword',[
    check('email').isEmail(),
    check('password').isLength({min: 6})

], resetPassword)
router.get('/activate/:link', activateProfile);
router.get('/refresh', refreshToken);



export default router