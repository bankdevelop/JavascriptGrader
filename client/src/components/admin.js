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
    render() {
        const {name, desc, status} = this.props;
        return (
            <div className="course-list-item">
                <span>name : {name} |</span>
                <span>description : {desc} |</span>
                <span>{status?"Open":"Closed"}</span>
            </div>
        );
    }
}

class AdminAddCourseForm extends Component {
    render() {
        return (
            <form className="form">
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

        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    async componentDidMount(){
        if(localStorage.usertoken){
            await axios.post('/admin/viewAllCourse', {usertoken:localStorage.usertoken})
                         .then(response => {
                             this.setState({
                                 data:response.data
                             });
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

    handleAddCourse(){
        if(this.state.isEdit){
            if(this.state.name !== "" && this.state.desc !== ""){
                ;//axios post create course
            }
        }
    }

    handleEdit(){
        this.setState({
            isEdit:this.state.isEdit?false:true
        });
        console.log('fsdsfd');
    }

    render() {
        return (
            <div className="admin-course">
                <div className={this.state.isEdit?"admin-add-course":"admin-add-course hidden"}>
                    <span className="create-new-course">Create new course</span>
                    <AdminAddCourseForm handleChange={this.handleChange} />
                </div>
                <div className="admin-button">
                    {(!this.state.isEdit)? 
                    <input className="create-new-course-button" onClick={this.handleEdit} type="submit" value="Add new" />
                    :<input className="close-new-course-button" onClick={this.handleEdit} type="submit" value="Close tab" />}
                </div>
                <div className="admin-list-course">
                    {this.state.data.map((values) => {
                        return (
                            <CourseItem key={values.id+"apre_56e"} 
                                        name={values.name}
                                        desc={values.desc}
                                        status={values.status} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default AdminPage;