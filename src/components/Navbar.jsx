import React, {useContext} from 'react'
import { Button } from '@material-tailwind/react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

const navigate = useNavigate();

const { currentUser } = useContext(AuthContext);
console.log(currentUser);


const signOutFunction = () => {
  signOut(auth);
  navigate('/login');
}


  return (
    <div className="navbar h-16 bg-red-700">
        <div className="user my-auto">
            <img src={currentUser.photoURL} alt="profilePhoto" />
            <span className="text-sm my-auto"> {currentUser.displayName} </span>
        </div>
        <Button onClick={signOutFunction} className="chatButton bg-red-400 shadow-sm w-16 h-5 justify-center flex items-center shadow-red-300 hover:shadow-red-300 rounded-none "> Log out </Button>
    </div>
  )
}

export default Navbar