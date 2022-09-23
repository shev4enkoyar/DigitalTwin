import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.js';
import SignUp from './pages/SignUp.js';
import SignUpEnd from './pages/SignUpEnd.js';
import Profile from './pages/Profile.js';
import Tariffs from './pages/Tariffs';
import Models from './pages/Models';
import CreateModel from './pages/CreateModel';

//import { HelloRequest} from './proto/greet_pb';
//import { GreeterClient} from './proto/greet_grpc_web_pb';
class App extends Component {

  //GrpcSome = () => {
  //  var client = new GreeterClient('https://localhost:5001', null, null)
  //  var request = new HelloRequest();
  //  request.setName("Hi!");
  //  client.sayHello(request,  {}, (err, response) => {
  //    if (response == null) {
  //      console.log(err)
  //    }else {
  //      console.log(response.getMessage())
  //    }
  //  });
  //}

  render() {
      return (
          <div className="App">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/signUp" element={<SignUp />} />
                      <Route path="/signUpEnd" element={<SignUpEnd />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/tariffs" element={<Tariffs />} />
                      <Route path="/models" element={<Models />} />
                      <Route path="/create_model" element={<CreateModel/>} />
                  </Routes>
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            {/*<p>*/}
            {/*  Hello there!*/}
            {/*</p>*/}
              {/*<button onClick={this.GrpcSome}>Ping server</button>*/}
        </div>
      );
    }
}

export default App;
