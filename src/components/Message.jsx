import React from 'react'
import image from './navbar.png'

const Message = () => {
  return (
    <div className="message">
      <div className="messageContainer">
        <div className="playerProfileBox">
          <img className="playerMessagePhoto"src={image} alt="photox" />
          <span className="playerMessageName"> name </span>
        </div>
        <div className="playerMessage">
            <span className="playerMessageData"> 2012.12.35 04:12 AM</span>
            <p className="playerMessageText"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex voluptates quam neque quis beatae odio porro deserunt veniam susci </p>
        </div>
      </div>
    </div>
  )
}

export default Message