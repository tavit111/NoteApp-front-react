import { render } from '@testing-library/react';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../../services/authService'


const ProtectedRout = ({path, component: Component, rendre, ...rest}) => {
    const user = auth.getCurrentUser();


    return <Route
    {...rest}
    path={path}
    render={ props => {
        if (!user) return <Redirect to="/" />;
        return Component ? <Component {...props} /> : render(props);
    }}
  />
}
 
export default ProtectedRout;