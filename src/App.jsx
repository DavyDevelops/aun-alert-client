import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import Contacts from './components/Contacts';
import AddContact from './components/AddContact';
import SendMessage from './components/SendMessage';
import EditContact from './components/EditContact';
import LogOut from './components/LogOut';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFound from './pages/NotFound';
import { CircleLoader } from 'react-spinners'

export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState();
  

  // Check if user is logged in
  // useEffect(() => {
  //   axios.get('http://localhost:3000/aunalertsystem/verify', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   })
    useEffect(() => {
      
    axios.get('https://aun-alert-api.vercel.app/aunalertsystem/verify', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if (res.data.user) {
        setUser(res.data.user);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{user, setUser}}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}>
              <Route index element={<Contacts/>} />
              <Route path="add-contact" element={<AddContact/>} />
              <Route path="send-message" element={<SendMessage/>} />
              <Route path="edit-contact/:id" element={<EditContact/>} />
            </Route>
            <Route path="/dashboard/logout" element={<LogOut/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App;
