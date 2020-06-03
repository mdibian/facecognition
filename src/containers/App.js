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
import Clarifai from 'clarifai'

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

const app = new Clarifai.App({
  apiKey: '43e894a293f54a3e93017006280cfa9d'
});

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
      }
    }
  }

  loadUser(data) {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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
    this.setState({imgUrl: this.state.input})
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayBoundingBox(response))
    .catch(err => console.log(err))
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
            <FaceRecognition boundingBox={boundingBox} imgUrl={imgUrl} /> 
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
