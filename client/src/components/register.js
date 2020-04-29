import React from 'react';
import { register } from './js/userFunctions';

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          errors: {}
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.email!=="" || this.state.first_name!=="" || this.state.last_name!=="" || this.state.password!==""){
            const newUser = {
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                password: this.state.password
            };

            register(newUser).then(res => {
                console.log(res);
            });
        }
    }
    render(){
        return (
            <div className="welcome">
                <form onSubmit={this.onSubmit}>
                    <div className="email">
                        Email:
                        <input onChange={this.onChange} name="email" id="email" type="email" placeholder="Enter mail@domain.com" required/>
                    </div>
                    <div className="fname">
                        First_name:
                        <input onChange={this.onChange} name="first_name" id="first_name" type="text" placeholder="Enter First name" required/>
                    </div>
                    <div className="lname">
                        Last_name:
                        <input onChange={this.onChange} name="last_name" id="last_name" type="text" placeholder="Enter Last name" required/>
                    </div>
                    <div className="password">
                        Password:
                        <input onChange={this.onChange} name="password" id="password" type="password" placeholder="Enter Password" required/>
                    </div>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        );
    }
}