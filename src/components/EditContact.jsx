import React, { useEffect, useState } from 'react'
import '../assets/css/form.css'
import {useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css" 
import { FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus} from 'react-icons/fa6'
import { CircleLoader } from 'react-spinners'


const EditContact = () => {
    
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();
 
  const handleInput = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Regular expression for Nigerian phone numbers
    const phoneRegex = /^234\d{10}$/;

  
    // Validate phone number
    if (!phoneRegex.test(values.phone)) {
      
      toast.error("Invalid Nigerian phone number format. example of valid format 234XXXXXXXXXX.", {
        position: "top-right",
        autoClose: 5000
      });
      return;
    }
  
     // Continue with form submission if phone number is valid
    // axios.put(`http://localhost:3000/aunalertsystem/update-contact/${id}`, values,{
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   }
    // })
            axios.put(`https://aun-alert-api.vercel.app/aunalertsystem/update-contact/${id}`, values,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      toast.success("Contact Updated Successfully", {
        position: "top-right",
        autoClose: 5000
      });
      navigate('/dashboard');
    }).catch((err) => {
      console.log(err);
    });
  }
  
  


    useEffect(() => {
      setLoading(true)
        // axios.get('http://localhost:3000/aunalertsystem/contact/'+id, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
                    axios.get('https://aun-alert-api.vercel.app/aunalertsystem/contact/'+id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((res) => {
          setLoading(false)
            console.log(res)
          if (res.data.success){
            setValues({
                name: res.data.name, 
                email: res.data.email, 
                phone: res.data.phone, 
                address: res.data.address
            })

          }
        }).catch((err) => {
          setLoading(false)
          console.log(err)

        }) 
      }, []);
  return (
    <>
    <div className='add-form-container'>
      <form className='add-form' onSubmit={handleSubmit}>
        <h2>Edit Contact</h2>
        <div className='form-group'>
          <FaUserPlus/>
          <input type="text" placeholder="Enter Contact Name" className='form-control' name='name'
          onChange={handleInput}
          value={values.name}
          />
        </div>
        <div className='form-group'>
          <FaAt/>
          <input type="email" placeholder="Enter Contact Email" className='form-control' name='email' autoComplete='off' 
          onChange={handleInput}
          value={values.email}
          />

        </div>
        <div className='form-group'>
          <FaPhoneFlip/>
          <input type="text" placeholder="Phone +234XXXXXXXXXXX " className='form-control' name='phone' 
          onChange={handleInput}
          value={values.phone}
          />
        </div>
        <div className='form-group'>
          <FaRegAddressCard/>
          <input type="text" placeholder="Enter Address " className='form-control' name='address' 
          onChange={handleInput}
          value={values.address}
          />
        </div>

        <button className='form-btn' >Update</button>
      </form>
    </div>
    </>
  
  )
  }

export default EditContact
