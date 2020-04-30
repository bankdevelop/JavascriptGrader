import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './css/style.css'

class Exercise extends Component {
    constructor(){
        super();
        this.state = {
            data:[]
        }
    }

    async componentDidMount(){
        if(localStorage.usertoken){
            await axios.post('/exercise/viewExercise/'+this.props.match.params.id, {usertoken:localStorage.usertoken})
                         .then(response => {
                             this.setState({
                                 data:response.data
                             })
                         });
         }
    }
    render() {
      return (
        <div id="exercise">
            {!localStorage.usertoken ? <Redirect to="/login" /> : ""}
            <div className="category-view">
                {this.state.data.map(
                    (data) => (
                        <div className="exercise-item" key={"exercise_id_"+data.id}>
                            {data.title} | {data.desc}
                        </div>
                    )
                )}
            </div>
        </div>
      )
    }
}

export default Exercise;