import React from 'react'
import '../CSS/ButtonStyles.css'
import '../CSS/Forms.css'
import getEndPoint from '../../getEndPoint.js'

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }
  
  onEmailChange(event) {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange(event) {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn(event) {
    event.preventDefault();

    console.log('AAAAAAAAAAAAAAAA erro')
    const { signInEmail, signInPassword } = this.state;

    fetch(getEndPoint('signin'), {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
    .then(response => response.json())
    .then(user => { 
      if (user.id) { 
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }

  render() {
    return (
      <div id='outer-div'>
        <p id='p-signin'>Sign In</p>
        <form onSubmit={e => this.onSubmitSignIn(e)}>
          <div id='inner-div'>
            <label>E-mail:</label>
            <input type='email' onChange={e => this.onEmailChange(e)} required/>
            <label>Password:</label>
            <input type='password' onChange={e => this.onPasswordChange(e)} required/>
          </div>
          <button id='register-button' className='purple-button'>Sign In</button>
        </form>
        <div style={{'margin': '20px'}}>
          <p id='p-text'>Don't have an account yet? Register </p>
          <p onClick={() => this.props.onRouteChange('register')} id='p-register'>here!</p>
        </div>
      </div> 
    );
  }
}

export default Signin;