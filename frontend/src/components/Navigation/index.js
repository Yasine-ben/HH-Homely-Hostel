// frontend/src/components/Navigation/index.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../assets/logo.png"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <div className="header">
        <NavLink ClassName="logo" exact to="/"> <img src={logo} height="50" width="50"/> </NavLink>
        <nav className="navigation">
          <NavLink class="nav-link" to="/">Link-1</NavLink>
          <NavLink class="nav-link" to="/">Link-2</NavLink>
          <NavLink class="nav-link" to="/">Link-3</NavLink>
          
        </nav>
        <buttons>
          {isLoaded && (<ProfileButton classname="profile-btn" user={sessionUser} />)}
        </buttons>
      </div>
    
    </>
  );
}

export default Navigation;