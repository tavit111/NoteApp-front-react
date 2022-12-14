import React from 'react';
import Joi from 'joi';
import Form from './common/form';
import auth from "../services/authService.js";

class LoginForm extends Form {
    state = {
        data: {
            email: "",
            password: "",
        },
        errors: {},
    };
    
    schema = Joi.object({
        email: Joi.string().email({tlds: { allow: false }}).required().label("Email"),
        password: Joi.string().min(5).max(50).required().label("Password"),
    })

    doSubmit = async ()=>{
        const {state} = this.props.location;

        try {
            const {email, password} = this.state.data;
            await auth.login(email, password);
            
            window.location = state ? state.redirect : '/';
        } catch (ex) {
            if(ex.response && ex.response.status == 400){
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
            }
        }
    };

    render() { 
        if(auth.getCurrentUser())
            this.props.history.replace('/');

        return (
            <div className="container">
                <form className="mb-3 mt-5" onSubmit={this.handleSubmit}>
                    <h1 className="mb-3">Login</h1>
                    {this.renderInput("email", "Email")}
                    {this.renderInput("password", "Password", 'password')}
                    <div className="m-3"></div>
                    {this.renderButton("Login")}
                </form>
            </div>
            )
    }
}
 
export default LoginForm;