import React from 'react'
import { Input, Button } from '@material-tailwind/react'
import "./register.scss"
import { BiCloudUpload } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage } from '../../firebase';
import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const Register = () => {

  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const storageRef = ref(storage, displayName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      (error) => {
        setError(true);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          })
        });
      }
    );
    }
    catch(err) {
      setError(true);
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
      <input className="inputFile" style={{display: 'none'}} id="file"type="file" />
      <label className="uploadLabel w-auto" htmlFor="file">
      <BiCloudUpload className="uploadIcon text-red-500"/>
      <span className="uploadMessage"> Add an avatar </span>
      </label>
      <Button type="submit" color="red" className="signIn w-32 mx-auto mt-3"> Sign in </Button>
      </form>
      {error && <span className="errorText"> Something went wrong </span> }
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