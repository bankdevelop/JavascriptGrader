import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './css/style.css'

class Exercise extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            index:0
        }
        this.changeIndex = this.changeIndex.bind(this);
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

    changeIndex(id){
        var arr_index = this.state.data.indexOf(id);
        if(arr_index!==-1){
            this.setState({
                index:arr_index
            });
        }
    }

    render() {
      return (
        <div id="exercise">
            {!localStorage.usertoken ? <Redirect to="/login" /> : ""}
            <div className="category-view">
                <table style={{width:"100%", textAlign:"center"}}>
                <colgroup>
                            <col span="1" style={{width:"20%"}} />
                            <col span="1" style={{width:"80%"}} />
                            </colgroup>
                    <tbody>
                        <tr style={{verticalAlign:"top"}}>
                            <td>
                                {this.state.data.map(
                                    (data) => (
                                        <button onClick={() => this.changeIndex(data)} className="exercise-menu" key={"exercise_id_menu_"+data.id}>
                                            {data.title}
                                        </button>
                                    )
                                )}
                            </td>
                            <td>
                                <div className="exercise_field">
                                    <div className="exercise_field_title">
                                        {(this.state.data.length!==0 && this.state.index<this.state.data.length)?
                                                                        this.state.data[this.state.index].title:"Exercise doesn't exist"}
                                    </div>
                                    <div className="exercise_field_desc">
                                        {(this.state.data.length!==0 && this.state.index<this.state.data.length)?
                                                                        this.state.data[this.state.index].desc:""}
                                    </div>
                                    <hr/>
                                    <div className="exercise_field_desc">
                                        {/* For Starter_code Feature
                                        {(this.state.data.length!==0 && this.state.index<this.state.data.length)
                                        ?(this.state.data[this.state.index].starter_code!==null
                                            ?this.state.data[this.state.index].starter_code:""):""} */}
                                        <p id="exercise_field_input" className="exercise_field_input" contentEditable="true"></p>
                                        <input className="exercise_field_button" type="submit" value="submit code" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      )
    }
}

export default Exercise;

/*

                {this.state.data.map(
                    (data) => (
                        <div className="exercise-item" key={"exercise_id_"+data.id}>
                            {data.title} | {data.desc}
                        </div>
                    )
                )}

*/