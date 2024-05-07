import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/dashboard.css'

const NotFound = () => {
  return (
    <div className='not-found'>
        <h1>404</h1>
        <h1>Oops cannot Find the page</h1>
        <h2>Feeling a little lost buddy? it's ok go <Link to="/">home</Link></h2>
        </div>
  )
}

export default NotFound