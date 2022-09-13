import React from 'react'
import { Button } from '@material-tailwind/react'
import image from './navbar.png'

const Navbar = () => {
  return (
    <div className="navbar h-16 bg-red-700">
        <span className="chatLogo text-white text-lg"> Chatapp. </span>
        <div className="user my-auto">
            <img src={image} alt="blabla" />
            <span className="text-sm my-auto"> name </span>
        </div>
        <Button className="chatButton bg-red-400 shadow-sm w-16 h-5 justify-center flex items-center shadow-red-300 hover:shadow-red-300 rounded-none "> Log out</Button>

    </div>
  )
}

export default Navbar