import React from 'react'
import { useContext } from 'react'
import {GiLoveSong, GiLoveMystery, GiSelfLove} from 'react-icons/gi'
import { ChatContext } from '../context/ChatContext'

const NavbarChat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className="navbarChat">
        <div className="navbarChatContainer">
            <p className="textLeft">
            {data?.user.displayName}
            </p>
            <div className="navbarChatIcons">
            <GiLoveSong />
            <GiLoveMystery/>
            <GiSelfLove/>
            </div>
        </div>
    </div>
  )
}

export default NavbarChat