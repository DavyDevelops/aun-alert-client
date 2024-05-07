import React from 'react'
import Navbar from '../components/Navbar'
import '../assets/css/home.css'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='home'>
        <h1 className='home-title'>
            AUN ALERT SYSTEM
        </h1>
        <p className='home-description'> 
            This is a sytem to send out mass notification alerts to opt in contacts, through sms, email, and calls in one click.
        </p>
    </div>
    </>
  )
}

export default Home