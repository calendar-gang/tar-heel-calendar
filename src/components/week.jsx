import React, { Component } from 'react';
import WeekEvent from './weekEvent';

class Week extends Component {
    state = {}

    _findHour(time) {
        if (time < 12) { return time === 0 ? "12 AM" : time + " AM" }
        else { return (time % 12) === 0 ? "12 PM" : (time % 12) + " PM" }

    }

    _renderRowByHour(time) {
        let messages = ["", "", "", "",
            "", "", ""];
        let rows = [];
        if (time === 0) {
            messages.forEach((task) => {
                rows.push(
                    // onClick={this.toggleEditBox}
                    <td>{task}<WeekEvent /></td>
                );
            })
        } else {
            messages.forEach((task) => {
                rows.push(
                    // onClick={this.toggleEditBox}
                    <td>{task}</td>
                );
            })
        }

        return (
            <tr>
                <th className="has-text-grey-light has-text-left">{this._findHour(time)}</th>
                {rows}
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

    render() {
        return (
            <div className="calendar">
                <div className="container">
                    <section className="level" style={{ backgroundColor: "#b5e3f8", height: "50px" }}>
                        <div className="level-left">
                            <h1 class="has-text-light" style={{ margin: "10px" }}>prev</h1>
                            <h1 class="title has-text-light" style={{ margin: "10px" }}>Week of 11/15/20 </h1>
                        </div>
                        <div className="level-right">
                            <a className="button is-light">New Entry</a>
                            <h1 class="has-text-light" style={{ margin: "10px" }}>next</h1>
                        </div>

                    </section>
                </div>
                <div className="container">
                    <table className="table is-bordered is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr className="is-bordered">
                                <th></th>
                                <th className="has-text-grey-light" >Sunday</th>
                                <th className="has-text-grey-light">Monday</th>
                                <th className="has-text-grey-light">Tuesday</th>
                                <th className="has-text-grey-light">Wednesday</th>
                                <th className="has-text-grey-light">Thursday</th>
                                <th className="has-text-grey-light">Friday</th>
                                <th className="has-text-grey-light">Saturday</th>
                            </tr>
                        </thead>
                        {this._renderBody()}
                    </table>
                </div>
            </div>
        )
    }
}

export default Week;