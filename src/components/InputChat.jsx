import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { FcStackOfPhotos } from "react-icons/fc";
import { Input, Button } from '@material-tailwind/react'
import { FiAlertCircle } from "react-icons/fi"
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  onSnapshot,
  getDoc
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputChat = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [valueLength, setValueLength] = useState(false);
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const [isMinimumInput, setIsMinimumInput] = useState(false);
  const [anotherCharacters, setAnotherCharacters] = useState(0);
  const [anotherCharactersBool, setAnotherCharactersBool] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), 
            {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      if (text.length === 0) { setIsEmptyInput(true); return }
      if ((text.length < 5) && (text.length > 0)) {
        return setIsMinimumInput(true);
      }     
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
          });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    },
    );
    
    setText("")
    setImg(null);
    setValueLength(false);
    setAnotherCharactersBool(false);
    setIsEmptyInput(false);
    setIsMinimumInput(false);
  };
}


  var numberOfCharactersAllowed = 151;

  const onChangeText = (e) => {
    const inputCharacters = e.target.value.length;
    if (inputCharacters < numberOfCharactersAllowed) {
    setText(e.target.value);
    setValueLength(false);
    setIsEmptyInput(false);
  }
    setAnotherCharactersBool(false);
    setIsEmptyInput(false);

    if (inputCharacters >= numberOfCharactersAllowed - 20) {
        setAnotherCharacters(numberOfCharactersAllowed - inputCharacters);
        setAnotherCharactersBool(true);
        setIsEmptyInput(false);
      }

    if (inputCharacters >= numberOfCharactersAllowed) {
      setValueLength(true);
      setAnotherCharactersBool(false);
      setIsEmptyInput(false);
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSend()  
  }




  return (
    <> 
    <div className="inputChat">
      <div className="inputChatContainer">
        <Input onKeyUp={handleKey} varriant="outlined" type="text" onChange={(e) => onChangeText(e)} value={text} className="inputChatItem shadow-lg" label="chat" spellCheck="false" color="orange"/>
      </div>
        <input type="file" style={{display: 'none'}} id="file" onChange={(e) => onChangeText(e)} />
      <label htmlFor='file'> 
      <FcStackOfPhotos className="inputIcon"/>
      </label>
      <Button color="red" type="submit" onClick={handleSend}> Send </Button>
    </div>
     <div className="errorContainer"> 
      { anotherCharactersBool && <div className="errorRemainingCharacters"> <p> {` ${anotherCharacters - 1} characters remaining... `} </p> </div>}
      { valueLength && <div className="errorMaxCharacters">  <FiAlertCircle className="errorIcon"/>  <p>  {`Maximum ${numberOfCharactersAllowed - 1} characters`} </p> </div> }
      { isEmptyInput && <div className="errorMaxCharacters">  <FiAlertCircle className="errorIcon"/>  <p> Write something before sending </p> </div> }
      { isMinimumInput && <div className="errorMaxCharacters">  <FiAlertCircle className="errorIcon"/>  <p> Minimum 5 characters </p> </div> }
      </div>
      </>
)
};


export default InputChat;