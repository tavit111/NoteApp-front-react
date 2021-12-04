import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import ListGroutps from './common/listGroup';
import {FaTrashAlt} from 'react-icons/fa';


// THINKING ABOUT: makien lsitGroup an base class which will extend this class
class ListNotes extends React.Component {
    
    renderDate = timestamp => {
        return moment(timestamp).fromNow();
    }

    renderCard = (note) =>{
        const {_id, title, body, date} = note;
        const {activeDeleting} = this.props;
        let linkClass = "list-group-item list-group-item-action";
        
        let onDelete = null;
        let renderTrashButton = null;

        if(activeDeleting){
            onDelete = this.props.onDelete;
            linkClass +=  " link-danger";
            renderTrashButton = <div className="m-3 ms-1 me-4"><FaTrashAlt size="1.2em" /></div>
        }

        return (
        <Link to={`/notes/${_id}`} className={linkClass} key={_id} aria-current="true" onClick={(e)=> onDelete(e, note)} >
            <div className="d-flex align-items-center">
                {renderTrashButton}
                <div className="d-flex flex-column flex-grow-1">
                    <h5>{title}</h5>
                    <small>{body}</small>
                </div>
                    <small className="align-self-start">{this.renderDate(date)}</small>
            </div>
      </Link>);
    }

    render() { 
        const {notes} = this.props;

        return <ListGroutps items={notes} renderCard={this.renderCard} />;
    }
}
 
export default ListNotes;