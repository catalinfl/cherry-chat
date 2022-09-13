import React from 'react'
import image from './navbar.png'


const Chats = () => {
  return (
    <div className="chats">
     <div className="userChat bg-red-700">
        <div className="profile">
            <img className="userChatImage" src={image}alt="name" />
            <span> Jamie </span> 
        </div>
        <div className="userChatInfo">
            <span> Lorem ipsum dolor sit amet. </span>
        </div>
    </div>
    </div>
)
}

export default Chats