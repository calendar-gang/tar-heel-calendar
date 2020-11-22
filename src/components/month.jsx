import React, { Component } from 'react';
import NewEntry from './newentry';
import ReactDOM from 'react-dom';
import MonthEvent from './monthEvent';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import axios from '../../node_modules/axios/index.js';

class Month extends Component {
    state = {};

    constructor(props) {
        super(props);

        let create_day = this.createDays();

        this.state = {
            cache: {},
            days: create_day.days,
            eventlist: [],
            date: new Date(this.props.date.getFullYear(), this.props.date.getMonth()),
            dayRef: create_day.dayRef,
            loggedIn: this._getCookie("token").length === 60,
        }

        this.state.cache[this.state.date.getMonth()] = create_day;
    }

    componentDidMount() {
        this._getcurrentevents()
    }

    async _getcurrentevents() {
        if (!this.state.loggedIn) {
            this.setState({ eventlist: [] });
        } else {
            const results = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
                data: {
                    token: this._getCookie("token"),
                    earliest: '2020-11-00 00:00:00',
                    latest: '2020-11-30 23:59:00'
                }
            });
            let events = results.data.results // this should hold our events results data !
            let elist = []
            for (let i = 0; i < events.length; i++) {
                let starttime = events[i].start
                let endtime = events[i].end
                let date = `${starttime.split("T")[0].split("-")[1]}-${starttime.split("T")[0].split("-")[2]}-${starttime.split("T")[0].split("-")[0]}`
                let start = starttime.split("T")[1].split(":")[0]
                let minspaststart = starttime.split("T")[1].split(":")[1]
                let end = endtime.split("T")[1].split(":")[0]
                let minspastend = endtime.split("T")[1].split(":")[1]
                elist.push({
                    id: events[i].id,
                    date: date,
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

    _rendercurrentevents() {
        for (let i = 0; i < this.state.eventlist.length; i++) {
            let evt = this.state.eventlist[i];
            let event_object = <MonthEvent eventstate={evt}></MonthEvent>;
            let date = new Date(evt.date)

            // introduce more bookeeping in the state to check how many month events are present
            // for each day
            if (date.getMonth() == this.state.date.getMonth()) {
                let current_state = [...this.state.days];
                current_state[date.getDate()].event_objs.push(event_object);
                this.setState({ days: current_state });
            }
            // manipulates the dom directly
            // ReactDOM.render(event_object, this.state.dayRef[`${day_row.day}${day_row.row}`].current)
        }
    }

    _getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        else return ""

    }

    createDays() {
        let days = [];
        let dayRef = [];
        for (let i = 1; i < 32; i++) {
            let obj = this.calcDayRow(i)
            days[i] = {
                row: obj.row,
                day: obj.day,
                event_objs: []
            };
            dayRef[`${obj.day}${obj.row}`] = React.createRef()
        }
        return {
            days: days,
            dayRef: dayRef
        }
    }

    calcDayRow(day_num) {
        // need to be able to calculate day and row from date
        let row = Math.floor(day_num / 7);
        let day = day_num % 7;
        return {
            row: row,
            day: day
        }
    }


    _renderRowByDay(week_position) {
        let rows = [];
        for (let i = 0; i < 7; i++) {
            let day = (week_position * 7 + i + 1)
            if (day < 32) {
                rows.push(
                    <td className="has-text-grey" style={{ height: "114px", textAlign: "left" }} onClick={this.toggleEditBox}>
                        {day}
                        <div ref={this.state.dayRef[`${i}${week_position}`]} style={{ width: "120px" }}>
                            {this.state.days[day].event_objs}
                        </div>
                    </td>
                );
            }
        }
        return (
            <tr>
                {rows}
            </tr>
        )
    }

    numDays(year, month) {
        return (new Date(year, month, 0)).getDate() - 1;
    }

    _renderBody() {
        let rows = [];
        for (let i = 0; i < 5; i++) {
            rows.push(this._renderRowByDay(i));
        }
        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    switchMonth(direction) {
        let date_to_set = new Date(this.state.date.getTime());
        if (direction == 0) {
            date_to_set.setMonth(date_to_set.getMonth() - 1);
        } else {
            date_to_set.setMonth(date_to_set.getMonth() + 1);
        }
        let create_day = this.createDays()
        if (!this.state.cache[date_to_set.getMonth()]) {
            this.state.cache[date_to_set.getMonth()] = create_day;
            this.setState({
                date: date_to_set,
                days: create_day.days,
                dayRef: create_day.dayRef
            });
        } else {
            this.setState({
                date: date_to_set,
                days: this.state.cache[date_to_set.getMonth()].days,
                dayRef: this.state.cache[date_to_set.getMonth()].dayRef
            });
        }
    }

    createEvent(object) {
        let state_copy = [...this.state.eventlist];
        state_copy.push(object);
        this.setState({ eventlist: state_copy });

        let event_object = <MonthEvent eventstate={object}></MonthEvent>;
        let date = new Date(object.date)

        // this math isn't great and it's temporary
        date.setDate(date.getDate() + 1);

        // introduce more bookeeping in the state to check how many month events are present
        // for each day
        if (date.getMonth() == this.state.date.getMonth()) {
            let current_state = [...this.state.days];
            current_state[date.getDate()].event_objs.push(event_object);
            this.setState({ days: current_state });
        }
    }

    render() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        return (
            <div className="calendar">
                <div className="container">
                    <section className="level" style={{ backgroundColor: "#b5e3f8", height: "50px" }}>
                        <div className="level-left">
                            <h1 onClick={() => this.switchMonth(0)} className="has-text-light" style={{ fontSize: "60px" }} ><BiChevronLeft /></h1>
                            <h1 className="title has-text-light" style={{ margin: "10px" }}>{monthNames[(this.state.date).getMonth()] + " " + this.state.date.getFullYear()} </h1>
                            <h1 className="subtitle" style={{ margin: "10px" }}> A Monthly View Designed Just For You!</h1>
                        </div>
                        <div className="level-right">
                            <NewEntry submit={(obj) => this.createEvent(obj)}></NewEntry>
                            <h1 onClick={() => this.switchMonth(1)} className="has-text-light" style={{ fontSize: "60px" }}><BiChevronRight /></h1>
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