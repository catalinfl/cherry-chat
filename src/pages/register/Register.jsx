import React from 'react'
import { Input, Button } from '@material-tailwind/react'
import "./register.scss"
import { BiCloudUpload } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage, db } from '../../firebase';
import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";



const Register = () => {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    var vipLevel = 0;
    

    try {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
            vipLevel
          })
          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate('/');
        } catch(err) {
          console.log(err);
          setError(true);
          setLoading(false);
        }
      })
    })
    }
    catch(err) {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="formContainer bg-red-200">
      <div className="formWrapper w-96 shadow-xl shadow-red-300 flex mx-auto flex-col p-8 bg-white">
        <span className="title"> Chatapp - Register </span>
      <form onSubmit={handleSubmit} className="formInput flex flex-col">
      <Input className="inputItem bg-white" color="red" type="text" label="Username" />
      <Input className="inputItem" color="red" type="email" label="Email" />
      <Input className="inputItem" color="red" type="password" label="Password" />
      <input className="inputFile" style={{display: 'none'}} id="file" type="file" />
      <label className="uploadLabel w-auto" htmlFor="file">
      <BiCloudUpload className="uploadIcon text-red-500"/>
      <span className="uploadMessage"> Add an avatar </span>
      </label>
      <Button disabled={loading} type="submit" color="red" className="signIn w-32 mx-auto mt-3"> Sign in </Button>
      {error && <span className="errorText"> Something went wrong </span> }
      {loading && <span className="loadingText"> Loading please wait... </span>}
      </form> 
      <p className="infoText mt-9 text-sm "> Have an account? 
      <Link to='/login' style={{color: 'inherit'}}>
        <span className="text-red-600"> Log in now </span> 
      </Link>
      </p>
      </div>
    </div>
    )
}



export default Register