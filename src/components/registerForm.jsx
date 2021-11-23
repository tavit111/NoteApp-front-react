import React from 'react';
import Form from './common/form';
import Joi from 'joi';
import userService from "../services/userService";
import auth from "../services/authService";


class RegisterForm extends Form {
    state = {
        data: {
            name: "",
            email: "",
            password: "",
        },
        errors: {},
    }
    
    schema = Joi.object({
        name: Joi.string().min(3).max(50).required().label("Name"),
        email: Joi.string().email({tlds: { allow: false }}).required().label("Email"),
        password: Joi.string().min(5).max(50).required().label("Password"),
    })

    doSubmit = async ()=>{
        try{
            const {name, email, password } = this.state.data;
            const res = await userService.register(name, email, password);
            auth.logWithJwt(res.headers['x-auth-token']);
            
            window.location = '/notes';
        }catch(ex){
            if(ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
            }
        }
    }

    render() { 
        return <form className="m-3" onSubmit={this.handleSubmit} >
            <h1>Register</h1>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Register")}
        </form>
    }
}
 
export default RegisterForm;