import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { useRef } from 'react'
import { useEffect } from 'react'

const Message = ( { message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext)

  const ref = useRef();

  const setUser = () => {
    if (message.senderId === currentUser.uid) {
      return currentUser.displayName;
    }
    else return data.user.displayName;
  }


  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth"});
  }, [message])

  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`} ref={ref}>
      <div className="messageContainer">
        <div className="playerProfileBox">
          <img className="playerMessagePhoto" src={
            message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL
          } alt="photox" />
          <span className="playerMessageName"> {setUser} </span>
        </div>
        <div className="playerMessage">
            <span className="playerMessageData"> 2012.12.35 04:12 AM</span>
            <p className="playerMessageText"> {message.text} </p>
        </div>
      </div>
    </div>
  )
}

export default Message