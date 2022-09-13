import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai';
import image from './navbar.png'

const Search = () => {
  return (
    <div className="search">
        <div className="searchContainer">
            <form className="formInput">
            <AiOutlineSearch className="searchIcon"/>
            <input type="text" className="inputItemSearch bg-red-700" /> 
            </form> 
            <div className="userChat bg-red-700">
                <div className="profile">
                <img className="userChatImage" src={image} alt="name" />
                <span> Jamie </span> 
                </div>
                <div className="userChatInfo">
                <span> Lorem ipsum dolor sit amet. </span>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Search