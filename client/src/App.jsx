import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header/Header"
import { Outlet } from 'react-router-dom';



export default function App() {
  return (
    <>
    <Header/>
    <ToastContainer /> 
    <div className="main">
      <div className="container">
        <Outlet/>
      </div>
    </div>
    </>
);
}
