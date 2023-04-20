
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import LinkInput from './Components/LinkInput/LinkInput';
import Rank from './Components/Rank/Rank';
import Foto from './Components/Foto/Foto';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import ParticlesBg from 'particles-bg';
import { Component } from 'react';


 const clarifaiReturn = (imageurl) => {
  const PAT = '2b0868520efe4d059278e309c60b5a60';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'yzkvzvc7gvw7';       
    const APP_ID = 'myapp';
    // Change these to whatever model and image URL you want to use
    //const MODEL_ID = 'face-detection';
   // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
    const IMAGE_URL = imageurl;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};
  return requestOptions;
 }




class App extends Component {
  constructor() {
    super()
    this.state = {
      input : '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignin: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries:0,
        joined: ''
      }
    }
  }
  loadImg=()=>{
    this.setState({
      input:'',
      imageUrl:''
    })
  }

  loadUser=(user)=>{
    this.setState({user:{
        id: user.id,
        name: user.name,
        email: user.email,
        entries:user.entries,
        joined: user.joined
    }})
  }

  

  faceLocation = (data) => {
     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     
     const image = document.getElementById('inputImage')
     const width = Number(image.width);
     const height = Number(image.width);
     return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row*height)
      


     }
     
  }

displayBox = (box)=> {
  this.setState ({box:box})

}

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    
    this.setState ({imageUrl:this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", clarifaiReturn(this.state.input))
        .then(response => response.json())
        .then(result => {
          if(result){
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                  id:this.state.user.id
                  
              })
          })
          .then (response=>response.json())
          .then(count => {this.setState(Object.assign(this.state.user, { entries: count}))})
            .catch (console.log)
          }
          
        
          this.displayBox (this.faceLocation(result))
  })
        .catch(error => console.log('error', error));
    
  }

  onRouteChange = (route) => {
    if (route==='signout') {
      this.setState({isSignin:false})
    } else if (route==='home') {
      this.setState({isSignin:true})
    }
    this.setState({route:route})
  }

  render () {
    return (
    <div className="App">
        <ParticlesBg color="#b7f705" type="circle" bg={true} />
        <Navigation isSignin={this.state.isSignin} onRouteChange= {this.onRouteChange} />
        {this.state.route ==='home' ? 
          
            <div>
                      
                      <Logo />
                      <Rank name = {this.state.user.name} entries= {this.state.user.entries} />
                      <LinkInput onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                      <Foto box= {this.state.box} imageUrl={this.state.imageUrl} />
            </div>          
                      : (this.state.route==='signin' ?
                      
                        <Signin loadImg={this.loadImg} loadUser={this.loadUser} onRouteChange= {this.onRouteChange} /> 
                        : <Register loadImg={this.loadImg} loadUser= {this.loadUser} onRouteChange= {this.onRouteChange} />
                       
                        )
                       
                  
                      }
      
    </div>
  );
}

}
export default App;
