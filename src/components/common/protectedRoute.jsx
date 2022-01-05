import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../../services/authService'

const ProtectedRoute = ({component: Component, render, ...rest}) => {
    const user = auth.getCurrentUser();


    return <Route
    {...rest}
    render={ props => {
        if (!user) return <Redirect 
          to={{ 
            pathname: "/login",
            state: { redirect: props.location.pathname },
          }} 
        />;
        return Component ? <Component {...props} /> : render(props);
    }}
  />
}
 
export default ProtectedRoute;