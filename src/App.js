import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import auth from "./services/authService";
import Notes from "./components/notes";
import NavBar from "./components/navBar";
import NoteForm from "./components/noteForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import NotFound from "./components/notFound";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <NavBar user={user} />

        <Switch>
          <ProtectedRoute path="/notes/:id" component={NoteForm} />
          <ProtectedRoute path="/notes" component={Notes} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/notes" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;

// TO DO:
// solve full page load when click on note
// implement categoris:
// - check in mosh how he did "emmit function"
// - responsive category bar with menu
// compare implementation of categoris with mosh: services, handleCategoryChange, filterCategory, populateCategory, "all categry in state", render category menu, choose category in forms
// -add toast
// - in ListNotes marge card() into ListGroups and make it unreusable component
