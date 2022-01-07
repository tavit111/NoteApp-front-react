import React from 'react';
import CreateCategoryModal from "./createCategoryModal";
import Button from './common/button';


class CategoriesNavBar extends React.Component{

    state = {
        deleting: {
            active: false,
            lable: "start deleting"
        }
    }
    
    toggleDeleting = () =>{
        const deleting = {...this.state.deleting};

        if(deleting.active){
            deleting.active = false;
            deleting.lable = "start deleting";
        }else{
            deleting.active = true;
            deleting.lable = "stop deleting";
        }
        this.setState({deleting});
    }


    renderCategory = (category) =>{
        const { onCategorieChange, onCategoryDelete, selected} = this.props;
        const {deleting} = this.state;

        let onClick = () => onCategorieChange(category);
        let color = selected && selected._id === category._id ? "primary" : "secondary";

        if(deleting.active){
            onClick = ()=> onCategoryDelete(category);
            color = "danger";
        }

        return (
            <a
                className={`nav-link text-${color}`}
                key={category._id}
                onClick={onClick}
                style={{cursor: "pointer"}}>
                        {category.name}
                        {" "}
                        {<span className={`badge rounded-pill bg-${color}`}>{category.count}</span>}
            </a>
        );
    }
    
    render(){
        const {categories, onCategoryAdd, onCategorieChange, selected} = this.props;
        const {deleting} = this.state;

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand navbar-light bg-light py-1">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div className="navbar-nav">
                                <a
                                    className={!selected ? 'nav-link text-primary' : 'nav-link'}
                                    onClick={()=> onCategorieChange(null)}
                                    style={{cursor: "pointer"}}>
                                        {"All"}
                                </a>
                                {categories.map(category => this.renderCategory(category))}
                            </div>
                            <div className="navbar-nav ms-auto">
                                <CreateCategoryModal onCategoryAdd={onCategoryAdd} />
                                <Button lable={deleting.lable} color="light" onClick={this.toggleDeleting} />
                            </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

 
export default CategoriesNavBar;