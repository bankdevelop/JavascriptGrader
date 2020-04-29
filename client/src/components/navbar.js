import React from 'react';
import './css/style.css';

export default class Navbar extends React.Component {
    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
    }

    render(){
        const unAuthenticate = (
            <div className="navbar">
                <a href="/">Home</a>
                <a href="/Login">Login</a>
                <a href="/Register">Register</a>
            </div>
        );
        const Authenticate = (
            <div className="navbar">
                <a href="/">Home</a>
                <a href="/profile">Profile</a>
                <a href="" onClick={this.logOut.bind(this)}>Logout</a>
            </div>
        );
        return (
            <div id="top">
                {localStorage.usertoken ? Authenticate : unAuthenticate}
            </div>
        );
    }
}