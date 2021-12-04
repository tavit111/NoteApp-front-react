import React from 'react';
import {ImSearch} from 'react-icons/im';


const SearchBar = ({onChange, searchPhrase}) => {
    return (
        <div className="input-group flex-nowrap">
            <span className="input-group-text"><ImSearch  /></span>
            <input 
                className="form-control"
                value={searchPhrase}
                type="text"
                style={{paddingLeft: "5px"}}
                placeholder="search..."
                onChange={(e)=> onChange(e.currentTarget.value)} />
        </div>
)}
 
export default SearchBar;
