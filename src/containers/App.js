import React, { Component } from 'react'
import './App.css'
import Navigation from '../components/Navigation/Navigation.js'
import Logo from '../components/Logo/Logo.js'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js'
import Rank from '../components/Rank/Rank.js'
import Signin from '../components/Signin/Signin.js'
import Register from '../components/Register/Register.js'
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js'
import Particles from 'react-particles-js'
import getEndPoint from '../getEndPoint.js'

const particlesParams = {
  particles: {
    number: {
      value: 25,
      density: {
        enable: true,
        value_area: 200,
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      boundingBox: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      },
      isResponseValid: true
    }
  }

  loadUser(data) {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
    this.clearImage();
  }

  clearImage() {
    this.setState({boundingBox: {}});
    this.setState({imgUrl: ''})
  }

  calculateBoundingBox(boundingBoxData, img) {
    const width = Number(img.width)
    const height = Number(img.height)

    const boundingBox = {
      leftCol: width * boundingBoxData.left_col,
      topRow: height * boundingBoxData.top_row,
      rightCol: width  - (width * boundingBoxData.right_col),
      bottomRow: height - (height * boundingBoxData.bottom_row)
    }

    this.setState({boundingBox: boundingBox});
  }

  displayBoundingBox(data) {
    const boundingBoxData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('input-image');

    if (img.complete && img.naturalHeight !== 0) {
      this.calculateBoundingBox(boundingBoxData, img);
    } else {
      img.onload = () => {
        this.calculateBoundingBox(boundingBoxData, img);
      }
    }
  }

  onInputChange(event) {
    this.setState({input: event.target.value});
  }

  onSubmit(event) {
    fetch(getEndPoint('imageUrl'), {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      
      if (response) {
        this.setState({isResponseValid: true});

        fetch(getEndPoint('entries'), {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            loaded_user_id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => { 
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        
        this.setState({imgUrl: this.state.input});
        this.displayBoundingBox(response);
      } else {
        this.setState({isResponseValid: false});
      }
    })
    .catch(err => { 
      console.log(err);
      this.setState({isResponseValid: false});
    })
  }

  onRouteChange(route) {
    if (route === 'home') {
      this.setState({isSignedIn: true});
    } else {
      this.setState({isSignedIn: false});
    }

    this.setState({'route': route});
  }

  render() {
    const { imgUrl, boundingBox, route, isSignedIn } = this.state;

    return (
      <div className='App'>
        <Particles params={particlesParams} className='particles'/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange.bind(this)}/>
        <Logo />
        { route === 'home' ? 
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange.bind(this)}
              onSubmit={this.onSubmit.bind(this)} />

              {this.state.isResponseValid && 
                <FaceRecognition boundingBox={boundingBox} imgUrl={imgUrl} />
              }
            
          </div>
          : 
          (
            route === 'signin' ?
            <Signin onRouteChange={this.onRouteChange.bind(this)} loadUser={this.loadUser.bind(this)}/>
            :
            <Register onRouteChange={this.onRouteChange.bind(this)}/>
          )
        }
      </div>
    );
  }
}

export default App;
