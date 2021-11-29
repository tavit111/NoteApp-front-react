import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import ListGroutps from './common/listGroup';
import noteService from '../services/noteServices';
import noteServices from '../services/noteServices';


// THINKING ABOUT: makien lsitGroup an base class which will extend this class
class ListNotes extends React.Component {

    state = {
        notes: []
    }

    componentDidMount() {
        this.populateNotes();
    }

    populateNotes = async ()=>{
        const {data: notes} = await noteService.getNotes();
        this.setState({notes});
    }

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
            onDelete = (e)=> this.handleDeleteElement(e, note);
            linkClass +=  " link-danger";
            renderTrashButton = <i className="fas fa-trash-alt fa-lg m-3 ms-1 me-4"></i>;
        }

        return (
        <Link to={`/notes/${_id}`} className={linkClass} key={_id} aria-current="true" onClick={onDelete} >
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

    
    handleDeleteElement = async (e, note) =>{
        e.preventDefault();
        e.stopPropagation();
        
        
        try{
            const notes = [...this.state.notes];
            const index = notes.indexOf(note);
            notes.splice(index, 1);
            this.setState({notes});
            await noteServices.deleteNote(note._id);
        }catch(er){
            
        }
    }


    render() { 
        return <ListGroutps items={this.state.notes} renderCard={this.renderCard} />;
    }
}
 
export default ListNotes;