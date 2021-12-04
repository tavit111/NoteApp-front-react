import React from 'react';


const Input = ({name, lable, type="input", data, onChange=null, errors, ...props}) => {
    return(
        <div>
            <label htmlFor={name} className="form-label">{lable}</label>
            <input type={type} name={name} value={data[name]} onChange={onChange} className="form-control" id={name} placeholder={`${lable}...`} {...props}/>
            {errors[name] && <div className="alert alert-danger" role="alert">{errors[name]}</div>}
        </div>
)}
 
export default Input;