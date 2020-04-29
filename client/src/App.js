import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './components/css/style.css';

import Navbar from './components/navbar';
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <div className="container">
            <Route exact path="/" component={Welcome} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;