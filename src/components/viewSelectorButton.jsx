import React, {Component} from 'react';
import '../App.css';

class ViewSelectorButton extends Component {

    getColor = () => {
        if(this.props.selected === 1) {
            return "button is-success selector-button";
        }
        return "button is-info selector-button";
    }

    render() {
        return (
            <li ><a ><button key={this.props.id} onClick={() => this.props.onSelect(this.props.id)} className={this.getColor()}>{this.props.name}</button></a></li>
        );
    }
}

export default ViewSelectorButton;

