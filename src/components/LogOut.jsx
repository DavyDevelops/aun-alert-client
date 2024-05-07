import React from 'react'
import { UserContext } from '../App'
import { useContext } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const LogOut = () => {
    const {setUser} = useContext(UserContext)
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    MySwal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to exit?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want!"
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear()
            setUser(null)
            navigate("/")
        }
    });
        };
      


export default LogOut