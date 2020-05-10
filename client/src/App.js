import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './components/css/style.css';

import Navbar from './components/navbar';
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import Course, {CourseView} from './components/course';
import Error from './components/Error';
import Exercise from './components/exercise';
import AdminPage from './components/admin';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/course" component={Course} />
              <Route exact path="/admin" component={AdminPage} />
              <Route exact path="/course/:id" component={(props) => <CourseView {...props} />} />
              <Route exact path="/course/category/:id" component={(props) => <Exercise {...props} />} />
              <Route>
                <Error/>
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;