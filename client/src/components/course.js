import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { viewCourse } from "./js/courseFunctions"

class Course extends Component {
  constructor(){
      super();
      this.state = {
          data:[]
      }
  }

  async componentDidMount() {
    if(localStorage.usertoken){
       await axios.post('course/viewCourse', {usertoken:localStorage.usertoken})
                    .then(response => {
                        this.setState({
                            data:response.data
                        })
                    });
    }
  }

  render() {
    return (
      <div className="container">
        {!localStorage.usertoken ? <Redirect to="/login" /> : ""}
        {this.state.data.map(data => (
            <div key={data.id}>{data.name}</div>
        ))}
      </div>
    )
  }
}

export default Course