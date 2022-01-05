import React from 'react';



const DropDownButton = ({values, selectedItem, onItemSelect, lable, lableStyle}) => {

    const isActive = id => selectedItem.id === id ? "link-primary" : "";

    return ( 
        <div className="dropdown">
            <button className={`btn btn-${lableStyle} dropdown-toggle`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {lable}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {values.map(item => (
                    <li key={item.id} onClick={()=> onItemSelect(item.id)} className={`dropdown-item ${isActive(item.id)}`} style={{cursor: "pointer"}} >
                            {item.lable}
                    </li> 
                ))}
            </ul>
        </div>
     );
}
 
export default DropDownButton;