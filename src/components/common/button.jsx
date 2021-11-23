import React from 'react';

const Button = ({onClick, lable}) => {
    return <button type="submit" className="btn btn-primary mt-3" onClick={onClick} >{lable}</button>;
}
 
export default Button;