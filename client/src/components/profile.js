import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      status: "0",
      errors: {}
    }
  }

  componentDidMount() {
    if(localStorage.usertoken){
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
        status: decoded.rank
      });
    }
  }

  render() {
    return (
      <div className="container">
        {!localStorage.usertoken ? <Redirect to="/login" /> : ""}
        <div className="profile">
          <div className="title-profie">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table-pofile">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
          <div style={{padding:10}}>
            <a href="/course">ViewCourse</a> <br/>
            {this.state.status==="1"?<Link to="/admin">Admin Page</Link>:""}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile