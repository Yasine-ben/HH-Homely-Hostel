// frontend/src/components/Navigation/index.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../assets/logo-new.png"




function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <header className='header-main'>

        <NavLink className="header-main-logo" exact to="/"> 
          <img src={logo} alt="logo" /> 
        </NavLink>

        <div className='header-main-link'>
        {sessionUser ? (<NavLink to="/">Create a New Spot</NavLink>) : 
                       (<NavLink to="/">No user logged in</NavLink>)}
        </div>
        
        <div className='header-profile-btn'>
          {isLoaded && (<ProfileButton  user={sessionUser} />)}
        </div>
      
      </header>
    </>
  );
}

export default Navigation;