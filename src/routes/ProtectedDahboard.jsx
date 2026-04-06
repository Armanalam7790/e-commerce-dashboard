import React  from 'react'
import { Navigate, Outlet } from 'react-router'
import {  useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedDahboard = () => {
    console.log('protected rendring');
    let {loggedInUser} = useAuth()
    if (!loggedInUser) {
        toast.error('Unauthorized user') 
        return <Navigate to='/' />
    }
    
  return <Outlet />
}

export default ProtectedDahboard