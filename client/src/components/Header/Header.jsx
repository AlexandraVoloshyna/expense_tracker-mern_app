import React, { useEffect, useState } from 'react';
import  styles from './Header.module.css'
import {  useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation} from '../../redux/slices/userApiSlice'
import{useGetNameQuery, useGetAvatarQuery } from "../../redux/slices/profileApiSlice"
import { clearCredentials } from '../../redux/slices/authSlice'
import { NavLink, useNavigate } from 'react-router-dom'

function Header() {
    const {token} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]);

    const { data: name} = useGetNameQuery( undefined, { skip: !isLoggedIn });
    const { data: avatar} = useGetAvatarQuery(undefined, { skip: !isLoggedIn });

   const [logout] = useLogoutMutation()
    
     const logoutHandler = async ()=>{
        try {
            await logout().unwrap()
            dispatch(clearCredentials())
            navigate('/')
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
     }

  return (
    <header className='header'>
        <div className='container'>
            <div className={styles["header-inner"]}>
                <div className={styles["logo"]}>
                    <span>Expense Tracker</span>
                </div>
               {token && (
                    <div className={styles['user-profile']}>
                            <p>{name}</p>
                        <div className={styles['user-profile-logo']}>
                            <NavLink to="/profile">
                                    <img src={`https://expense-tracker-server-rp9x.onrender.com/${avatar}`} alt="profile-icon" />
                            </NavLink>
                        </div>
                        <div className={styles["user-profile-btn"]}>
                            <button type="button" onClick={logoutHandler}>Sign out</button>
                        </div>
                    </div>
                )}
            </div>
         </div>
    </header>
  )
}

export default Header