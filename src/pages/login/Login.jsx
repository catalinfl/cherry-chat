import React, { useState } from 'react'
import './login.scss'
import { Input, Button } from '@material-tailwind/react'
import { Link, useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'


const Login = () => {

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(e.target);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/login");
    }
    catch(err) {
      setError(true);
      console.log(err);
    }
  }

  return (
    <div className="loginContainer bg-red-200">
      <div className="loginWrapper w-96 shadow-xl
      shadow-red-300 flex flex-col px-12">
        <p className="loginWrapperText"> Log-in. Chatapp.</p>
        <div className="formWrapper">
        <form onSubmit={handleSubmit} className="inputLoginForm flex flex-col w-full justify-center">
        <div className="mb-5">
        <Input className="logInputItem" type="text" color="red" label="Username"/>
        </div>
        <Input className="logInputItem" type="password" color="red" label="Password"/>
        <Button color="red" className="w-32 mt-12 mx-auto "> Log In  </Button> 
        <p className="textInfoRegister my-6 text-sm"> You don't have an account? <Link className="text-red-300" to='/register'>
          Register now
        </Link>
        </p>
        {error && <span className="errorText"> {error} </span>}
        </form>
        </div>
      </div>
    </div>

  )
}

export default Login