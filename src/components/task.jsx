import React, { Component } from 'react';
class Task extends Component {
    state = {}

    render() {
        return (
            <div className="box" style={{margin: "10px"}}>
                <input type="checkbox"/>
                <label className="task">new task</label><br/>
            </div>

        ) 
    }
}

export default Task