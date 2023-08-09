import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
            trim: true
        },
        password:{
            type: String,
            required: [true, 'password is required'],
            trim: true
        },
        username: {
            type: String,
            default: 'Username'
            
        },
        avatar: {
            type: String,
            default:'default_avatar.png'
           
        },
        isActivated: {
            type: Boolean, 
            default: false
        },
        activationLink: {
            type: String
        },

    }
)

export default model('User', UserSchema)