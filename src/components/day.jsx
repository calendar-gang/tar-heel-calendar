import React, { Component } from 'react';
import { useState } from 'react';
import Task from './task';
import ReactDOM from 'react-dom'

class Day extends Component {
    state = {}
    tasklist = ["get", "this", "to", "work"]

    _findHour(time) {
        if (time < 12) { return time === 0 ? "12 AM" : time + " AM" }
        else { return (time % 12) === 0 ? "12 PM" : (time % 12) + " PM" }

    }

    _renderRowByHour(time) {
        return (
            <tr>
                <th className="has-text-grey-light has-text-left">{this._findHour(time)}</th>
                <td></td>
            </tr>
        )
    }

    _renderBody() {
        let rows = [];
        for (let i = 0; i < 24; i++) {
            rows.push(this._renderRowByHour(i));
        }
        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    toggletaskform(event) {
        event.persist();
        // let name = event.target.id;
        let edit_box = document.getElementById("newtask");

        if (edit_box.className === "modal is-active") {
            edit_box.className = "modal";
        } else {
            edit_box.className = "modal is-active";
        }
    }

    createTask(event) {
        let tasktext = this.refs.tasktext.value;
        this.tasklist.push(tasktext)
        // window.alert(tasktext)
        this.toggletaskform(event)
        const d = document.createElement("div")
        const id = Math.random() 
        d.id = id
        document.getElementById('newtasks').appendChild(d)
        // ReactDOM.render((<div className="box" style={{margin: "10px"}}>
        // <input type="checkbox"/>
        // <label className="task" style={{marginLeft: "5px"}}>{tasktext}</label><br/>
        // </div>), document.getElementById(id));
        ReactDOM.render(<Task text={tasktext}></Task>, document.getElementById(id));

    }

    // strikeTask(event) {
    //     ReactDOM.render((<div><label for="task2" className="task" id="task2text" style={{textDecoration: 'line-through'}}> start adding data!!</label>
    //                             <p>Task Complete!</p></div>), document.getElementById("task2text"));
    // }

    rendertaskform() {
        return (<div id="newtask" className="modal">
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head" >
                <p className="modal-card-title">Create a new task:</p>
                <button onClick={this.toggletaskform} className="delete" aria-label="close"></button>
            </header>
            <div className="control">
                <input className="input" ref="tasktext" type="text" placeholder="New Task"/>
            </div>
            <section id="login-box-content" className="modal-card-body">
            </section>
            <footer className="modal-card-foot">
                <button className="button create" id="createtask" onClick={this.createTask.bind(this)}>Create</button>
            </footer>
            
        </div>
    </div>)
    }

    rendercurrenttasks() {
        const tasks = []
        for (let i = 0; i < this.tasklist.length; i++) {
            tasks.push(<Task text={this.tasklist[i]}></Task>)
        }
        return tasks
    }

    render() {

        var now = new Date();
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        var day = days[ now.getDay() ];
        var month = months[ now.getMonth() ];

        let writtendate = day + ", " + month + " " + now.getDate() + "th"

        return (
            <div className="daysview columns" style={{margin: "0px"}}>
                <div className="calendar column">
                    <div className="container">
                        <section className="level" style={{ backgroundColor: "#b5e3f8", height: "50px" }}>
                            <div className="level-left">
                                <h1 className="has-text-light" style={{ margin: "20px" }}>prev</h1>
                                <h1 className="title has-text-light" style={{ margin: "20px" }}>{writtendate} </h1>
                            </div>
                            <div className="level-right">
                                <a className="button is-light">New Entry</a>
                                <h1 className="has-text-light" style={{ margin: "10px" }}>next</h1>
                            </div>

                        </section>
                    </div>
                    <div className="container" style={{ margin: "10px" }}>
                        <table className="table is-bordered is-narrow is-hoverable is-fullwidth">
                            <thead>
                                <tr className="is-bordered">
                                    <th></th>
                                    <th className="has-text-grey-light" >Tasks</th>
                                </tr>
                            </thead>
                            {this._renderBody()}
                        </table>
                    </div>

                </div>
                <div className="dailytodo container column box is-one-quarter" style={{ backgroundColor: "#0b1846"}}>
                        <section className="level" style={{ backgroundColor: "#0b1846", height: "50px" }}>
                            <h1 className="title has-text-light" style={{ margin: "10px" }}>My Daily To-Do:</h1>
                        </section>
                    <div className="container tasklist box" id="tasklist" style={{ backgroundColor: "white", height: "95%", margin: "15px"}}>
                        {this.rendercurrenttasks()}
                        <div id="newtasks"></div>
                        {this.rendertaskform()}
                    </div>
                </div>
            </div>
            )
    }
}

export default Day;

// <input type="checkbox" id="task2" name="task2" onClick={this.strikeTask.bind(this)}/>