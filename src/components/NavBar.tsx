import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NavBar = () => {
  const {user,logOut}=useAuth();
  const navigate=useNavigate();

const handleLogOut=async()=>{
  try{
    await logOut();
    navigate('/');
  }catch(err){
    console.log(err)
  }
}

  return (
    <div className='absolute w-full p-4 flex items-center justify-between z-50'>
        <Link to="/">
        <h1 className='uppercase text-red-600 font-nsans-bold cursor-pointer text-5xl'>netflix</h1>
        </Link>

    {
      user?.email ? (
        <div>
        <Link to="/profile">
        <button className='capitalize pr-4'>profile</button>
        </Link>

       
        <button onClick={handleLogOut} className='capitalize bg-red-600 px-6 py-2 rounded cursor-default'>log Out</button>
        
    </div>

      ) :
      (
        <div>
        <Link to="/login">
        <button className='capitalize pr-4'>log in</button>
        </Link>

        <Link to="/signup">
        <button className='capitalize bg-red-600 px-6 py-2 rounded cursor-default'>signup</button>
        </Link>
    </div>
      )
    }


    </div>
  )
}

export default NavBar