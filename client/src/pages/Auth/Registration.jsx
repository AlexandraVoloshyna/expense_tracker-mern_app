import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from "./Auth.module.css"
import { useRegistrationMutation } from '../../redux/slices/userApiSlice'
import { toast } from "react-toastify"


function Registration() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const[register, { isLoading }] = useRegistrationMutation()
const navigate = useNavigate()
    
 const submitHandler = async ()=>{
    try {
       const res = await register({email,password}).unwrap()
        toast.info(res?.message)
        navigate('/')

    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
 }

  return (
    <div className={styles['form_wrapper']}>
     <span className={styles['form_title']}>Registration</span>   
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
        placeholder='Enter your password' 
        value={password} onChange={(e)=> setPassword( e.target.value)} 
        autoComplete='on' 
        required 
        />
    </div>
        <div className={styles["form_actions"]}>
            <button type="submit" className='form_btn' onClick={submitHandler}>Sign up</button>
            <NavLink to="/" end>
                Sign in
            </NavLink>
        {isLoading ? <div> loading...</div> : ""}
        </div>
    </form>
    </div>
  )
}

export default Registration