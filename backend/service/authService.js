import { genToken} from './tokenService.js';
import { sendActivationLink } from './mailService.js';
import { v4 as uuid } from 'uuid';
import userModel from '../models/userSchema.js'
import { validateRefreshToken } from './tokenService.js';
import bcrypt from 'bcrypt'


export const loginUser =  async (email, password, res) =>{
    const User= await userModel.findOne({email})
        if (!User) {
            res.status(400)
            throw new Error("Invalid email or password, try again") 
            

        }
          const isCorrectPassword = await bcrypt.compare(password, User.password)
          if (!isCorrectPassword) {
            res.status(400)
            throw new Error("Invalid  password or email, try again") 
          }
          if (User.activationLink === false) {
            res.status(400)
            throw new Error("Account not activated yet") 
            

        }

          const { tokenAccess, tokenRefresh } = genToken( User._id)
        
          return {tokenAccess,tokenRefresh,}

} 
export const registerUser = async(email, password, res)=>{
    const isDublicate= await userModel.findOne({email})
        if (isDublicate) {
             res.status(400)
            throw new Error( 'User already exist')
        
        } 

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);
            const activationLink = uuid();
            const newUser = new userModel({
                password:hash,
                email:email,
                activationLink,
            });
            await sendActivationLink(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

            await newUser.save()
            res.status(201).json({ message: "Account created, activation link sent to your email "})

}
export const activateAccount = async(activationLink, res)=>{
    const user = await userModel.findOne({activationLink})
    if (!user) {
         res.status(400)
        throw new Error("Invalid  activation link") 
    }
    user.isActivated = true;
    await user.save();

}
export const reset = async( email, password, confirmPassword, res)=>{
    const userProfile = await userModel.findOne({email})
    if (userProfile && email !== 'test@gmail.com') {
        if(password === confirmPassword){
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);
            userProfile.password = hash

        }
        await userProfile.save()
        res.status(200).json({message: "Password updated"})

    } else {
        res.status(404)
        throw new Error("Email not Found")
    }
}
export const refresh = async(token, res) =>{
    if(!token){
        res.status(401)
         throw new Error('User unauthorized')
        
    }
  const validToken = validateRefreshToken(token)
  if(!validToken){
    res.status(401)
        throw new Error('User unauthorized')
      
  }else{ 
    const { tokenAccess} = genToken( validToken.UserId)
    return tokenAccess
  }


} 
