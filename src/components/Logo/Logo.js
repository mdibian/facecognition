import React from 'react'
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
  return (
    <div className='logo-container'>
      <a href='/'>
        <div className='logo-portrait'>
          <img className='logo-brain' src={brain} alt='Logo'/>
        </div>
      </a>
    </div>
  );
}

export default Logo;