import Register from './pages/register/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import React from 'react';
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext';


function App() {

  const {currentUser} = useContext(AuthContext);

  console.log(currentUser);

  return (

<BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} /> 
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>    
    );
}

export default App;
