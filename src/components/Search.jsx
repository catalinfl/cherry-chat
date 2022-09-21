import React, {useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Search = () => {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState("");
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"), 
            where("displayName", "==", username))

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUser(doc.data());
        });
    }
    catch(err) {
        setErr(true);
    }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        const combinedId = 
        currentUser.uid > user.uid 
        ? currentUser.uid + user.uid 
        : user.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), {messages: [] });

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    }, 
                    [combinedId + ".date"]: serverTimestamp(),
                });

            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
            },
                [combinedId + ".date"]: serverTimestamp(),
        });
        } 
    }
        catch(err) {
            console.log(err)
        }

        setUser(null);
        setUsername("");
    }


    return (
        <div className="search">
            <div className="searchContainer">
                <AiOutlineSearch className="searchIcon"/>
                <input onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)}
                value={username} type="text" className="inputItemSearch bg-red-700" />
                {err && <span> User not found </span>}
                {user && (
                <div className="userChat bg-red-700" onClick={handleSelect}>
                    <div className="profile">
                    <img className="userChatImage" src={user.photoURL} alt="" />
                    <span> {user.displayName} </span> 
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Search