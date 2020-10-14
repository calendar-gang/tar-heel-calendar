import React, {Component} from 'react';
import ViewSelectorButton from './viewSelectorButton';
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


    render() {
        return (
            <div className="container">
                <div className="tabs is-centered">
                    <ul>
                        {this.state.buttons.map((button) => {
                            return <ViewSelectorButton id={button.id} key={button.id} name={button.name} selected={button.selected}/>;
                        })}
                    
                    </ul>
                </div>
            </div>
        )
    }
}

export default ViewSelector;
