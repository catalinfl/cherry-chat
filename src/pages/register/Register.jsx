import React from 'react'
import { Input, Button } from '@material-tailwind/react'
import "./register.scss"
import { BiCloudUpload } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="formContainer bg-red-200">
      <div className="formWrapper w-96 shadow-xl shadow-red-300 flex mx-auto flex-col p-8 bg-white">
        <span className="title"> Chatapp - Register </span>
      <form className="formInput flex flex-col">
      <Input className="inputItem bg-white" color="red" type="text" label="Username" />
      <Input className="inputItem" color="red" type="email" label="Email" />
      <Input className="inputItem" color="red" type="password" label="Password" />
      <input className="inputFile" style={{display: 'none'}} id="file"type="file" />
      <label className="uploadLabel w-auto" htmlFor="file">
      <BiCloudUpload className="uploadIcon text-red-500"/>
      <span className="uploadMessage"> Add an avatar </span>
      </label>
      <Link to='/' style={{color: 'inherit'}}> 
      <Button color="red" className="signIn w-32 mx-auto mt-3"> Sign in </Button>
      </Link>
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