import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import auth from "./services/authService";
import Notes from "./components/notes";
import NavBar from "./components/navBar";
import NoteForm from "./components/noteForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ProtectedRout from "./components/common/protectedRout";
import ConditionalRout from "./components/common/conditionalRout";

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
          <Route path="/notes/:id" component={NoteForm} />
          <ConditionalRout on={user} path="/notes" component={Notes} />
          <ConditionalRout on={!user} path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <ConditionalRout
            on={!user}
            path="/register"
            component={RegisterForm}
          />
          {/* <Redirect from="/" to="/notes" />  */}
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;

// TO DO:
// - remove delete button when creating new note
// - compare error handling with movie forms
// -conditionla rendering redirect wherer you came from
