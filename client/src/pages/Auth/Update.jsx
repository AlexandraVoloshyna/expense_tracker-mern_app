import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./Auth.module.css"
import { useResetPasswordMutation } from '../../redux/slices/userApiSlice'
import { toast } from "react-toastify"


function Update() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const[update, { isLoading }] = useResetPasswordMutation()
const navigate = useNavigate()
    
 const submitHandler = async ()=>{
    try {
       const res = await update({ confirmPassword, email,password}).unwrap()
        toast.info(res?.message)
        navigate('/')

    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
 }

  return (
    <div className={styles['form_wrapper']}>
    <form className={styles['form']} onSubmit={(e)=>{e.preventDefault()}}>
    <div className={styles["form_input"]}>
        <label htmlFor="email">Email</label>
        <input 
        type="email"
         name='email' 
         placeholder='Enter your email' 
         value={email} onChange={(e)=> setEmail(e.target.value) } 
         autoComplete='on' 
         required 
         />
    </div>
    <div className={styles["form_input"]}>
        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        name='password' 
        placeholder='Enter your new password' 
        value={password} onChange={(e)=> setPassword( e.target.value)} 
        autoComplete='on' 
        required 
        />
    </div>
    <div className={styles["form_input"]}>
        <label htmlFor="password">Confirm password</label>
        <input 
        type="password" 
        name='password' 
        placeholder='confirm your password' 
        value={confirmPassword} onChange={(e)=> setConfirmPassword( e.target.value)} 
        autoComplete='on' 
        required 
        />
    </div>
        <div className={styles["form_actions"]}>
            <button type="submit" className='form_btn' onClick={submitHandler}>Send</button>
            
        {isLoading ? <div> loading...</div> : ""}
        </div>
    </form>
    </div>
  )
}

export default Update