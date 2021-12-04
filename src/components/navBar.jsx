import React from 'react';
import {Link, NavLink} from 'react-router-dom';


const NavBar = ({user}) => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NoteApp</Link>
                    <div className="collaps navbar-collapse">
                        <div className="navbar-nav me-auto">
                            <NavLink className="nav-link" aria-current="page" to="/notes">Notes</NavLink>
                        </div>
                        <div className="navbar-nav">
                            {user && <NavLink className="nav-link" to="/logout">Logout</NavLink>}
                            {!user && <NavLink className="nav-link" to="/login">Login</NavLink>}
                            {!user && <NavLink className="nav-link" to="/register">Register</NavLink>}
                            {user && <span className="nav-link">{user.name}</span>}
                        </div>
                    </div>
            </div>
        </nav>
    );

}
 
export default NavBar;