import React, { useState } from 'react'
import '../assets/css/form.css'
import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css" 
import { FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus} from 'react-icons/fa6'




const AddContact = () => {
  const navigate = useNavigate();
    
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })



 
  const handleInput = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Regular expression for Nigerian phone numbers
    const phoneRegex = /^234\d{10}$/;

  
    // Validate phone number
    if (!phoneRegex.test(values.phone)) {
      toast.error("Invalid Nigerian phone number format. Example of valid format 234XXXXXXXXXX.", {
        position: "top-right",
        autoClose: 5000
      });
      return;
    }
  
    // Continue with form submission if phone number is valid
    //     axios.post('http://localhost:3000/aunalertsystem/add-contact', values,{
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   }
    // })
          axios.post('https://aun-alert-api.vercel.app/aunalertsystem/add-contact', values,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      toast.success("Contact Added Successfully", {
        position: "top-right",
        autoClose: 5000
      });
      navigate('/dashboard');
    }).catch((err) => {
      console.log(err);
    });
  }
  

  

  return (
    <>
    <div className='add-form-container'>
   
      <form className='add-form' onSubmit={handleSubmit}>
        <h2>Create Contact</h2>
        <div className='form-group'>
          <FaUserPlus/>
          <input type="text" placeholder="Enter Contact Name" className='form-control' name='name'
          onChange={handleInput}
          />
        </div>
        <div className='form-group'>
          <FaAt/>
          <input type="email" placeholder="Enter Contact Email" className='form-control' name='email' autoComplete='off' 
          onChange={handleInput}
          />

        </div>
        <div className='form-group'>
          <FaPhoneFlip/>
          <input type="text" placeholder="Phone 234XXXXXXXXXXX " className='form-control' name='phone' 
          onChange={handleInput}
          />
        </div>
        <div className='form-group'>
          <FaRegAddressCard/>
          <input type="text" placeholder="Enter Address " className='form-control' name='address' 
          onChange={handleInput}
          />
        </div>

        <button className='form-btn' >Add</button>
      </form>
    </div>
    </>
  
  )
  }

export default AddContact
