import { render } from '@testing-library/react';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../../services/authService'


const ConditionalRout = ({path, on: condition, component: Component, rendre, ...rest}) => {
    const user = auth.getCurrentUser();


    return <Route
    {...rest}
    path={path}
    render={ props => {
        if(condition) return Component ? <Component {...props} /> : render(props);  
        return <Redirect to="/" />;
    }}
  />
}
 
export default ConditionalRout;