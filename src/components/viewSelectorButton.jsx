import React, { Component } from 'react';
import '../App.css';

class ViewSelectorButton extends Component {

    getStyle = () => {
        if (this.props.selected === 1) {
            return {
                backgroundColor: "#0b1846",
            };
        }
        return {
            backgroundColor: "#b5e3f8",
        };
    }

    getClasses = () => {
        if (this.props.selected === 1) {
            return "button is-primary selector-button";
        }
        return "button is-info-light selector-button";
    }

    render() {
        return (
            <li ><a ><button key={this.props.id} onClick={() => this.props.onSelect(this.props.id)} style={this.getStyle()} className={this.getClasses()}>{this.props.name}</button></a></li>
        );
    }
}

export default ViewSelectorButton;

