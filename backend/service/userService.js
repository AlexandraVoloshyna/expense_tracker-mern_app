import userModel from '../models/userSchema.js'
import expenseModel from "../models/expenseSchema.js"
import bcrypt from 'bcrypt'

export const getExpenses = async(UserId) =>{
    const expenses = await expenseModel.find({ user: UserId });
    return expenses
 }
 export const getName = async(UserId) =>{
    const user = await userModel.findOne({_id: UserId});
    return user.username
 }
 export const getAvatar = async(UserId) =>{
    const user = await userModel.findOne({_id: UserId });
    return `${user.avatar}`
 }
export const addExpense = async (UserId, title, date, price, res) => {
    if( !title || !date || !price){
        res.status(400)
        throw new Error("All fields must be filled")
    }
    const newExpense = new expenseModel({
        user: UserId,
       title,
       date,
        price,
      });
  
      await newExpense.save();
      return(newExpense)
}
export const deleteExpense = async(expenseId, res) =>{
    await expenseModel.findByIdAndDelete({ _id: expenseId } );
    res.status(200).json({  message: 'Expense deleted successfully.' });
 }

 export const deleteProfile = async(UserId) =>{
    await expenseModel.deleteMany({ user: UserId });
    await userModel.findByIdAndDelete({ _id: UserId  });

 }
 export const uploadAvatar = async (UserId, img)=>{
    
    const user = await userModel.findOne({_id: UserId})
    if (user) {
        user.avatar = `${img}` || user.avatar
        await user.save();
        return img;
    } else {
        throw new Error("User not found");
    }
 }
 export const updateProfile = async (UserId, name, password, email)=>{
    const user = await userModel.findOne({_id: UserId}) 
    if (user) {
        user.username = name || user.username
        user.email = email || user.email
    } else {
        throw new Error("User not found");
    }
    if(password){
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash
    }
    await user.save();
    return name;
 }