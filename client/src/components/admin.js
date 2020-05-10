import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import './css/admin.css'

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
                <Link to="/admin/addCourse">Add Course</Link>
                <Link to="/admin/addCategory">Add Category</Link>
                <Link to="/admin/addExercise">Add Exercise</Link>
            </div>
        );
    }
}

class AdminCourse extends Component {
    constructor() {
        super();

        this.state = {
            isEdit: false
        }
    }
    
    render() {
        return (
            <div className={/*this.state.isEdit?*/"admin-add-course"/*:"admin-add-course hidden"*/}>
                add course
                <form className="form">
                    <div className="form-group">
                        <label>Course name: </label>
                        <input type="input" id="name" name="name" placeholder="Place course name.." required/>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <div className="large-box" contentEditable="true" id="desc" name="desc"></div>
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <div className="large-box" contentEditable="true" id="desc" name="desc"></div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create new Course" />
                    </div>
                </form>
            </div>
        );
    }
}

export default AdminPage;