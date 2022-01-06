import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {FaTrashAlt} from 'react-icons/fa';


class ListNotes extends React.Component {
    
    renderDate = timestamp => {
        return moment(timestamp).fromNow();
    }

    renderCard = (note) =>{
        const {_id, title, date, category} = note;
        const {activeDeleting} = this.props;
        let linkClass = "list-group-item list-group-item-action";
        
        let onDelete = () =>{};
        let renderTrashButton = null;

        if(activeDeleting){
            onDelete = this.props.onDelete;
            linkClass +=  " link-danger";
            renderTrashButton = <div className="m-3 ms-1 me-4"><FaTrashAlt size="1.2em" /></div>
        }

        return (
            // fix this
            <Link to={`/notes/${_id}`} className={linkClass} key={_id} onClick={(e)=> onDelete(e, note)}>
                <div className="d-flex align-items-center">
                    {renderTrashButton}
                <div className="d-flex flex-column flex-grow-1">
                        <h5>{title}</h5>
                        {category && <h6>{category.name}</h6>}
                    </div>
                        <small className="align-self-start">{this.renderDate(date)}</small>
                </div>
            </Link>
      );
    }

    render() { 
        const {notes} = this.props;

        return (
                <div className="list-group">
                    {notes.map(note => this.renderCard(note))}
                </div>
        );
    }
}
 
export default ListNotes;