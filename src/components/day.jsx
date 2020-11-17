import React, { Component } from 'react';
import Task from './task';

class Day extends Component {
    state = {}

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

        if (edit_box.className == "modal is-active") {
            edit_box.className = "modal";
        } else {
            edit_box.className = "modal is-active";
        }
    }

    createTask(event) {
        let tasktext = this.refs.tasktext.value;
        window.alert(tasktext)
        this.toggletaskform(event)
        // let mytask = <Task />
        // document.getElementById("tasklist").append(<p>hello</p>)
    }

    rendertaskform() {
        return (<div id="newtask" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head" >
                <p class="modal-card-title">Create a new task:</p>
                <button onClick={this.toggletaskform} class="delete" aria-label="close"></button>
            </header>
            <div class="control">
                <input class="input" ref="tasktext" type="text" placeholder="New Task"/>
            </div>
            <section id="login-box-content" class="modal-card-body">
            </section>
            <footer class="modal-card-foot">
                <button class="button create" id="createtask" onClick={this.createTask.bind(this)}>Create</button>
            </footer>
            
        </div>
    </div>)
    }

    render() {
        return (
            <div className="daysview columns" style={{margin: "0px"}}>
                <div className="calendar column">
                    <div className="container">
                        <section className="level" style={{ backgroundColor: "#b5e3f8", height: "50px" }}>
                            <div className="level-left">
                                <h1 class="has-text-light" style={{ margin: "20px" }}>prev</h1>
                                <h1 class="title has-text-light" style={{ margin: "20px" }}>Sunday 11/15/20 </h1>
                            </div>
                            <div className="level-right">
                                <a className="button is-light">New Entry</a>
                                <h1 class="has-text-light" style={{ margin: "10px" }}>next</h1>
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
                            <h1 class="title has-text-light" style={{ margin: "10px" }}>My Daily To-Do:</h1>
                        </section>
                    <div className="container tasklist box" id="tasklist" style={{ backgroundColor: "white", height: "95%", margin: "15px"}}>
                        <a className="button taskmaker" id="newtaskbutton" style={{ margin: "10px",  backgroundColor: "gray", color: "white"}} onClick={this.toggletaskform}><strong>Add a task!</strong></a><br/>
                        <div class="box" style={{margin: "10px"}}>
                            <input type="checkbox" id="task1" name="task1"/>
                            <label for="task1" class="task"> Be able to make new tasks</label><br/>
                        </div>
                        <div class="box" style={{margin: "10px"}}>
                            <input type="checkbox" id="task2" name="task2"/>
                            <label for="task2" class="task"> start adding data!!</label><br/>
                        </div>
                        {this.rendertaskform()}
                    </div>
                </div>
            </div>
            )
    }
}

export default Day;

