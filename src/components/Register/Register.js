import React from 'react'
import '../CSS/ButtonStyles.css'
import '../CSS/Forms.css'
import getEndPoint from '../../getEndPoint.js'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInName: '',
      signInEmail: '',
      signInPassword: '',
      signInPassConfirm: '',
    }
  }

  onNameChange(event) {
    this.setState({signInName: event.target.value})
  }
  
  onEmailChange(event) {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange(event) {
    this.setState({signInPassword: event.target.value})
  }

  onPassConfirmChange(event) {
    this.setState({signInPassConfirm: event.target.value})
  }

  onSubmitSignIn(event) {
    event.preventDefault();
    
    const { signInName, signInEmail, signInPassword, signInPassConfirm } = this.state;

    fetch(getEndPoint('register'), {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        name: signInName,
        email: signInEmail,
        password: signInPassword, 
        passconfirm: signInPassConfirm
      })
    })
    .then(response => response.json())
    .then(data => { 
      if (typeof data.email !== 'undefined') { 
        this.props.onRouteChange('signin');
      } else {
        this.props.onRouteChange('register');
      }
    })
  }

  render() {
    return (
      <div id='outer-div'>
        <p id='p-signin'>Register</p>
        <form onSubmit={e => this.onSubmitSignIn(e)} style={{'marginBottom': '20px'}}>
          <div id='inner-div'>
            <label>Name:</label>
            <input type='text' onChange={e => this.onNameChange(e)} required/>
            <label>E-mail:</label>
            <input type='email' onChange={e => this.onEmailChange(e)} required/>
            <label>Password:</label>
            <input type='password' onChange={e => this.onPasswordChange(e)} required/>
            <label>Confirm Password:</label>
            <input type='password' onChange={e => this.onPassConfirmChange(e)} required/>
          </div>
          <button id='register-button' className='purple-button'>Register</button>
        </form>
      </div> 
    );
  }
}

export default Register;