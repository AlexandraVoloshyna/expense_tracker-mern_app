import React, { useState,useEffect } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux"
import{ useLoginMutation } from "../../redux/slices/userApiSlice"
import{setCredentials} from"../../redux/slices/authSlice.js"
import { toast } from 'react-toastify';
import styles from "./Auth.module.css"


function Login() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const [login, { isLoading }] = useLoginMutation();
  const token  = useSelector((state)=> state.auth.token)
  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [navigate, token]);


    
  const submitHandler = async (e) => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res?.data?.tokenAccess ));
      navigate('/home');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <div className={styles['form_wrapper']}>
     <span className={styles['form_title']}>Login</span>   
    <form className={styles['form']} onSubmit={(e)=>{ e.preventDefault()}}>
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
            <button type="submit"  onClick={submitHandler}>Sign in</button>
            <NavLink to="/registration">
                Sign up
            </NavLink>
        </div>
        <NavLink to="/update" className={styles.link}>
               forgot password?
        </NavLink>
    </form>
    <br />
    <div>
      email: test@gmail.com
      <br />
      <br />
      password: test123
    </div>
    </div>
  )
}

export default Login