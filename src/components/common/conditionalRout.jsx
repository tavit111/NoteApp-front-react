import { render } from '@testing-library/react';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../../services/authService'


const ConditionalRout = ({path, on: condition, redirect, component: Component, rendre, ...rest}) => {

    return <Route
    {...rest}
    render = { props => {
        if(condition) return Component ? <Component {...props} /> : render(props);  
        return <Redirect to={redirect} />;
    }}
  />
}
 
export default ConditionalRout;