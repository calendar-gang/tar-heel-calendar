import React, {Component} from 'react';

class Week extends Component {
    state = {};

    _renderRowByHour(time) {
        let messages = ["Prepare for exam", "Fail 521 exam", "Move on with life", "Anticipate future",
                        "Who cares about future, it's Friday!", "Sleep", "Hello"];
        let rows = [];
        messages.forEach((task) => {
            rows.push(
            <td>{task}</td>
            );
        })
        return (
            <tr>
                <th>{time}</th>
                {rows}
            </tr>
        )
    }

    _renderBody() {
        let rows = [];
        for(let i = 0; i < 24; i++) {
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
                <table className="table is-bordered is-narrow is-hoverable is-fullwidth">
                    <thead>
                    <tr className="is-bordered">
                        <th></th>
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
                </div>
            </div>
        )
    }
}

export default Week;
