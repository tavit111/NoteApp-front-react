import React from 'react';
import ListNotes from './listNotes';
import Button from './common/button';


class Notes extends React.Component {

    render() { 
        return <div className="container">
            <div className="row">
                <div className="col-sm">
                    <div className="button mb-2">
                        <Button lable="Add Note" onClick={()=> this.props.history.push("/notes/new")} />
                    </div>
                    <ListNotes />
                </div>
            </div>
        </div>;
    }
}
 
export default Notes;