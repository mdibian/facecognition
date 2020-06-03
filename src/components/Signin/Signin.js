import React from 'react'
import '../CSS/ButtonStyles.css'
import '../CSS/Forms.css'

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

    const { signInEmail, signInPassword } = this.state;

    fetch('http://localhost:3000/signin', {
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
        <form>
          <div id='inner-div'>
            <label>E-mail:</label>
            <input type='text' onChange={e => this.onEmailChange(e)}/>
            <label>Password:</label>
            <input type='password' onChange={e => this.onPasswordChange(e)}/>
          </div>
          <button onClick={e => this.onSubmitSignIn(e)} id='register-button' className='purple-button'>Sign In</button>
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