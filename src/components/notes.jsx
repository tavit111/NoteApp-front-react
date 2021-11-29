import React from 'react';
import ListNotes from './listNotes';
import Button from './common/button';
import ToggleButton from './common/toggleButon';


class Notes extends React.Component {

    state = {
        activeDeleting: false,
    }

    startDeleting = ()=>{
        this.setState({activeDeleting: true})
    }
    
    stopDeleting = ()=>{
        this.setState({activeDeleting: false})
    }

    render() { 
        return <div className="container">
            <div className="row">
                <div className="col-sm">
                    <div className="button mb-2">
                        <Button lable="Add Note" onClick={()=> this.props.history.push("/notes/new")} />
                        <ToggleButton lables={["Start Deleting", "Stop Deleting"]} onClicks={[this.startDeleting, this.stopDeleting]} color="danger" />
                    </div>
                    <ListNotes activeDeleting={this.state.activeDeleting} />
                </div>
            </div>
        </div>;
    }
}
 
export default Notes;