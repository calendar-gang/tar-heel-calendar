import React, { Component } from 'react';
import NewEntry from './newentry';
import WeekEvent from './weekEvent';
import ReactDOM from 'react-dom'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import AutoCompleteText from './autocomplete';
import axios from '../../node_modules/axios/index.js';

class Week extends Component {
    state = {}

    constructor(props) {
        super(props);

        this.scrollBox = React.createRef()

        let date_to_set = new Date(this.props.date.getTime());
        date_to_set.setDate(date_to_set.getDate() - date_to_set.getDay());
        this.state = {
            eventlist: [],
            date: date_to_set,
            loggedIn: this._getCookie("token").length === 60,
            inputRef: {}
        }

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                this.state.inputRef[`${i}${j}`] = React.createRef()
            }
        }
    }

    componentDidMount() {
        this.scrollBox.current.scrollTop = 800
        this._getcurrentevents()

    }

    handleSubmit(obj) {
        let current_events = [...this.state.eventlist];
        current_events.push(obj);
        let date = new Date(obj.date);
        date.setDate(date.getDate() + 1);
        ReactDOM.render(<WeekEvent eventstate={obj}></WeekEvent>, this.state.inputRef[`${date.getDay()}${obj.start}`].current);
        this.setState({ eventlist: current_events });
    }

    _getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        else return ""

    }

    async _getcurrentevents() {

        if (!this.state.loggedIn) {
            this.setState({ eventlist: [] });
        } else {
            const results = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
                data: {
                    token: this._getCookie("token")
                }
            });
            let events = results.data.results // this should hold our events results data !
            let elist = []
            for (let i = 0; i < events.length; i++) {
                let starttime = events[i].start
                let endtime = events[i].end
                let day = starttime.split("T")[0].split("-")[2] - 22 // 22 should be whatever the beginning of the week date is
                let start = starttime.split("T")[1].split(":")[0]
                let minspaststart = starttime.split("T")[1].split(":")[1]
                let end = endtime.split("T")[1].split(":")[0]
                let minspastend = endtime.split("T")[1].split(":")[1]
                elist.push({
                    id: this.events[i].id,
                    date: starttime.split("T")[0],
                    day: parseFloat(day),
                    start: parseFloat(start),
                    smin: parseFloat(minspaststart),
                    end: parseFloat(end),
                    emin: parseFloat(minspastend),
                    name: events[i].title,
                    location: events[i].location,
                    description: events[i].description,
                    category: i % 9
                })
            }
            this.setState({ eventlist: elist });

        }

        this._rendercurrentevents()

    }

    _findHour(time) {
        if (time < 12) { return time === 0 ? "12 AM" : time + " AM" }
        else { return (time % 12) === 0 ? "12 PM" : (time % 12) + " PM" }

    }

    _renderRowByHour(time) {
        let rows = [];
        for (let i = 0; i < 7; i++) {
            rows.push(<td style={{ padding: "0px 8px" }} ref={this.state.inputRef[`${i}${time}`]}></td>);
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
        for (let i = 0; i < this.state.eventlist.length; i++) {
            let evt = this.state.eventlist[i]
            ReactDOM.render(<WeekEvent eventstate={evt}></WeekEvent>, this.state.inputRef[`${evt.day}${evt.start}`].current)
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
                            <NewEntry submit={(obj) => this.handleSubmit(obj)}></NewEntry>
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