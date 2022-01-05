import React from 'react';
import _ from "lodash";
import noteServices from '../services/noteServices';
import categoriesService from '../services/categoriesService';
import pagination from '../utils/pagination'
import ListNotes from './listNotes';
import SearchBar from "./searchBar";
import Button from './common/button';
import SortDropDown from './common/sortDropDown';
import Pagination from './common/pagination';
import {GoPlus} from 'react-icons/go';
import CategoriesNavBar from './categoriesNavBar';
import { FaThinkPeaks } from 'react-icons/fa';



class Notes extends React.Component {

    state = {
        notes: [],
        categories: [],
        selectedCategory: null,
        deleting: {
            active: false,
            lable: "Start Deleting"
        },
        currentSortMethod: {id: "1", path: "date", order: "desc", lable: "Newest First"},
        searchPhrase: "",
        pageSize: 5,
        currentPage: 1,
    };

    sortingMethods = [
        {id: "1", path: "date", order: "desc", lable: "Newest First"},
        {id: "2", path: "date", order: "asc", lable: "Oldest First"},
        {id: "3", path: "title", order: "asc", lable: "Title A-Z"},
        {id: "4", path: "title", order: "desc", lable: "Title Z-A"},
    ];

    componentDidMount() {
        this.populateNotes();
        this.populateCategories();
    }

    populateNotes = async ()=>{
        const {data: notes} = await noteServices.getNotes();

        this.setState({notes});
    }
    populateCategories = async ()=>{
        const {data: categories} = await categoriesService.getCategories();
        
        this.setState({categories});
    }

    toggleDeleting = ()=>{
        const deleting = {...this.state.deleting};

        if(deleting.active) 
            deleting.lable = "Start Deleting";
        else
            deleting.lable = "Stop Deleting";
        
        deleting.active = !deleting.active;

        this.setState({deleting});
    }

    handleDelete = async (e, note) =>{
        e.preventDefault();
        e.stopPropagation();

        const {pageSize, currentPage} = this.state;
        
        const allNotes = [...this.state.notes];
        const notes = allNotes.filter(n=> n._id !== note._id);

        const currentPageCount = pagination.paginate(notes, currentPage, pageSize).length;
        const pageRewind = currentPageCount<1 ? currentPage-1 : currentPage;

        const categories = [...this.state.categories];
        const index = categories.findIndex(category => category._id === note.category._id);
        categories[index].count--;

        this.setState({notes, categories, currentPage: pageRewind});

        try{
            await noteServices.deleteNote(note._id);
        }catch(er){
            if(er.response && er.response.status === 404)
                console.log("item was arleady deleted");

            this.setState({notes: allNotes, currentPage});
        }
    }

    handleSort = currentSortMethod =>{
        this.setState({currentSortMethod})
    }

    handleSearch = (value) =>{
        this.setState({searchPhrase: value, currentPage: 1});
    }

    handlePageChange = (page)=>{
        this.setState({currentPage: page});
    }

    handleCategorieChange = (category)=>{
        this.setState({selectedCategory: category, currentPage: 1});
    }

    handleCategoryAdd = category =>{
        const categories = [...this.state.categories];
        categories.unshift(category);
        this.setState({categories});
    }

    sortNotes = notes =>{
        const {currentSortMethod: sort} = this.state;

        return _.orderBy(notes, [sort.path], [sort.order]);
    }

    filterBySearch = notes =>{
        const {searchPhrase} = this.state;

        return notes.filter(note=> note.title.toLowerCase().startsWith(searchPhrase.toLowerCase()));
    }
    
    filterByCategory = notes =>{
        const {selectedCategory} = this.state;
        if(!selectedCategory) return notes;

        return notes.filter(note => note.category && note.category._id === selectedCategory._id);
    }

    render() { 
        const {selectedCategory, categories, currentSortMethod, deleting, notes, searchPhrase, pageSize, currentPage} = this.state;

        const filteredNotes = this.filterByCategory(notes);
        const searchedNotes = this.filterBySearch(filteredNotes);
        const sortedNotes = this.sortNotes(searchedNotes);
        const paginatedNotes = pagination.paginate(sortedNotes, currentPage, pageSize);

        return( 
            <React.Fragment>
                <CategoriesNavBar selected={selectedCategory} categories={categories} onCategorieChange={this.handleCategorieChange} onCategoryAdd={this.handleCategoryAdd} />
                <div className="container">
                        <div className="d-flex align-items-end mb-1 mt-5">
                            <Button lable={<div><GoPlus /> Add Note</div>} onClick={()=> this.props.history.push("/notes/new")} color="outline-primary" />
                            <Button lable={deleting.lable} color="outline-danger" onClick={this.toggleDeleting} />
                            <div className="ms-auto">
                                <SortDropDown sortingMethods={this.sortingMethods} onSort={this.handleSort} currentSortMethod={currentSortMethod} />
                            </div>
                        </div>
                        <div className="mb-2">
                            <SearchBar onChange={this.handleSearch} searchPhrase={searchPhrase}/>
                        </div>
                        <ListNotes notes={paginatedNotes} activeDeleting={deleting.active} onDelete={this.handleDelete} />
                        <div className="mt-3">
                            <Pagination pageSize={pageSize} currentPage={currentPage} itemsCount={sortedNotes.length} onPageChange={this.handlePageChange} />
                        </div>
                </div>
            </React.Fragment>
        )
    }
}
 
export default Notes;