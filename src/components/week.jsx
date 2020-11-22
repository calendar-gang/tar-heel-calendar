import React, { Component } from 'react';
import NewEntry from './newentry';
import WeekEvent from './weekEvent';
import ReactDOM from 'react-dom'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import AutoCompleteText from './autocomplete';
import axios from '../../node_modules/axios/index.js';

class Week extends Component {
    state = {}

    fakeDescription = "This is a description of an event, please work! Should probably go to class or something."
    eventlist = []

    constructor(props) {
        super(props);

        this.scrollBox = React.createRef()

        let date_to_set = new Date(this.props.date.getTime());
        date_to_set.setDate(date_to_set.getDate() - date_to_set.getDay());
        this.state = {
            date: date_to_set
        }

        this.inputRef = {}
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                this.inputRef[`${i}${j}`] = React.createRef()
            }
        }
    }

    componentDidMount() {
        this.scrollBox.current.scrollTop = 800
        this.eventlist = this._getcurrentevents()
        this._rendercurrentevents()

    }

    _getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        else return ""

    }

    async _getcurrentevents() {

        if (this._getCookie("token") == "") {
            return []
        } else {
            let tok = this._getCookie("token")
            console.log(tok)

            const res = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
                data: {
                    token: tok
                }
            });
            console.log(res)
            return [{ day: 0, start: 12, end: 14, name: "History Lecture", location: "Coker 211", description: `${this.fakeDescription}`, category: 0 },
            { day: 2, start: 12, end: 14, name: "History Lecture", location: "Coker 211", description: `${this.fakeDescription}`, category: 1 },
            { day: 1, start: 11, end: 12, name: "Math Lecture", location: "Wilson 105", description: `${this.fakeDescription}`, category: 2 },
            { day: 3, start: 11, end: 12, name: "Math Lecture", location: "Wilson 105", description: `${this.fakeDescription}`, category: 3 },
            { day: 5, start: 11, end: 12, name: "Math Lecture", location: "Wilson 105", description: `${this.fakeDescription}`, category: 4 },
            { day: 4, start: 12, end: 13.5, name: "Breakfast", location: "Durham", description: `${this.fakeDescription}`, category: 5 },
            { day: 3, start: 13, end: 15.5, name: "426 Lecture", location: "Sitterson 118", description: `${this.fakeDescription}`, category: 6 },
            { day: 1, start: 13, end: 15.5, name: "426 Lecture", location: "Sitterson 118", description: `${this.fakeDescription}`, category: 7 },
            { day: 5, start: 13, end: 15.5, name: "426 Lecture", location: "Sitterson 118", description: `${this.fakeDescription}`, category: 8 },
            { day: 6, start: 11, end: 12.5, name: "Coffee with Friends", location: "Franklin St.", description: `${this.fakeDescription}`, category: 0 }]
        }

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
        var curr = new Date(this.state.date.getTime()); // get current date
        // var first = curr.getDate() - curr.getDay() - 1; // First day is the day of the month - the day of the week
        // var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.getTime()).toUTCString();
        firstday = firstday.substring(0, 11)
        var lastday = new Date(curr.getTime());
        lastday.setDate(lastday.getDate() + 6);
        lastday = lastday.toUTCString();
        lastday = lastday.substring(0, 11)

        return firstday + " - " + lastday

    }

    _rendercurrentevents() {
        for (let i = 0; i < this.eventlist.length; i++) {
            let evt = this.eventlist[i]
            ReactDOM.render(<WeekEvent eventstate={evt}></WeekEvent>, this.inputRef[`${evt.day}${evt.start}`].current)
        }
    }

    changeWeek(direction) {
        let new_date_obj = new Date(this.state.date.getTime());
        if (direction == 1) {
            new_date_obj.setDate(new_date_obj.getDate() + 7);
        } else {
            new_date_obj.setDate(new_date_obj.getDate() - 7);
        }
        this.setState({ date: new_date_obj })
    }

    render() {
        let header_style = { position: "sticky", top: "0px", zIndex: "2", backgroundColor: "#fff" }
        return (
            <div className="calendar">
                <div className="container">
                    <section className="level" style={{ backgroundColor: "#b5e3f8", height: "50px" }}>
                        <div className="level-left">
                            <h1 className="has-text-light" onClick={() => this.changeWeek(0)} style={{ fontSize: "60px" }}><BiChevronLeft /></h1>
                            <h1 className="title has-text-light" style={{ margin: "10px" }}>{this._getWeek()} </h1>
                        </div>
                        <div className="level-right">
                            <NewEntry></NewEntry>
                            <h1 className="has-text-light" onClick={() => this.changeWeek(1)} style={{ fontSize: "60px" }}><BiChevronRight /></h1>
                        </div>

                    </section>
                </div>
                <div className="container weektable box" ref={this.scrollBox} style={{ height: "600px", overflow: "scroll", padding: "0px" }}>
                    <table className="table is-bordered is-narrow is-hoverable is-fullwidth">
                        <thead style={header_style}>
                            <tr className="is-bordered" style={header_style}>
                                <th style={header_style}></th>
                                <th className="has-text-grey-light" style={header_style}>Sunday</th>
                                <th className="has-text-grey-light" style={header_style}>Monday</th>
                                <th className="has-text-grey-light" style={header_style}>Tuesday</th>
                                <th className="has-text-grey-light" style={header_style}>Wednesday</th>
                                <th className="has-text-grey-light" style={header_style}>Thursday</th>
                                <th className="has-text-grey-light" style={header_style}>Friday</th>
                                <th className="has-text-grey-light" style={header_style}>Saturday</th>
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

export default Week;