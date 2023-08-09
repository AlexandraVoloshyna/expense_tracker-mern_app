import path from 'path';
import { fileURLToPath } from 'url';
import  express  from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";

import { checkAuth } from "./middleware/authMiddleware.js" 
import {errorHandler, notFound} from "./middleware/errorMiddleware.js"

import authRoute from "./routers/authRouter.js";
import profileRoute from "./routers/profileRouter.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

connectDB()

const Port = process.env.PORT || 5001
    app.use(express.json())
    app.use(cookieParser())
//http://localhost:5002/
    app.use('/api/auth', authRoute )
    app.use('/api/profile', checkAuth,  profileRoute )
    app.use(express.static(path.join(__dirname,  'images')))

    app.use(errorHandler)
    app.use(notFound)


    app.listen( Port,()=>{
        console.log(`server runs on port:${Port}`)
    }
    )