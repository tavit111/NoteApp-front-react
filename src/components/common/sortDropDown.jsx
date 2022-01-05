import React from 'react';
import {CgArrowsExchangeAltV} from "react-icons/cg";
import DropDownButton from './dropDownButton';


const SortDropDown = ({onSort, currentSortMethod, ...props}) => {

    const raiseSort = id =>{
        const sortingMethods = [...props.sortingMethods];
        const newSort = sortingMethods.find(sort => sort.id === id);

        onSort(newSort);
    }
    const sortLable = <span><CgArrowsExchangeAltV size={"1.3em"} />Sort by</span>;

    return <DropDownButton 
                values={props.sortingMethods}
                onItemSelect={raiseSort}  
                lable={sortLable} 
                lableStyle="outline-secondary" 
                selectedItem={currentSortMethod}
            />

}
 
export default SortDropDown;