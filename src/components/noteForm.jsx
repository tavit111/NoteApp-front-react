import React from 'react';
import Form from './common/form';
import Joi from 'joi';
import {getNote} from "../services/noteServices";


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
        const {id} = this.props.match.params;
        const {data: note} = await getNote(id);
        const data = this.mapToViewModel(note);
        this.setState({data});
    }

    mapToViewModel = (data)=>{
        return {
            title: data.title,
            body: data.body,
        }
    }

    doSubmit = ()=>{
        this.props.history.push("/notes");
        console.log("do submit");
    }

    render() {
        return (
        <form className="p-3">
            {this.renderInput("title", "Title")}
            {this.renderTextArea("body", "Note", 999)}
            {this.renderButton("Save")}
        </form>   
        )
    }

}
 
export default NoteForm;