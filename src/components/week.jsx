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
        // fix for week being inaccurate
        date_to_set.setHours(0,0,0,0);
        this.state = {
            eventlist: [],
            date: date_to_set,
            cache: {},
            loggedIn: this._getCookie("token").length === 60,
            event_objects: this.createEventObjs()
        }

        
    }

    componentDidMount() {
        this.scrollBox.current.scrollTop = 800
        this._getcurrentevents()

    }

    createEventObjs() {
        let event_objects = [];
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                event_objects[`${i}${j}`] = [];
            }
        }
        return event_objects;
    }


    handleSubmit(obj) {
        let current_events = [...this.state.eventlist];
        // console.log(obj)
        current_events.push(obj);
        let date = new Date(obj.date);
        date.setDate(date.getDate() + 1);
        let evt = <WeekEvent eventstate={obj}></WeekEvent>
        this.state.event_objects[`${date.getDay()}${obj.start}`].push(evt);
        this.setState({ 
            eventlist: current_events,
            event_objects: this.state.event_objects 
        });
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
            let formatted_date = `${this.state.date.getFullYear()}-${this.state.date.getMonth() + 1}-${this.state.date.getDate() - this.state.date.getDay()}`;
            let end_of_week = new Date(this.state.date.getTime());
            end_of_week.setDate(end_of_week.getDate() + 6);
            let formatted_end_date = `${end_of_week.getFullYear()}-${end_of_week.getMonth() + 1}-${end_of_week.getDate()}`;
            const results = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
                data: {
                    token: this._getCookie("token"),
                    earliest: `${formatted_date} 00:00:00`,
                    latest: `${formatted_end_date} 23:59:00`
                }
            });
            console.log(results)
            let events = results.data.results // this should hold our events results data !
            let elist = []
            for (let i = 0; i < events.length; i++) {
                let starttime = events[i].start
                let endtime = events[i].end
                let day = starttime.split("T")[0].split("-")[2] - this.state.date.getDate(); // 22 should be whatever the beginning of the week date is
                let start = starttime.split("T")[1].split(":")[0]
                let minspaststart = starttime.split("T")[1].split(":")[1]
                let end = endtime.split("T")[1].split(":")[0]
                let minspastend = endtime.split("T")[1].split(":")[1]
                elist.push({
                    id: events[i].id,
                    date: starttime.split("T")[0],
                    day: parseFloat(day),
                    start: parseFloat(start),
                    smin: parseFloat(minspaststart),
                    end: parseFloat(end),
                    emin: parseFloat(minspastend),
                    name: events[i].title,
                    location: events[i].location,
                    description: events[i].description,
                    category: events[i].category
                })
            }
            this.setState({ eventlist: elist }, () => this._rendercurrentevents());

        }
    }

    _findHour(time) {
        if (time < 12) { return time === 0 ? "12 AM" : time + " AM" }
        else { return (time % 12) === 0 ? "12 PM" : (time % 12) + " PM" }

    }

    _renderRowByHour(time) {
        let rows = [];
        for (let i = 0; i < 7; i++) {
            rows.push(<td style={{ padding: "0px 8px" }}>{this.state.event_objects[`${i}${time}`]}</td>);
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
            let evt_obj = <WeekEvent eventstate={evt}></WeekEvent>;
            this.state.event_objects[`${evt.day}${evt.start}`].push(evt_obj);
        }
        this.forceUpdate();
    }

    changeWeek(direction) {
        let new_date_obj = new Date(this.state.date.getTime());
        if (direction === 1) {
            new_date_obj.setDate(new_date_obj.getDate() + 7);
        } else {
            new_date_obj.setDate(new_date_obj.getDate() - 7);
        }

        this.state.cache[this.state.date] = {
            date: this.state.date,
            eventlist: this.state.eventlist,
            event_objects: this.state.event_objects
        }

        if(this.state.cache[new_date_obj]) {
            this.setState({
                date: new_date_obj,
                eventlist: this.state.cache[new_date_obj].eventlist,
                event_objects: this.state.cache[new_date_obj].event_objects
            })
        } else {
            this.setState({ 
                date: new_date_obj,
                eventlist: [],
                event_objects: this.createEventObjs()
            }, () => this._getcurrentevents());
        }
    }

    render() {
        let header_style = { position: "sticky", top: "0px", zIndex: "2", backgroundColor: "#fff" }
        let date_clone = new Date(this.state.date.getTime());
        date_clone.setDate(date_clone.getDate() - date_clone.getDay());
        let dates = [];
        for(let i = 0; i < 7; i++) {
            dates.push((date_clone.getMonth() + 1) + "/" + date_clone.getDate());
            date_clone.setDate(date_clone.getDate() + 1);
        }
        return (
            <div className="calendar">
                <div className="container">
                    <section className="level" style={{ backgroundColor: "#b5e3f8", height: "50px" }}>
                        <div className="level-left">
                            <h1 className="has-text-light" onClick={() => this.changeWeek(0)} style={{ fontSize: "60px", marginTop: "13px" }}><BiChevronLeft /></h1>
                            <h1 className="title has-text-light" style={{ margin: "10px" }}>{this._getWeek()} </h1>
                        </div>
                        <div className="level-right">
                            <NewEntry submit={(obj) => this.handleSubmit(obj)}></NewEntry>
                            <h1 className="has-text-light" onClick={() => this.changeWeek(1)} style={{ fontSize: "60px", marginTop: "13px" }}><BiChevronRight /></h1>
                        </div>

                    </section>
                </div>
                <div className="container weektable box" ref={this.scrollBox} style={{ height: "600px", overflow: "scroll", padding: "0px" }}>
                    <table className="table is-bordered is-narrow is-hoverable is-fullwidth">
                        <thead style={header_style}>
                            <tr className="is-bordered" style={header_style}>
                                <th style={header_style}></th>
                                <th className="has-text-grey-light" style={header_style}>Sunday {dates[0]}</th>
                                <th className="has-text-grey-light" style={header_style}>Monday {dates[1]}</th>
                                <th className="has-text-grey-light" style={header_style}>Tuesday {dates[2]}</th>
                                <th className="has-text-grey-light" style={header_style}>Wednesday {dates[3]}</th>
                                <th className="has-text-grey-light" style={header_style}>Thursday {dates[4]}</th>
                                <th className="has-text-grey-light" style={header_style}>Friday {dates[5]}</th>
                                <th className="has-text-grey-light" style={header_style}>Saturday {dates[6]}</th>
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