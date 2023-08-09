import { Schema, model, Types } from "mongoose";

const ExpenseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            
        },
    
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        date: {
            type: Date,
            required: true,
        },
    
        user:{
            type: Types.ObjectId,
            ref: 'User',
        },
    
    }
)

export default model('Expense', ExpenseSchema)