import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../context/ChatContext';
import { db } from "../firebase";
import { useRef } from 'react'
import { AiOutlineDownCircle } from "react-icons/ai"
import { AiOutlineUpCircle } from 'react-icons/ai';


const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const [buttonDown, setButtonDown] = useState(true);
  const [buttonUp, setButtonUp] = useState(true);

  const ref = useRef();
  
  useEffect(() => {
    setButtonDown(true);
    setButtonUp(false);
  }, [messages]) 




  // if (messages) {
  //   console.log(ref.current?.scrollHeight - 508)
  //   console.log(ref.current?.scrollTop)
  // }


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
      ;
    })
    return () => {
      unSub();
      setButtonDown(true)
    }
  }, [data.chatId]);



  const scrollDown = () => {
    ref.current.scrollTo(0, ref.current?.scrollHeight);
    setButtonDown(false);
    setButtonUp(true);
  }

  const scrollUp = () => {
    ref.current.scrollTo(0, 0);
    setButtonUp(false);
    setButtonDown(true);
  }

  return (
    <div ref={ref} onDoubleClick={scrollDown} className="messages">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
     {buttonDown && <AiOutlineDownCircle onClick={scrollDown} className="downIcon"/>}
     {buttonUp && <AiOutlineUpCircle onClick={scrollUp} className="upIcon"/>}
    </div>
    )
}

export default Messages