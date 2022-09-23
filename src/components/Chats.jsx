import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase'
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

const Chats = () => {
    
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch  } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });


            return () => {
                unSub();
            }
        }
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    }

    
    
    return (
    <div className="chats">
    {Object.entries(chats)?.sort().map((chat) => (
        <div className="userChat bg-red-700" 
        key={chat[0]}
        onClick={() => handleSelect(chat[1].userInfo)}
        >
        <div className="profile">
        <img className="userChatImage" src={chat[1].userInfo?.photoURL} alt="name" />
            <span> {chat[1]?.userInfo?.displayName} </span> 
        </div>
        <div className="userChatInfo">
            <span> {chat[1]?.lastMessage?.text.length >= 30 ? chat[1]?.lastMessage?.text.slice(0, 30) + "..." : chat[1]?.lastMessage?.text} </span>
        </div>
    </div>
    ))}
    </div>
)
}

export default Chats