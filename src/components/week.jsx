import React, { Component } from 'react';
import NewEntry from './newentry';
import WeekEvent from './weekEvent';
import ReactDOM from 'react-dom'

class Week extends Component {
    state = {}
    eventlist = [{ day: 0, start: 2, end: 4, name: "History Lecture", category: 4 },
    { day: 2, start: 2, end: 4, name: "History Lecture", category: 4 },
    { day: 1, start: 1, end: 2, name: "Math Lecture", category: 2 },
    { day: 3, start: 1, end: 2, name: "Math Lecture", category: 2 },
    { day: 5, start: 1, end: 2, name: "Math Lecture", category: 2 },
    { day: 4, start: 2, end: 3.5, name: "Breakfast in Durham", category: 3 },
    { day: 3, start: 3, end: 5.5, name: "426 Lecture", category: 6 },
    { day: 1, start: 3, end: 5.5, name: "426 Lecture", category: 6 },
    { day: 5, start: 3, end: 5.5, name: "426 Lecture", category: 6 },
    { day: 6, start: 1, end: 2.5, name: "Coffee with Friends", category: 8 }]

    constructor(props) {
        super(props);

        this.inputRef = {}
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                this.inputRef[`${i}${j}`] = React.createRef()
            }
        }
    }

    componentDidMount() {
        this._rendercurrentevents()
    }

    _findHour(time) {
        if (time < 12) { return time === 0 ? "12 AM" : time + " AM" }
        else { return (time % 12) === 0 ? "12 PM" : (time % 12) + " PM" }

    }

    _renderRowByHour(time) {
        let rows = [];
        for (let i = 0; i < 7; i++) {
            rows.push(<td style={{ padding: "0px 8px" }} ref={this.inputRef[`${i}${time}`]}></td>);
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

    _getWeek() {
        var curr = new Date(); // get current date
        var first = curr.getDate() - curr.getDay() - 1; // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first)).toUTCString();
        firstday = firstday.substring(0, 11)
        var lastday = new Date(curr.setDate(last)).toUTCString();
        lastday = lastday.substring(0, 11)

        return firstday + " - " + lastday

    }

    _rendercurrentevents() {
        for (let i = 0; i < this.eventlist.length; i++) {
            let evt = this.eventlist[i]
            ReactDOM.render(<WeekEvent eventstate={evt}></WeekEvent>, this.inputRef[`${evt.day}${evt.start}`].current)
        }
    }

    render() {
        return (
            <div className="calendar">
                <div className="container">
                    <section className="level" style={{ backgroundColor: "#b5e3f8", height: "50px" }}>
                        <div className="level-left">
                            <h1 className="has-text-light" style={{ margin: "10px" }}>prev</h1>
                            <h1 className="title has-text-light" style={{ margin: "10px" }}>{this._getWeek()} </h1>
                        </div>
                        <div className="level-right">
                            <NewEntry></NewEntry>
                            <h1 className="has-text-light" style={{ margin: "10px" }}>next</h1>
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