import React, { useState, useContext } from 'react'
import '../assets/css/form.css'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../components/Validation'
import axios from 'axios'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { UserContext } from "../App"
import { CircleLoader } from 'react-spinners'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const {user, setUser} = useContext(UserContext)
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false); // Add this line
 
  const handleInput = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }
  const handleSubmit = (e) => {
    setLoading(true) // Set loading to true when the form is submitted
    e.preventDefault()
    const errs = Validation(values)
    setErrors(errs)
    if(errs.email === "" && errs.password === ""){
      axios.post('https://aun-alert-api.vercel.app/aunalertsystem/login', values)
      .then(res => {
        setLoading(false) // Set loading to false when the request is successful
        toast.success("Login Successfully", {
          position: "top-right",
          autoClose: 5000
        });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate('/dashboard');
      })
      .catch((err) => {
        setLoading(false) // Set loading to false when an error occurs
        console.log(err);
        if (err.response && err.response.data && err.response.data.errors) {
          setServerErrors(err.response.data.errors);
        } else {
          console.error("An unexpected error occurred:", err);
        }
      });
    }
  }
  return (
    <>
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Login to Account</h2>
        <div className='form-group'>
          <label htmlFor="email">Organization Email:</label>
          <input type="email" placeholder="Enter Organization Email" className='form-control' name='email' autoComplete='off' 
          onChange={handleInput}
          />
          {
            errors.email && <span className='error'>{errors.email}</span>
          }
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="******" className='form-control' name='password' 
          onChange={handleInput}
          />
          {
            errors.password && <span className='error'>{errors.password}</span>
          }
        </div>
        {
          serverErrors.length > 0 && (
            serverErrors.map((error, index) => (
              <p className='error' key={index}>{error.msg}</p>
            ))
          )
        }
        <button className='form-btn' onClick={handleSubmit} disabled={loading}> {/* Disable the button when loading */}
          {loading ? <CircleLoader /> : "Login"} {/* Show the loader when loading */}
        </button>
        <p>Dont Have An Account? <Link to='/register'>Register</Link></p>
      </form>
    </div>
    </>
  )
}

export default Login;
