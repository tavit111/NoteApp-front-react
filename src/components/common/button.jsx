import React from 'react';

const Button = ({onClick=null, lable, color="primary", type="submit"}) => {
    return <button type={type} className={`btn btn-${color} mt-3 me-2`} onClick={onClick} >{lable}</button>;
}

export default Button;