import React, {Component} from 'react';
import '../App.css';

class ViewSelectorButton extends Component {
    state = {
        id: this.props.id,
        name: this.props.name,
        selected: this.props.selected
    };

    getColor = () => {
        if(this.state.selected == 1) {
            return "button is-success selector-button";
        }
        return "button is-info selector-button";
    }

    render() {
        return (
            <li ><a ><button className={this.getColor()}>{this.state.name}</button></a></li>
        );
    }
}

export default ViewSelectorButton;

