import React from 'react'
import '../CSS/ButtonStyles.css'
import '../CSS/Forms.css'

const Register = ({ onRouteChange }) => {
  return (
    <div id='outer-div'>
      <p id='p-signin'>Register</p>
      <form style={{'marginBottom': '20px'}}>
        <div id='inner-div'>
          <label>E-mail:</label>
          <input type='text' />
          <label>Password:</label>
          <input type='text' />
          <label>Confirm Password:</label>
          <input type='text' />
        </div>
        <button type='submit' onClick={() => onRouteChange('signin')} id='register-button' className='purple-button'>Register</button>
      </form>
    </div> 
  );
}


export default Register;