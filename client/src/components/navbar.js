import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './css/style.css';

export default class Navbar extends React.Component {
    constructor(){
        super();
        this.state = {
            isLogout:0
        }
    }

    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.setState({
            isLogout:1
        });
    }

    render(){
        const unAuthenticate = (
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
            </div>
        );
        const Authenticate = (
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="" onClick={this.logOut.bind(this)}>Logout</Link>
            </div>
        );
        return (
            <div id="top">
                {localStorage.usertoken ? Authenticate : unAuthenticate}
                {localStorage.usertoken ? "" : <Redirect to="/login" />}
            </div>
        );
    }
}