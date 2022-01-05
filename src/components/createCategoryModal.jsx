import React from 'react';
import Form from './common/form';
import Joi from "joi";
import Modal from 'react-bootstrap/Modal';
import Button from './common/button';
import {GoPlus} from 'react-icons/go';
import categories from "../services/categoriesService";


class CreateCategoryModal extends Form {
    state={
        data: {
            category: "",
        },
        errors: {},
        show: false,
    }

    schema = Joi.object({
        category: Joi.string().min(1).max(16).label("Category"),
    })
    
    doSubmit = async ()=>{
        const {category} = this.state.data;
        const {onCategoryAdd} = this.props;
        
        try{
            const res = await categories.createCategory(category);
            this.handleClose();
            onCategoryAdd(res.data);
        }catch(er){
            if(er.response && er.response.status === 400){
                const errors = {...this.state.errors};
                errors.category = er.response.data;
                this.setState({errors});
            }
            else this.setState({show: false});
        }
    }

    handleClose =  ()=>{
        const data = {category: ""};

        this.setState({data, errors: {}, show: false});
    }
    handleShow = ()=>{
        this.setState({show: true})
    }

    render() { 
        const {errors} = this.state;

        return (
            <>
                <Button color="light" onClick={this.handleShow} lable={<div><GoPlus /> Filter</div>}/>
                
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Categry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.renderInput('category', 'Add category')}
                    </Modal.Body>
                    <Modal.Footer>
                        {this.renderButton("Close", "button", "secondary", this.handleClose)}
                        {this.renderButton("Add", "button", "primary", this.handleSubmit)}
                    </Modal.Footer>
                </Modal >
            </>
        )
    }
}
 

export default CreateCategoryModal;

// https://react-bootstrap.github.io/components/modal/