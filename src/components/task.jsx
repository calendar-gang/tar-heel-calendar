import React, { Component } from 'react';
class Task extends Component {

    constructor() {
        super()
        // window.alert("hello")
        this.state = {style: {textDecoration: 'none', margin: "10px"}}
    }

    strikethrough() {
        if (this.state.style.textDecoration == "none") {
            this.setState({style: {textDecoration: 'line-through', backgroundColor: '#bebfc2', margin: "10px"}})
        } else {
            this.setState({style: {textDecoration: 'none', margin: "10px"}})
        }
    }

    deleteTask() {
        // need to figure out how to go about deleting a task


    }


    render() {
        return (
            <div className="box" style={this.state.style} onClick={this.strikethrough.bind(this)}>
                <button className="delete is-small" style={{float: "right"}} aria-label="close" onClick={this.deleteTask.bind(this)}></button>
                <label className="task" style={this.state.style}>{this.props.text}</label><br/>
            </div>

        ) 
    }
}

export default Task