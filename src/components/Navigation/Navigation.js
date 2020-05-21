import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav>
        <p onClick={() => onRouteChange('signin')} className='nav-links'>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav>
        <p onClick={() => onRouteChange('signin')} className='nav-links'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='nav-links'>Register</p>
      </nav>
    );
  }
}

export default Navigation;