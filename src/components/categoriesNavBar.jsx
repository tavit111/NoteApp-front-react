import React from 'react';
import CreateCategoryModal from "./createCategoryModal";


const CategoriesNavBar = ({categories, onCategorieChange, selected, onCategoryAdd}) => {

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
                            {categories.map(category => (
                                <a
                                    className={selected && selected._id === category._id ? 'nav-link text-primary' : 'nav-link'}
                                    key={category._id}
                                    onClick={()=> onCategorieChange(category)}
                                    style={{cursor: "pointer"}}>
                                        {category.name}
                                        {" "}
                                        {<span className={`badge rounded-pill bg-${selected && selected._id === category._id ? 'primary': 'secondary'}`}>{category.count}</span>}
                                </a>
                            ))}
                        </div>
                        <div className="navbar-nav ms-auto">
                            <CreateCategoryModal onCategoryAdd={onCategoryAdd} />
                            <a className="nav-link">...</a>
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}
 
export default CategoriesNavBar;