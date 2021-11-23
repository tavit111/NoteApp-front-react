import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import ListGroutps from './common/listGroup';
import {getNotes} from '../services/noteServices';


// THINKING ABOUT: makien lsitGroup an base class which will extend this class
class ListNotes extends React.Component {

    state = {
        notes: []
    }

    componentDidMount() {
        this.populateNotes();
    }

    populateNotes = async ()=>{
        const {data: notes} = await getNotes();
        this.setState({notes});
    }

    renderDate = timestamp => {
        return moment(timestamp).startOf('day').fromNow();
    }

    renderCard = (note) =>{
        const {_id, title, body, date} = note;
        return (
        <Link to={`/notes/${_id}`} className="list-group-item list-group-item-action" key={_id} aria-current="true">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{title}</h5>
                <small>{this.renderDate(date)}</small>
            </div>
            <small>{body}</small>
      </Link>);
    }


    render() { 
        return <ListGroutps items={this.state.notes} renderCard={this.renderCard} />;
    }
}
 
export default ListNotes;