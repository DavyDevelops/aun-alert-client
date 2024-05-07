import React from 'react'
import Navbar from '../components/Navbar'
import "../assets/css/dashboard.css"
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    
    <>
    {!localStorage.getItem('token') && <Navigate to='/login' />}
    <Navbar/>
    <div className='dashboard'>
        <div className='sidebar-container'>
            <Sidebar />
        </div>
        <div className='contact-container'>
            <Outlet />
        </div>
    </div>
    </>
  )
}

export default Dashboard