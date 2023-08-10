import {validationResult} from 'express-validator'
import * as authService from "../service/authService.js"



export const register = async (req, res, next)=> {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid email or password, try again"
            })
        }
         const {email, password} = req.body
          await authService.registerUser(email, password, res)
    } catch (error) {
        next(error)
    }

} 
export const logIn = async (req, res, next)=> {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid email or password, try again"
            })
        }
        const {email, password} = req.body
        const data = await authService.loginUser(email, password, res)
        res.cookie('refreshToken', data.tokenRefresh, {
            httpOnly: true,
            maxAge:30*24*60*60*1000,
            sameSite: 'none',
            secure: true
        })
        
        res.status(200).json({ data, message: "success"})


    } catch (error) {
       next(error)
        
    }

} 
export const logOut = async (req, res, next) =>{
    try {
        res.cookie('refreshToken', '', {
            httpOnly: true,
           expires: new Date(0)
           })
           res.status(200).json({message: "User logged out successfully"})
           
           
    } catch (error) {
        next(error)
    }

}
export const resetPassword = async (req, res,next) =>{
try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "Invalid email or password, try again"
        })
    }
    const {email, password, confirmPassword} = req.body

    await authService.reset(email, password, confirmPassword, res)
} catch (error) {
    next(error)
}
}

export const refreshToken = async(req, res, next) =>{
    try {
        const {refreshToken} = req.cookies;
        const userData = await authService.refresh(refreshToken, res);
        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }


}
