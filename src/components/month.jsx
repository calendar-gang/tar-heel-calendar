import React, { Component } from 'react';
import NewEntry from './newentry';
import ReactDOM from 'react-dom';
import MonthEvent from './monthEvent';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

class Month extends Component {
    state = {};

    eventlist = [{ day: 0, row: 0, start: 2, end: 4, name: "History Lecture", category: 0 },
    { day: 2, row: 2, start: 2, end: 4, name: "History Lecture", category: 1 },
    { day: 2, row: 2, start: 2, end: 4, name: "Chem Lecture", category: 2 },
    { day: 1, row: 1, start: 1, end: 2, name: "Math Lecture", category: 2 },
    { day: 5, row: 3, start: 1, end: 2, name: "Math Lecture", category: 3 },
    { day: 5, row: 0, start: 1, end: 2, name: "Math Lecture", category: 4 },
    { day: 4, row: 2, start: 2, end: 3.5, name: "Breakfast in Durham", category: 5 },
    { day: 3, row: 0, start: 3, end: 5.5, name: "426 Lecture", category: 6 },
    { day: 1, row: 3, start: 3, end: 5.5, name: "426 Lecture", category: 7 },
    { day: 5, row: 0, start: 3, end: 5.5, name: "426 Lecture", category: 8 },
    { day: 6, row: 1, start: 1, end: 2.5, name: "Coffee with Friends", category: 0 }]

    constructor(props) {
        super(props);
        this.state = {
            popup_shown: 0,
            event_objs: []
        }
        this.dayRef = {}
        for (let i = 0; i < 7; i++) {
            this.state.event_objs[i] = [];
            for (let j = 0; j < 5; j++) {
                this.state.event_objs[i][j] = 0;
            }
        }
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 5; j++) {
                for (let k = 0; k < 3; k++) {
                    this.dayRef[`${i}${j}${k}`] = React.createRef()
                }
            }
        }
    }

    componentDidMount() {
        this._rendercurrentevents()
    }

    _rendercurrentevents() {
        for (let i = 0; i < this.eventlist.length; i++) {
            let evt = this.eventlist[i]
            let event_object = <MonthEvent eventstate={evt}></MonthEvent>;

            // introduce more bookeeping in the state to check how many month events are present
            // for each day
            let current_state = this.state.event_objs.slice();
            let div_position = current_state[evt.day][evt.row];
            current_state[evt.day][evt.row] += 1;
            this.setState({ event_objs: current_state });
            // manipulates the dom directly
            ReactDOM.render(event_object, this.dayRef[`${evt.day}${evt.row}${div_position}`].current)
        }
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
                day = real_day_num !== i ? "" : day;
            }
            rows.push(
                <td className="has-text-grey" style={{ height: "114px", textAlign: "left" }} onClick={this.toggleEditBox}>
                    {day}
                    <div>
                        <div ref={this.dayRef[`${i}${week_position}${0}`]}></div>
                        <div ref={this.dayRef[`${i}${week_position}${1}`]}></div>
                        <div ref={this.dayRef[`${i}${week_position}${2}`]}></div>
                    </div>
                </td>
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
                            <h1 className="has-text-light" style={{ fontSize: "60px" }}><BiChevronLeft /></h1>
                            <h1 className="title has-text-light" style={{ margin: "10px" }}>{monthNames[(new Date()).getMonth()]} </h1>
                            <h1 className="subtitle" style={{ margin: "10px" }}> A Monthly View Designed Just For You!</h1>
                        </div>
                        <div className="level-right">
                            <NewEntry></NewEntry>
                            <h1 className="has-text-light" style={{ fontSize: "60px" }}><BiChevronRight /></h1>
                        </div>
                    </section>
                </div >
                <div className="container box" style={{ padding: "0px" }}>
                    <table className="table is-bordered is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr className="is-bordered">
                                <th className="has-text-grey-light">Sunday</th>
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
                <div style={{ height: "30px" }}></div>
            </div >

        )
    }
}

export default Month;