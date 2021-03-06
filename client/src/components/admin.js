import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios';
import './css/admin.scss';

class AdminPage extends Component {
    render() {
        return (
            <BrowserRouter>
                <div id="admin-control">
                    <AdminLeftMenu/>
                    <Switch>
                        <Route exact path="/admin" component={AdminCourse} />
                        <Route exact path="/admin/category/:id" component={AdminEditExercise} />
                        <Route>
                            <h1 style={{paddingLeft:30}}>ERROR 404</h1>
                        </Route>
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
                    <Link to="/admin">Course Management</Link>
                </div>
                <div className="left-menu-item">
                    <Link to="/admin/user">User Management</Link>
                </div>
                <div className="left-menu-item">
                    <Link to="/admin/blog">Blog Management</Link>
                </div>
            </div>
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
                    <AdminAddCourseForm handleSubmit={this.handleAddCourse} 
                                        handleChange={this.handleChange} />
                </div>
                <div className="admin-button">
                    {(!this.state.isEdit)? 
                    <input className="create-new-course-button" onClick={this.handleEdit} type="submit" value="Add new" />
                    :<input className="close-new-course-button" onClick={this.handleEdit} type="submit" value="Close tab" />}
                </div>
                <div className="admin-list-course">
                    {this.state.data.map((values) => {
                        return (
                            <CourseItem key={values.id+"apre_56e"} //random key : apre_56e has nothing mean
                                        name={values.name}
                                        desc={values.desc}
                                        status={values.status}
                                        id={values.id}
                                        getAllCourse={this.getAllCourse} />
                        );
                    })}
                </div>
            </div>
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

class CourseItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: this.props.name,
            desc: this.props.desc,
            status: this.props.status,
            editCourse: false,
            showCategory: false
        }

        this.handleEditCourse = this.handleEditCourse.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSwap = this.handleSwap.bind(this);
        this.handleShowCategory = this.handleShowCategory.bind(this);
    }

    handleEditCourse(){
        this.handleSwap("editCourse");
    }

    handleShowCategory(){
        this.handleSwap("showCategory");
    }

    handleSwap(name){
        this.setState({
            [name]:this.state[name]?false:true
        });
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

    async handleUpdate(){
        if(localStorage.usertoken){
            await  axios.put('/admin/course/'+localStorage.usertoken+'/'+this.props.id+'/'+this.state.name+'/'+this.state.desc+'/'+this.state.status)
                            .then(() => {
                                this.props.getAllCourse();
                            }); 
            this.handleEditCourse();
        }
    }

    async handleDeleteCourse(){
        let msg = 'Are you sure? Delete "'+this.props.name+'" course\nCategory and Exercise under this course will be delete too!';
        let sureDelete = window.confirm(msg);
        if(sureDelete){
            if(localStorage.usertoken){
                await axios.delete('/admin/course/'+localStorage.usertoken+"/"+this.props.id)
                            .then(() => {
                                this.props.getAllCourse();
                            })
                            .catch((err)=> {
                                console.log('err:'+err);
                            });
            }
        }
    }

    render() {
        return (
            <table style={{width:"100%",borderCollapse:"collapse"}}>
                <colgroup>
                    <col span="1" style={{width:"25%"}} />
                    <col span="1" style={{width:"35%"}} />
                    <col span="1" style={{width:"15%"}} />
                    <col span="1" style={{width:"25%"}} />
                </colgroup>
                <tbody>
                    <tr className="course-list-item">
                        <td>
                            <span><strong>Name</strong> : {this.state.editCourse?<input className="edit-value" onChange={this.handleChange} type="text" name="name" value={this.state.name}/>:this.state.name}</span>
                        </td>
                        <td>
                            <span><strong>Description</strong> : {this.state.editCourse?<input className="edit-value" onChange={this.handleChange} type="text" name="desc" value={this.state.desc}/>:this.state.desc}</span>
                        </td>
                        <td>
                            {this.state.editCourse?<input onChange={this.handleChange} type="checkbox" name="status" checked={this.state.status}/>:
                                (this.state.status?<span style={{color:"green",fontWeight:"bold"}}>Open</span>
                                        :<span  style={{color:"red",fontWeight:"bold"}}>Closed</span>)}
                        </td>
                        <td style={{textAlign:"right",paddingRight:"20px"}}>
                            {this.state.editCourse?(<span><input onClick={this.handleUpdate} type="submit" value="Save" />
                            <input onClick={this.handleEditCourse} type="submit" value="Cancel" /></span>):<input onClick={this.handleEditCourse} type="submit" value="Edit" />}
                            <input onClick={this.handleDeleteCourse} type="submit" value="Delete" />
                            <input onClick={this.handleShowCategory} type="submit" value={!this.state.showCategory?"Show category":"Close category"} />
                        </td>
                    </tr>
                    {this.state.showCategory?
                        <tr className="course-list-category">
                            <td colSpan="5" style={{paddingLeft:30,backgroundColor:"white"}}>
                                <CategoryList id={this.props.id} />
                            </td>
                        </tr>
                        :""
                    }
                </tbody>
            </table>
        );
    }
}

class CategoryList extends Component {
    constructor(props){
        super(props);

        this.state = {
            data:[]
        }
    }

    async componentDidMount(){
        if(localStorage.usertoken){
            await axios.post('/admin/viewAllCategory/'+this.props.id, {usertoken:localStorage.usertoken})
                        .then(response => {
                            if(!array_equal(this.state.data,response.data)){
                                this.setState({
                                    data:response.data
                                });
                            }
                        });
        }
    }

    render(){
        return (
            <div className="category-list" key={"category-list-item-"+this.props.id}>
                <input className="create-new-category-button" type="submit" value="Add new" /><br/>
                {this.state.data.length!==0?
                    (this.state.data.map((data) => { return <CategoryItem items={data} /> }))
                :"Not have any category"}
            </div>
        );
    }
}

class CategoryItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            isEdit: false
        }

        this.handleSwap = this.handleSwap.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(){
        this.handleSwap("isEdit");
    }

    handleSwap(name){
        this.setState({
            [name]:this.state[name]?false:true
        });
    }

    render(){
        return (
            <div className="category-item" >
                <table style={{width:"100%"}}>
                    <colgroup>
                        <col span="1" style={{width:"25%"}} />
                        <col span="1" style={{width:"25%"}} />
                        <col span="1" style={{width:"20%"}} />
                        <col span="1" style={{width:"30%"}} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>
                                > <strong>{this.props.items.title}</strong>
                            </td>
                            <td>
                                {this.props.items.desc}
                            </td>
                            <td style={{textAlign:"center"}}>
                                {this.props.status?<span style={{color:"green",fontWeight:"bold"}}>Open</span>
                                        :<span style={{color:"red",fontWeight:"bold"}}>Closed</span>}
                            </td>
                            <td style={{textAlign:"center"}}>
                                <input onClick={this.handleEdit} type="submit" value="Edit" />
                                <input type="submit" value="Delete" />
                                <a href={"/admin/category/"+this.props.items.id}>
                                    <input type="submit" value="View Exercise" />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

class AdminEditExercise extends Component {
    constructor(props){
        super(props);

        this.state = {
            data:[]
        }

        this.getExercise = this.getExercise.bind(this);
    }

    componentDidMount(){
        this.getExercise();
    }

    async getExercise(){
        if(localStorage.usertoken){
            await axios.post('/admin/getExerciseFromCategory/'+this.props.match.params.id, {usertoken:localStorage.usertoken})
                        .then(response => {
                            if(!array_equal(this.state.data,response.data)){
                                this.setState({
                                    data:response.data
                                });
                                console.log(this.state.data);
                                
                                //console.log(convert_string_to_array_json(this.state.data[0].test_case));
                            }
                        });
        }
    }

    render(){
        return(
            <div className="admin-exercise">
                {this.state.data.map(data => (
                    <AdminExerciseItem key={"f4ew4_eofjwe_dwfdc_"+data.id} data={data} />
                ))}
            </div>
        );
    }
}

class AdminExerciseItem extends Component {
    constructor(props){
        super(props);

        this.state={
            isOpen:false
        }
    }

    render() {
        return(
            <div className="admin-exercise-item">
                <div className="admin-exercise-item-head">
                    {this.props.data.title}
                </div>
                <div className="admin-exercise-item-body">
                    {this.props.data.desc}
                </div>
            </div>
        );
    }
}

export default AdminPage;

function array_equal(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
}

/*
function convert_string_to_array_json(str){
    return str.replace(new RegExp("[", "gi"), "")
              .replace(new RegExp("]", "gi"), "")
              .replace('},{', '}|{')
              .split('|');
}*/