import React from 'react';


const ListGroup = ({items, renderCard}) => {
    return ( 
        <div className="list-group">
            {items.map(content => renderCard(content))}
        </div>
        );
}
 
export default ListGroup;