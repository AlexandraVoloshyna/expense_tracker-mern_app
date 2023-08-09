import { useState } from "react"
import styles from "./Profile.module.css"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clearCredentials } from "../../redux/slices/authSlice"
import{  useUploadMutation, useUpdateMutation, useDeleteAccountMutation  } from "../../redux/slices/profileApiSlice"

function Profile() {
  const [upload, { isLoading }] = useUploadMutation();
  const [ update ] = useUpdateMutation();
  const [ deleteProfile ] = useDeleteAccountMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[username, setUsername] = useState("")
  const[avatar, setAvatar] = useState(undefined)
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")


  const deleteHandler = async()=>{
    try {
      await deleteProfile().unwrap()
      dispatch(clearCredentials())
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  const updateProfile = async()=>{
   try {
    await update({username,password,email}).unwrap()
   } catch (error) {
    console.log(error)
   }
  }
  const sendFile = async()=>{
   try {
    const data = new FormData();
    data.append("avatar", avatar);
  await upload(data).unwrap()
   } catch (error) {
    console.log(error)
   }
  }
  
  return (
    <>
    <div className={styles['form_wrapper']}>
     <span className={styles['form_title']}>User Profile</span>
     <NavLink to="/home">
                Back to Home Page
      </NavLink>   
    <form className={styles['form']} onSubmit={(e)=>{ e.preventDefault()}}>
    <div className={styles["form_input"]}>
        <label htmlFor="username">Username</label>
        <input 
       type="text"
       value={username}
       name="username"
       placeholder="Enter your username"
       autoComplete="on"
       onChange={(e)=> setUsername( e.target.value)} 
         />
    </div>
    <div className={styles["form_input"]}>
        <label htmlFor="username">Email</label>
        <input 
       type="email"
       value={email}
       name="email"
       placeholder="Enter your new email"
       autoComplete="on"
       onChange={(e)=> setEmail( e.target.value)} 
         />      
    </div>
    <div className={styles["form_input"]}>
        <label htmlFor="password">Password</label>
        <input 
       type="password"
       value={password}
       name="username"
       placeholder="Enter your new password"
       autoComplete="on"
       onChange={(e)=> setPassword( e.target.value)} 
         />  
    </div>
    <div className={styles["form_actions"]}>
    <button type="submit" onClick={updateProfile}>Update Profile</button>
    </div>
    

    <div className={styles["form_input"]}>
        <label htmlFor="avatar">Avatar</label>
        <input 
        className={styles['input_file']}
        placeholder='uploud your avatar'
        type='file'
        onChange={(e)=> setAvatar( e.target.files[0])} 
        name="avatar"
      />
      <div className={styles["form_actions"]}>
            <button type="submit" onClick={sendFile}>Save Avatar</button>
      </div>
    </div>
    </form>
    <div className={styles["delete_btn"]}>
            <button type="submit" className='form_btn' onClick={deleteHandler} >Delete profile</button>
    </div>
    </div>
  </>
)}

export default Profile