import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRef } from 'react'
import { useEffect } from 'react'

const Message = ( { message }) => {

  const { currentUser } = useContext(AuthContext);




  const time = new Date(1970, 0, 1);

  time.setSeconds(message.date.seconds + 10800);

  // const dateOf = new Date(message.date.seconds * 1000).toUTCString();
  const newData = 
  time.toString().slice(4, 15) 
  + " " 
  + time.toString().slice(16, 24)


  return (
    <div className="message">
      <div className="messageContainer">
        <div className="playerProfileBox">
          <img className="playerMessagePhoto" src={
            currentUser.photoURL
} alt="photos" />
        </div>
        <div className="playerMessage">
            <span className="playerMessageData"> {newData} </span>
            <p className="playerMessageText"> {message.text} </p>
        </div>
      </div>
    </div>
  )
}

export default Message