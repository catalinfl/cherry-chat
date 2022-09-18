import React from 'react'
import { Button } from '@material-tailwind/react'
import image from './navbar.png'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router'

const Navbar = () => {

const navigate = useNavigate();


const signOutFunction = () => {
  signOut(auth);
  navigate('/login');
}


  return (
    <div className="navbar h-16 bg-red-700">
        <div className="user my-auto">
            <img src={image} alt="blabla" />
            <span className="text-sm my-auto"> name </span>
        </div>
        <Button onClick={signOutFunction} className="chatButton bg-red-400 shadow-sm w-16 h-5 justify-center flex items-center shadow-red-300 hover:shadow-red-300 rounded-none "> Log out</Button>
    </div>
  )
}

export default Navbar