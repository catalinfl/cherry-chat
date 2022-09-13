import React from 'react'
import {GiLoveSong, GiLoveMystery, GiSelfLove} from 'react-icons/gi'

const NavbarChat = () => {
  return (
    <div className="navbarChat">
        <div className="navbarChatContainer">
            <p className="textLeft">
                Lorem ipsum dolor sit amet.
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