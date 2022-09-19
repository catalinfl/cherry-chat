import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className="sidebar bg-red-400 rounded-tl-lg rounded-bl-lg"> 
    <Navbar className="fixed" />
    <Search/>
    <Chats />    
    
    </div>
    )
}

export default Sidebar