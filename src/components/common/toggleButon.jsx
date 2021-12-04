import React from 'react';
import {toggleArray} from "../../utils/toggle";


class ToggleButton extends React.Component {
    state = {
        lables: [],
        currentLable: "",
        onClickfunctions: [],
        currentOnClick: null,
    }

    componentDidMount() {
        const {lables, onClicks: onClickfunctions} = this.props;

        const currentLable = lables[0];
        const currentOnClick = onClickfunctions[0];
        
        this.setState({lables, currentLable, onClickfunctions, currentOnClick});
    }

    handleToggle = ()=>{
        let {lables, currentLable, onClickfunctions, currentOnClick} = this.state;

        currentLable = toggleArray(lables, currentLable);
        currentOnClick = toggleArray(onClickfunctions, currentOnClick);

        this.setState({currentLable, currentOnClick});
    }

    handleClick = ()=>{
        this.handleToggle();
        this.state.currentOnClick();
    }

    render() { 
        const {lables, color="primary", type="button"} = this.props;
        const {currentLable} = this.state;

        return <button type={type} className={`btn btn-${color} mt-3 me-2`} onClick={this.handleClick} >{currentLable}</button>;
    }
}
 
export default ToggleButton;
