import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './css/style.css'

class Exercise extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            test_result:[],
            index:0,
            test_case:""
        }
        this.changeIndex = this.changeIndex.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount(){
        if(localStorage.usertoken){
            await axios.post('/exercise/viewExercise/'+this.props.match.params.id, {usertoken:localStorage.usertoken})
                         .then(async response => {
                             this.setState({
                                 data:response.data
                             });

                             var testResultData = [];
                             await response.data.map(async (data) => {
                                axios.post('/exercise/findTestResult/'+data.id, {usertoken:localStorage.usertoken})
                                     .then(resTestResult => {
                                        if(typeof resTestResult.data !== "string"){
                                            testResultData.push(resTestResult.data);
                                        }else{
                                            testResultData.push("");
                                        }
                                     })
                             })
                             this.setState({
                                 test_result:testResultData
                             });
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

    async onSubmit(e){
        e.preventDefault();
        var raw_code = document.getElementById('exercise_field_input').innerHTML;
        if(raw_code!==""){
            await axios.post('/exercise/runTestCase/', {usertoken:localStorage.usertoken,
                                                        raw_code:raw_code,
                                                        id:this.state.data[this.state.index].course_id, 
                                                        exercise_id:this.state.data[this.state.index].id})
                         .then(async response => {
                             this.setState({
                                 test_case:response.data
                             });
                             console.log(this.state.test_case);
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
                                    <span className="exercise_test_result">
                                        {this.state.test_result.length!==0?(this.state.test_result[this.state.index]!==""?"Result | ["+this.state.test_result[this.state.index].result+"]":""):""}
                                    </span>
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
                                        <form onSubmit={this.onSubmit}>
                                            <p id="exercise_field_input" className="exercise_field_input" contentEditable="true"></p>
                                            <input className="exercise_field_button" type="submit" value="submit code" />
                                        </form>
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