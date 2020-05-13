import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios';
import './css/admin.scss'

class AdminPage extends Component {
    render() {
        return (
            <BrowserRouter>
                <div id="admin-control">
                    <AdminLeftMenu/>
                    <Switch>
                        <Route exact path="/admin" component={AdminCourse} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

class AdminLeftMenu extends Component {
    render() {
        return (
            <div className="admin-left-menu">
                <div className="left-menu-item">
                    <Link to="/admin/addCourse">Add Course</Link>
                </div>
                <div className="left-menu-item">
                    <Link to="/admin/addCategory">Add Category</Link>
                </div>
                <div className="left-menu-item">
                    <Link to="/admin/addExercise">Add Exercise</Link>
                </div>
            </div>
        );
    }
}

class CourseItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            editCourse:false
        }

        this.handleEditCourse = this.handleEditCourse.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    }

    handleEditCourse(){
        this.setState({
            editCourse:this.state.editCourse?false:true
        });
    }

    async handleDeleteCourse(){
        let msg = 'Are you sure? Delete "'+this.props.name+'" course\nCategory and Exercise under this course will be delete too!';
        let sureDelete = window.confirm(msg);
        if(sureDelete){/* can use body in delete request
            if(localStorage.usertoken){
                await axios.delete('/admin/course', {usertoken:localStorage.usertoken, course_id:this.props.id})
                            .then(response => {
                                console.log(response);
                            });
            }*/
        }
    }

    render() {
        const {name, desc, status} = this.props;
        return (
            <tr className="course-list-item">
                <td>
                    <span><strong>Name</strong> : {name}</span>
                </td>
                <td>
                    <span><strong>Description</strong> : {desc}</span>
                </td>
                <td>
                    {status?<span style={{color:"green",fontWeight:"bold"}}>Open</span>
                            :<span  style={{color:"red",fontWeight:"bold"}}>Closed</span>}
                </td>
                <td style={{textAlign:"right",paddingRight:"20px"}}>
                    <input onClick={this.handleEditCourse} type="submit" value="Edit" />
                    <input onClick={this.handleDeleteCourse} type="submit" value="Delete" />
                </td>
            </tr>
        );
    }
}

class AdminAddCourseForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="form">
                <div className="form-group">
                    <label>Course name: </label>
                    <input onChange={this.props.handleChange} type="text" id="name" name="name" placeholder="Place course name..." required/>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" placeholder="Place description..." onChange={this.props.handleChange} className="large-box" id="desc" name="desc" required/>
                </div>
                <div className="form-group">
                    <label>Status: </label>
                    <input onChange={this.props.handleChange} type="checkbox" className="large-box" id="status" name="status"/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create new Course" />
                </div>
            </form>
        );
    }
}

class AdminCourse extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            isEdit: false,
            name: "",
            desc: "",
            status: false
        }

        this.getAllCourse = this.getAllCourse.bind(this);
        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount(){
        this.getAllCourse();
    }

    componentDidUpdate(){
        this.getAllCourse(); //Need to fix this because when use handleChange working. It unnecessary request getAllCourse || it not good design
    }
    
    async getAllCourse(){
        if(localStorage.usertoken){
            await axios.post('/admin/viewAllCourse', {usertoken:localStorage.usertoken})
                        .then(response => {
                            if(!array_equal(this.state.data,response.data)){
                                this.setState({
                                    data:response.data
                                });
                            }
                        });
        }
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        if(name!=="status"){
            this.setState({
                [name]:value
            });
        }else{
            this.setState({
                status:event.target.checked
            });
        }
    }

    async handleAddCourse(event){
        event.preventDefault();
        if(this.state.isEdit){
            if(this.state.name !== "" && this.state.desc !== ""){
                if(localStorage.usertoken){
                    await axios.post('/admin/course', {usertoken:localStorage.usertoken, name:this.state.name, 
                                                       desc:this.state.desc, status:this.state.status})
                                .then(response => {
                                    console.log(response);
                                    this.setState({
                                        name:"",
                                        desc:"",
                                        status:false
                                    });
                                    document.getElementById('name').value="";
                                    document.getElementById('desc').value="";
                                });
                }
            }
        }
    }

    handleEdit(){
        this.setState({
            isEdit:this.state.isEdit?false:true
        });
    }

    render() {
        return (
            <div className="admin-course">
                <div className={this.state.isEdit?"admin-add-course":"admin-add-course hidden"}>
                    <span className="create-new-course">Create new course</span>
                    <AdminAddCourseForm handleSubmit={this.handleAddCourse} handleChange={this.handleChange} />
                </div>
                <div className="admin-button">
                    {(!this.state.isEdit)? 
                    <input className="create-new-course-button" onClick={this.handleEdit} type="submit" value="Add new" />
                    :<input className="close-new-course-button" onClick={this.handleEdit} type="submit" value="Close tab" />}
                </div>
                <div className="admin-list-course">
                    <table style={{width:"100%",borderCollapse:"collapse"}}>
                        <colgroup>
                            <col span="1" style={{width:"25%"}} />
                            <col span="1" style={{width:"35%"}} />
                            <col span="1" style={{width:"15%"}} />
                            <col span="1" style={{width:"25%"}} />
                        </colgroup>
                        <tbody style={{border:"1px rgb(226, 226, 226) solid"}}>
                            {this.state.data.map((values) => {
                                return (
                                    <CourseItem key={values.id+"apre_56e"} //random key : apre_56e has nothing mean
                                                name={values.name}
                                                desc={values.desc}
                                                status={values.status}
                                                id={values.id} />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default AdminPage;

function array_equal(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
}