import React, { Component } from 'react';
class Task extends Component {
    // this does nothing as of now lol
    // trying to think of how to scale todo list with multiple users and a database!
    // state = {
    //     text: "",
    //     strike: false,
    // }

    constructor() {
        super()
        this.state = {style: {textDecoration: 'none'}}
    }

    // state = {style: {textDecoration: 'none'}}

    strikethrough() {
        // window.alert("task complete!")
        if (this.state.style.textDecoration == "none") {
            this.setState({style: {textDecoration: 'line-through'}})
        } else {
            this.setState({style: {textDecoration: 'none'}})
        }
       
        // ReactDOM.render((<div><label for="task2" className="task" id="task2text" style={{textDecoration: 'line-through'}}> start adding data!!</label>
        // <p>Task Complete!</p></div>), document.getElementById("task2text"));
    }

    render() {
        return (
            <div className="box" style={{margin: "10px"}} onClick={this.strikethrough.bind(this)}>
                <label className="task" style={this.state.style}>{this.props.text}</label><br/>
            </div>

        ) 
    }
}

export default Task