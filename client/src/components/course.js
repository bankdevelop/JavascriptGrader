import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './css/style.css'

class Course extends Component {
  constructor(){
      super();
      this.state = {
          data:[]
      }
  }

  async componentDidMount() {
    if(localStorage.usertoken){
       await axios.post('/course/viewCourse', {usertoken:localStorage.usertoken})
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
        <div className="course-title">
            Course List
        </div>
        {this.state.data.map(data => (
            <CourseItem key={data.id} dataId={data.id} name={data.name} desc={data.desc} />
        ))}
      </div>
    )
  }
}

class CourseItem extends Component {
    render() {
      const { dataId, name, desc } = this.props;
      return (
              <div className="course-item">
                  <div>
                      <a style={{fontWeight:"bold", textDecoration:"underline", color:"black"}} href={"/course/"+dataId}>
                        {name}
                      </a>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"left"}}>
                      <span style={{width:"100%"}}>{desc}</span>
                        <span style={{backgroundColor:"blanchedalmond", padding:5, width:38, border:"1px black solid", borderRadius:10}}>
                            <a href={"/course/"+dataId} style={{color:"black", textDecoration:"none"}}>
                                View
                            </a>
                        </span>
                  </div>
              </div>
            );
    }
}

export class CourseView extends Component {
    constructor(){
        super();
        this.state = {
            data:[]
        }
    }

    async componentDidMount(){
        if(localStorage.usertoken){
            await axios.post('/course/viewCourseCategory/'+this.props.match.params.id, {usertoken:localStorage.usertoken})
                         .then(response => {
                             this.setState({
                                 data:response.data
                             })
                         });
        }
    }
    render() {
      return (
        <div id="category">
            {!localStorage.usertoken ? <Redirect to="/login" /> : ""}
            <div className="category-view">
                {this.state.data.length===0?"Not have any exercise":""}
                {this.state.data.map(data => (
                    <div className="category-item" key={"category"+data.id}>
                        <a href={"/course/category/"+data.id}>{data.title}</a> | {data.desc}
                    </div>
                ))}
            </div>
        </div>
      )
    }
}

export default Course;