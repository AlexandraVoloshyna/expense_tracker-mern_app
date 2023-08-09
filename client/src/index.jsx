import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.js'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Registration from "./pages/Auth/Registration";
import Login from "./pages/Auth/Login";
import Update  from './pages/Auth/Update'
import Profile from './pages/Profile/Profile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Login />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/update' element={<Update/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
     </Provider>
)

