import React from 'react'
import NavbarChat from './NavbarChat'
import Messages from './Messages'
import InputChat from './InputChat'

const Chat = () => {


  return (
    <div className="chat bg-red-400">
      <div className="chatInfo">
      <NavbarChat />
      </div>
      <Messages />
      <InputChat />
    </div>
    )
}

export default Chat