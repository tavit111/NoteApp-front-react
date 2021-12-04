import React from 'react';
import Form from './common/form';
import Joi from 'joi';
import noteService from "../services/noteServices";


class NoteForm extends Form {
    state = {
        data: {
            title: "",
            body: "",
        },
        errors: {},
    }
    
    componentDidMount() {
        this.populateNote();
    }

    schema = Joi.object({
        title: Joi.string().min(1).max(100).required().label("Title"),
        body: Joi.string().allow('').max(999).label("Note"),
    })

    populateNote = async()=>{
        if(this.props.match.params.id === "new")
            return;

        try{
            const {id} = this.props.match.params;
            const {data: note} = await noteService.getNote(id);
            const data = this.mapToViewModel(note);
            this.setState({data});
        }catch(er){
            if(er.response && er.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    mapToViewModel = (data)=>{
        return {
            title: data.title,
            body: data.body,
        }
    }

    doSubmit = async ()=>{
        const {title, body} = this.state.data;
        const {id} = this.props.match.params;
        try {
            if(id === "new")
                await noteService.createNote(title, body);
            else
                await noteService.updateNote(id, title, body);
            
            this.props.history.push('/notes');
        } catch (ex) {
            
        }
    }

    handleDelete = async ()=>{
        const {id} = this.props.match.params;

        try {
            await noteService.deleteNote(id);
            this.props.history.push("/notes");
        } catch (ex) {
            
        }
    }

    render() {
        const {id} = this.props.match.params;

        return (
            <form onSubmit={this.handleSubmit} className="p-3">
                {this.renderInput("title", "Title")}
                {this.renderTextArea("body", "Write a note", 999)}
                <div className="d-flex">
                    {this.renderButton("Save")}
                    {id !== "new" && this.renderButton("Delete", "button", 'danger', this.handleDelete)}
                </div>
            </form>
        )
    }

}
 
export default NoteForm;