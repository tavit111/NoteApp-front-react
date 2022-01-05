import React from 'react';

const Button = ({lable, color="primary", ...props}) => {
    return <button className={`btn btn-${color} me-2`} {...props} >{lable}</button>;
}

export default Button;