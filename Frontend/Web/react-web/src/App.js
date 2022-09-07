import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HelloRequest} from './proto/greet_pb';
import { GreeterClient} from './proto/greet_grpc_web_pb';

class App extends Component {

  GrpcSome = () => {
    var client = new GreeterClient('https://localhost:5001', null, null)
    var request = new HelloRequest();
    request.setName("Hi!");
    client.sayHello(request,  {}, (err, response) => {
      if (response == null) {
        console.log(err)
      }else {
        console.log(response.getMessage())
      }
    });
  }

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Hello there!
            </p>
            <button onClick={this.GrpcSome}>Ping server</button>
          </header>
        </div>
      );
    }
}

export default App;
