import React, {Component} from 'react';
import ViewSelectorButton from './viewSelectorButton';
import Week from './week';
import Day from './day';

import '../App.css';

class ViewSelector extends Component {

    state = {
        buttons: [
            {id: 1, name: "Day", selected: 0},
            {id: 2, name: "Week", selected: 1},
            {id: 3, name: "Month", selected: 0},
            {id: 4, name: "Year", selected: 0}
        ]
    };

    handleSelect = (id) => {
        this.state.buttons.forEach((button) => {
            if(button.id === id) {
                button.selected = 1;
            } else {
                button.selected = 0;
            }
        });
        this.setState(this.state);
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="tabs is-centered">
                    <ul>
                        {this.state.buttons.map((button) => {
                            return <ViewSelectorButton onSelect={this.handleSelect} id={button.id} key={button.id} name={button.name} selected={button.selected}/>;
                        })}
                    </ul>
                </div>
            </div>
            <Week />
            </div>
        )
    }
}

export default ViewSelector;
