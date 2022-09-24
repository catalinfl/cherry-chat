import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../context/ChatContext';
import { db } from "../firebase";
import { useRef } from 'react'
import { AiOutlineDownCircle } from "react-icons/ai"


const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const [button, setButton] = useState(false);

  const ref = useRef();

  // useEffect(() => {
  //   console.log(ref.current.scrollTop);
  // }, [messages]) 


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })
    return () => {
      unSub();
    }
  }, [data.chatId]);

  const showDownButton = () => {
    ref.current?.scroll({behavior: "smooth"})
    ref.current?.scrollTo(0, ref.current.scrollHeight)
    setButton(false);
  }


  return (
    <div ref={ref} className="messages">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
      <AiOutlineDownCircle onClick={showDownButton} className="downIcon"/>
    </div>
    )
}

export default Messages