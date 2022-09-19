import React from 'react'
import NavbarChat from './NavbarChat'
import Messages from './Messages'
import InputChat from './InputChat'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className="chat bg-red-400">
      <div className="chatInfo">
        <span> {data.user?.displayName} </span>
      <NavbarChat />
      </div>
      <Messages />
      <InputChat />
    </div>
    )
}

export default Chat