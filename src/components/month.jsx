import React, { Component } from 'react';
import NewEntry from './newentry';
import ReactDOM from 'react-dom';
import MonthEvent from './monthEvent';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

class Month extends Component {
    state = {};

    fakeDescription = "This is a description of an event, please work! Should probably go to class or something."
    

    constructor(props) {
        super(props);

        let eventlist = [{ day: 0, row: 0, start: 2, end: 4, name: "History Lecture", location: "Coker 211", description: `${this.fakeDescription}`, category: 0 },
            { day: 2, row: 2, start: 2, end: 4, name: "History Lecture", location: "Coker 211", description: `${this.fakeDescription}`, category: 1 },
            { day: 2, row: 2, start: 2, end: 4, name: "Chem Lecture", location: "Coker 105", description: `${this.fakeDescription}`, category: 2 },
            { day: 1, row: 1, start: 1, end: 2, name: "Math Lecture", location: "Wilson 105", description: `${this.fakeDescription}`, category: 2 },
            { day: 5, row: 3, start: 1, end: 2, name: "Math Lecture", location: "Wilson 105", description: `${this.fakeDescription}`, category: 3 },
            { day: 5, row: 0, start: 1, end: 2, name: "Math Lecture", location: "Wilson 105", description: `${this.fakeDescription}`, category: 4 },
            { day: 4, row: 2, start: 2, end: 3.5, name: "Breakfast", location: "Durham", description: `${this.fakeDescription}`, category: 5 },
            { day: 3, row: 0, start: 3, end: 5.5, name: "426 Lecture", location: "Sitterson 118", description: `${this.fakeDescription}`, category: 6 },
            { day: 1, row: 3, start: 3, end: 5.5, name: "426 Lecture", location: "Sitterson 118", description: `${this.fakeDescription}`, category: 7 },
            { day: 5, row: 0, start: 3, end: 5.5, name: "426 Lecture", location: "Sitterson 118", description: `${this.fakeDescription}`, category: 8 },
            { day: 6, row: 1, start: 1, end: 2.5, name: "Coffee with Friends", location: "Franklin St.", description: `${this.fakeDescription}`, category: 0 }];

        this.state = {
            event_objs: [],
            eventlist: eventlist,
            date: this.props.date,
            dayRef: {}
        }
        for(let i = 0; i < 7; i++) {
            this.state.event_objs[i] = [];
            for (let j = 0; j < 5; j++) {
                this.state.event_objs[i][j] = 0;
            }
        }
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 5; j++) {
                for (let k = 0; k < 3; k++) {
                    this.state.dayRef[`${i}${j}${k}`] = React.createRef()
                }
            }
        }
    }

    componentDidMount() {
        this._rendercurrentevents()
    }

    _rendercurrentevents() {
        for (let i = 0; i < this.state.eventlist.length; i++) {
            let evt = this.state.eventlist[i];
            let event_object = <MonthEvent eventstate={evt}></MonthEvent>;

            // introduce more bookeeping in the state to check how many month events are present
            // for each day
            let current_state = this.state.event_objs.slice();
            let div_position = current_state[evt.day][evt.row];
            current_state[evt.day][evt.row] += 1;
            this.setState({ event_objs: current_state });
            // manipulates the dom directly
            ReactDOM.render(event_object, this.state.dayRef[`${evt.day}${evt.row}${div_position}`].current)
        }
    }

    _renderRowByDay(week_position) {
        let date = new Date(this.state.date.getTime());
        let year = date.getFullYear();
        let month = date.getMonth();
        let day_count = this.numDays(year, month) - 1;
        //let day_num = (month, day, year) => (new Date(year, month, day)).getDay();
        let rows = [];
        for (let i = 0; i < 7; i++) {
            let day = (week_position * 7 + i + 1) > day_count ? "" : (week_position * 7 + i + 1);
            rows.push(
                <td className="has-text-grey" style={{ height: "114px", textAlign: "left" }} onClick={this.toggleEditBox}>
                    {day}
                    <div style={{width: "120px"}}>
                        <div ref={this.state.dayRef[`${i}${week_position}${0}`]}></div>
                        <div ref={this.state.dayRef[`${i}${week_position}${1}`]}></div>
                        <div ref={this.state.dayRef[`${i}${week_position}${2}`]}></div>
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
        let date = this.state.date;
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

    switchMonth(direction) {
        let date_to_set = new Date(this.state.date.getTime());
        if(direction == 0) {
            date_to_set.setMonth(date_to_set.getMonth() - 1);
        } else {
            date_to_set.setMonth(date_to_set.getMonth() + 1);
        }
        let replaced_event_objs = [];
        for(let i = 0; i < 7; i++) {
            replaced_event_objs[i] = [];
            for (let j = 0; j < 5; j++) {
                replaced_event_objs[i][j] = 0;
            }
        }
        this.setState({
            event_objs: replaced_event_objs,
            date: date_to_set,
            dayRef: {}
        });
    }

    createEvent(object) {
        let state_copy = [...this.state.eventlist];
        state_copy.push(object);
        this.setState({eventlist: state_copy});
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