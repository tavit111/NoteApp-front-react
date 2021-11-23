import React from 'react';
import {Link, NavLink} from 'react-router-dom';


const NavBar = ({user}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NoteApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-link" aria-current="page" to="/notes">Notes</NavLink>
                    {!user && <NavLink className="nav-link" to="/login">Login</NavLink>}
                    {user && <NavLink className="nav-link" to="/logout">Logout</NavLink>}
                    {!user && <NavLink className="nav-link" to="/register">Register</NavLink>}
                    {user && <p className="nav-link">{user.name}</p>}
                </div>
                </div>
            </div>
        </nav>
    );

}
 
export default NavBar;