import * as userService from "../service/userService.js"

export const getExpenses = async (req, res,next) => {
   try {
       const {UserId} = req.user
       
       if(!UserId){
           res.status(400)
           throw new Error("no user id")
       }
       const expenses = await userService.getExpenses(UserId)
        if (expenses) {
            res.status(200).json(expenses)
        } else{
            res.status(404)
            throw new Error("no data found")
        }
   } catch (error) {
     next(error)
   }
}
export const getName = async (req, res,next) => {
    try {
        const {UserId} = req.user
        
        if(!UserId){
            res.status(400)
            throw new Error("no user id")
        }
        const name = await userService.getName(UserId)
         if (name) {
             res.status(200).json(name)
         } else{
             res.status(404)
             throw new Error("no data found")
         }
    } catch (error) {
      next(error)
    }
 }
 export const getAvatar = async (req, res,next) => {
    try {
        const {UserId} = req.user
        
        if(!UserId){
            res.status(400)
            throw new Error("no user id")
        }
        const avatar = await userService.getAvatar(UserId)
         if (avatar) {
             res.status(200).json(avatar)
         } else{
             res.status(404)
             throw new Error("no data found")
         }
    } catch (error) {
      next(error)
    }
 }
export const addExpense = async (req, res,next) => {
    try {
        const {UserId} = req.user
        if(!UserId){
            res.status(400)
            throw new Error("no user id")
        }
        const {title, date, price} = req.body
        const newExpense = await userService.addExpense( UserId, title, date, price, res)
            res.status(201).json(newExpense)
    } catch (error) {
        next(error)
    }
   
}
export const deleteExpense = async (req, res, next) => {
    try {
        const {id} = req.params
        if (!id) {
            res.status(500)
            throw new Error('no id found')
        }
        await userService.deleteExpense(id, res)
    } catch (error) {
        next(error)
    }
   
}
 export const updateProfile = async (req, res, next) => {
    try {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        const {UserId} = req.user
           const name = await userService.updateProfile(UserId, username,password,email)
            res.status(200).json({name})
        } catch (error) {
            next(error)
        }
           
   
 }
 export const updateAvatar = async (req, res, next) => {
    try {
    const avatar = req.file.filename
    const {UserId} = req.user
    if(avatar){
       const img = await userService.uploadAvatar(UserId, avatar)
        res.status(200).json({img})
        
    }
    } catch (error) {
        next(error)
    }
       
 }
export const deleteProfile = async (req, res, next) => {
   try {
    const {UserId} = req.user
    await userService.deleteProfile(UserId)
    res.status(200).json({message: "Account deleted"})
   } catch (error) {
     next(error)
   }
   
}
