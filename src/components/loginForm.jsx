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
        try {
            const {email, password} = this.state.data;
            await auth.login(email, password);
    
            window.location = '/notes';
        } catch (ex) {
            if(ex.response && ex.response.status == 400){
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
            }
        }
    };

    render() { 
        return (
            <form className="p-3">
                <h1 className="mb-3">Login</h1>
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Password", 'password')}
                {this.renderButton("Login")}
            </form>)
    }
}
 
export default LoginForm;