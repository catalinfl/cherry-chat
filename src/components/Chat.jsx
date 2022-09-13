import React from 'react'
import NavbarChat from './NavbarChat'
import Messages from './Messages'
import InputChat from './InputChat'

const Chat = () => {
  return (
    <div className="chat bg-red-400">
      <NavbarChat />
      <Messages />
      <InputChat />
    </div>
    )
}

export default Chat