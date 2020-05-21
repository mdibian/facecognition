import React from 'react'
import '../CSS/ButtonStyles.css'
import '../CSS/Forms.css'

const Signin = ({ onRouteChange }) => {
  return (
    <div id='outer-div'>
      <p id='p-signin'>Sign In</p>
      <form>
        <div id='inner-div'>
          <label>E-mail:</label>
          <input type='text' />
          <label>Password:</label>
          <input type='text' />
        </div>
        <button type='submit' onClick={() => onRouteChange('home')} id='register-button' className='purple-button'>Sign In</button>
      </form>
      <div style={{'margin': '20px'}}>
        <p id='p-text'>Don't have an account yet? Register </p>
        <p onClick={() => onRouteChange('register')} id='p-register'>here!</p>
      </div>
    </div> 
  );
}


export default Signin;