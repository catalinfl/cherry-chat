import React from 'react'
import { Input } from '@material-tailwind/react'
import { FcStackOfPhotos } from 'react-icons/fc'

const InputChat = () => {
  return (
    <div className="inputChat">
      <div className="inputChatContainer">
        <Input varriant="outlined" className="inputChatItem shadow-lg" type="text" label="chat" spellCheck="false" color="orange"/>
      </div>
      <FcStackOfPhotos className="inputIcon"/>
    </div>
    )
}

export default InputChat