import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from './js/userFunctions';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          errors: {}
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        if(this.state.email!=="" || this.state.password!==""){
            const user = {
                email: this.state.email,
                password: this.state.password
            }

            login(user).then(res => {
                this.setState({
                    email:""
                })
            })
        }
    }

    render(){
        return (
            <div className="welcome">
                {localStorage.usertoken ? <Redirect to="/profile" /> : ""}
                <form onSubmit={this.onSubmit}>
                    <div className="email">
                        Email:
                        <input onChange={this.onChange} name="email" id="email" type="email" placeholder="Enter mail@domain.com" required/>
                    </div>
                    <div className="password">
                        Password:
                        <input onChange={this.onChange} name="password" id="password" type="password" placeholder="Enter password" required/>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}