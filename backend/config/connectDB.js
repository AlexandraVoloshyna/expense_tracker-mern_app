import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()



const User = process.env.DB_USER
const Password = process.env.DB_PASSWORD
const DB = process.env.DB_NAME
export const connectDB = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://${User}:${Password}@cluster0.hpfxt7g.mongodb.net/${DB}?retryWrites=true&w=majority`)
        console.log (
            `MongoDB connected: ${mongoose.connection.host}`
            )
        } catch (error) {
            console.log( error)
        }
        
    }