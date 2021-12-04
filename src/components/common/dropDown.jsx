import React from 'react';


const DropDown = ({values, selectedValue, onSelect=null}) => {
    
    return (
        <div className="w-20">
            <select className="form-select" aria-label="Default select example" value={selectedValue.id} onChange={onSelect}>
                {values.map(value => <option value={value.id} id={value.id}>{value.lable}</option>)}
            </select>
        </div>
    );
}
 
export default DropDown;