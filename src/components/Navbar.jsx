import React, {useContext} from 'react'
import '../assets/css/navbar.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'



const Navbar = () => {
    const {user, setUser} = useContext(UserContext)
  return (
    <div className='navbar'>
        <div className='navbar-left'>
            <Link to="/"  className='navbar-brand'>
            {user.name} ALERT SYSTEM
            </Link>
            </div>
            <div className='navbar-right'>
            <Link  to="/about" className='navbar-brand'>About</Link>
            {
              user ? <>
              <Link to="/dashboard" className='navbar-link'>Contact</Link>
              <Link to="/" className='navbar-link'>{user.name}</Link>
              <Link to="/dashboard/logout" className='navbar-link'>Logout</Link>
              </>
              : <>
            <Link to="/login" className='navbar-brand'>Login</Link>
            <Link  to="/register" className='navbar-brand'>Register</Link>
              </>
            }

            </div>
            </div>
  )
}

export default Navbar