import React from 'react';


class Form extends React.Component {

    state = {
        data: {},
        errors: {},
    }

    //VALIDATION PORTION
    validate = (data) =>{
        const option = {abortEarly: false};
        const {error} = this.schema.validate(this.state.data, option);

        if(!error) return null;
        
        const errors = {};
        for(let detail of error.details)
            errors[detail.path[0]] = detail.message;
        
        return errors;
    }

    validateProperty = ({name, value})=>{
        const {error} = this.schema.extract(name).validate(value);
        
        return error ? error.details[0].message : null;
    }

    //HANDDING PORTION 

    handleChange = ({currentTarget: input})=>{
        const data = {...this.state.data};
        data[input.name] = input.value;

        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        this.setState({data, errors});

    }
    
    handleSubmit = (e) =>{
        e.preventDefault();

        const errors = this.validate(this.state.data);
        this.setState({errors: errors || {}});
        if(errors) return;

        this.doSubmit();
    }

    // RENDERING PORTION

    renderInput = (name, lable, type="input")=>{
        const {data, errors} = this.state;

        return (
        <div className="mt-3 mb-3" >
            <label htmlFor={name} className="form-label">{lable}</label>
            <input type={type} name={name} value={data[name]} onChange={this.handleChange} className="form-control" id={name} placeholder={`${lable}...`} />
            {errors[name] && <div className="alert alert-danger" role="alert">{errors[name]}</div>}
        </div>
        );
    }

    renderTextArea = (name, lable, maxCharacters=false)=>{
        const {data, errors} = this.state;
        console.log(data);

        return (
            <div className="mb-3">
                <label htmlFor={name} className="form-label">{lable}</label>
                <textarea name={name} value={data[name]} onChange={this.handleChange} className="form-control" id={name} rows="3" maxLength={maxCharacters} placeholder={`${lable}...`}></textarea>
                {maxCharacters && <small className="fw-light">{`${data[name].length}/${maxCharacters}`}</small>}
                {errors[name] && <div className="alert alert-danger" role="alert">{errors[name]}</div>}
            </div>
        )
    }


    renderButton = (lable)=>{
        return  <button type="submit" className="btn btn-primary mt-3" onClick={this.handleSubmit} >{lable}</button>
    }
}
 
export default Form;