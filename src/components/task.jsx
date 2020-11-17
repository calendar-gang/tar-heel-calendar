import React, { Component } from 'react';
class Task extends Component {
    state = {}

    render() {
        return (
            <div class="box" style={{margin: "10px"}}>
                <input type="checkbox"/>
                <label class="task">new task</label><br/>
            </div>

        ) 
    }
}

export default Task