import React, { Component } from 'react';
import NewEntry from './newentry';

class Month extends Component {
    state = {};

    toggleEditBox(event) {
        event.persist();
        let td = event.nativeEvent.path[0];
        let edit_box = document.getElementById("edit-box");
        let content = document.getElementById("edit-box-content");
        if (edit_box.className === "modal is-active") {
            edit_box.className = "modal";
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
        } else {
            edit_box.className = "modal is-active";
            let task = document.createElement("p");
            task.innerHTML = td.innerHTML;
            content.append(task);
        }
    }

    createEditBox() {
        return (
            <div id="edit-box" class="modal">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Here Are Your Tasks!</p>
                        <button onClick={this.toggleEditBox} class="delete" aria-label="close"></button>
                    </header>
                    <section id="edit-box-content" class="modal-card-body">
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-warning">Edit</button>
                        <button class="button is-success">Save changes</button>
                        <button onClick={this.toggleEditBox} class="button">Cancel</button>
                    </footer>
                </div>
            </div>

        )
    }

    _renderRowByDay(week_position) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day_count = this.numDays(year, month) - 1;
        let day_num = (month, day, year) => (new Date(year, month, day)).getDay();
        let rows = [];
        for (let i = 0; i < 7; i++) {
            let day = (week_position * 7 + i + 1) > day_count ? "" : (week_position * 7 + i + 1);
            if (day !== "") {
                let real_day_num = day_num(month, day, year);
                if (real_day_num !== i) {
                    day = "";
                }
            }
            rows.push(
                <td style={{ height: "100px", textAlign: "left"}} onClick={this.toggleEditBox}>{day}</td>
            );
        }
        return (
            <tr>
                {rows}
            </tr>
        )
    }

    numDays(year, month) {
        return (new Date(year, month, 0)).getDate();
    }

    _renderBody() {
        let rows = [];
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        for (let i = 0; i < (this.numDays(year, month) % 7) + 2; i++) {
            rows.push(this._renderRowByDay(i));
        }
        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    render() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        return (
            <div className="calendar">
                <div className="container">
                    <section className="level" style={{ backgroundColor: "#b5e3f8", height: "50px" }}>
                        <div className="level-left">
                            <h1 className="has-text-light" style={{ margin: "10px" }}>prev</h1>
                            <h1 className="title has-text-light" style={{ margin: "10px" }}>{monthNames[(new Date()).getMonth()]} </h1>
                            <h1 className="subtitle" style={{ margin: "10px" }}> A Monthly View Designed Just For You!</h1>
                        </div>
                        <div className="level-right">
                            <NewEntry></NewEntry>
                            <h1 className="has-text-light" style={{ margin: "10px" }}>next</h1>
                        </div>
                    </section>
                </div >
                <div className="container">
                    <table className="table is-bordered is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr className="is-bordered">
                                <th>Sunday</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                            </tr>
                        </thead>
                        {this._renderBody()}
                    </table>
                    {this.createEditBox()}
                </div>
            </div >

        )
    }
}

export default Month;