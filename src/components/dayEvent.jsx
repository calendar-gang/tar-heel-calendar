import React, { Component } from 'react';
import { BiCheck, BiX } from 'react-icons/bi';
import axios from '../../node_modules/axios/index.js';

class DayEvent extends Component {
    state = {}
    catcolors = ["#ffd4d4", "#ffe6d4", "#fffbd4", "#e2ffd4", "#d4ffec", "#d4f6ff", "#d4dfff", "#f0d4ff", "#ffd4ee"]
    darkcatcolors = ["#cf4c4c", "#de813e", "#9e8600", "#54b027", "#2fa36f", "#3aa0bd", "#4d6fd6", "#9c52c4", "#bf5a97"]

    constructor(props) {
        super(props);

        this.state = { windowWidth: window.innerWidth, loggedIn: this._getCookie("token").length === 60 };

        this.eventBox = React.createRef()
        this.formFields = { name: React.createRef(), location: React.createRef(), description: React.createRef(), date: React.createRef(), start: React.createRef(), end: React.createRef() }
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    _getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        else return ""

    }


    _toggleEventBox(event) {
        // I think we may just want to display all event info on a day event since it is pretty big?

        if (this.eventBox.current.className === "is-hidden box") {
            this.eventBox.current.className = "box";
        } else {
            this.eventBox.current.className = "is-hidden box";
        }
    }

    deleteEdit(event) {
        this._toggleEventBox(event)

    }

    async submitEdit(event) {
        this._toggleEventBox(event)
        let name = this.formFields.name.current.value
        let loc = this.formFields.location.current.value
        let des = this.formFields.description.current.value
        let date = this.formFields.date.current.value
        let start = this.formFields.start.current.value
        let end = this.formFields.end.current.value

        let startdate = date + " " + start + ":00"
        let enddate = date + " " + end + ":00"

        console.log(name)
        console.log(loc)
        console.log(des)
        console.log(startdate)
        console.log(enddate)

        if (this.state.loggedIn) {
            const results = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/editevent',
                data: {
                    token: this._getCookie("token"),
                    id: this.props.eventstate.id,
                    title: name,
                    location: loc,
                    description: des,
                    start: startdate,
                    end: enddate
                }
            });

            if (results.data.message === "Event edited.") {
                console.log("success from day!!")
                // this.render()
            }
        }
    }


    _createEventBox() {
        const event_style = {
            width: `${(this.state.windowWidth / 2.5)}px`,
            position: "absolute",
            height: `${(this._getEventLength()) * 80}px`,
            backgroundColor: this.catcolors[this.props.eventstate.category % 9],
            margin: `${(this.props.eventstate.smin / 60) * 80}px 0px 0px 0px`,
            zIndex: "1",
            overflow: "scroll"
        }

        let defaultstart = this.props.eventstate.start + ":" + this.props.eventstate.smin
        let defaultend = this.props.eventstate.end + ":" + this.props.eventstate.emin
        if (defaultstart.length == 4) {
            if (defaultstart.split(":")[0].length == 1) {
                defaultstart = 0 + defaultstart
            } else {
                defaultstart = defaultstart + 0
            }
        }
        if (defaultend.length == 4) {
            if (defaultend.split(":")[0].length == 1) {
                defaultend = 0 + defaultend
            } else {
                defaultend = defaultend + 0
            }
        }

        return (
            <div ref={this.eventBox} className="is-hidden box" style={event_style}>
                <div className="level">
                    <div className="level-left">
                        <input className="input" ref={this.formFields.name} defaultValue={`${this.props.eventstate.name}`} type="text" style={{ fontSize: "15px", fontWeight: "bolder", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }}></input>
                    </div>
                    <div className="level-right">
                        <button className="button" style={{ fontSize: "10px" }} onClick={this.submitEdit.bind(this)}><BiCheck /></button>
                        <button className="button" style={{ fontSize: "10px" }} onClick={this.deleteEdit.bind(this)}><BiX /></button>

                    </div>
                </div>
                <hr className="hr" style={{ margin: "4px" }}></hr>
                <input className="input" ref={this.formFields.location} defaultValue={`${this.props.eventstate.location}`} type="text" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }}></input>
                <hr className="hr" style={{ margin: "4px" }}></hr>
                <textarea className="input" ref={this.formFields.description} defaultValue={`${this.props.eventstate.description}`} type="text" style={{ height: "75px", fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }}></textarea>
                <hr className="hr" style={{ margin: "4px" }}></hr>
                <input className="input" ref={this.formFields.date} defaultValue={`${this.props.eventstate.date}`} type="date" style={{ height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }} />
                <hr className="hr" style={{ margin: "2px" }}></hr>
                <input className="input" ref={this.formFields.start} type="time" defaultValue={`${defaultstart}`} style={{ height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }} />
                <hr className="hr" style={{ margin: "2px" }}></hr>
                <input className="input" ref={this.formFields.end} type="time" defaultValue={`${defaultend}`} style={{ height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }} />

            </div>

        )
    }

    _getEventLength() {
        let ending = this.props.eventstate.end + (this.props.eventstate.emin / 60)
        let starting = this.props.eventstate.start + (this.props.eventstate.smin / 60)
        return ending - starting
    }

    _findHour(hour, minutes) {
        if (hour < 12) {
            if (hour === 0) {
                return minutes === 0 ? "12 AM" : `12:${minutes} AM`
            } else {
                return minutes === 0 ? `${hour} AM` : `${hour}:${minutes} AM`
            }
        } else {
            if (hour % 12 === 0) {
                return minutes === 0 ? "12 PM" : `12:${minutes} PM`
            } else {
                return minutes === 0 ? `${hour % 12} PM` : `${hour % 12}:${minutes} PM`
            }

        }
    }


    render() {
        const event_style = {
            width: `${(this.state.windowWidth / 2.5)}px`,
            position: "absolute",
            height: `${(this._getEventLength()) * 80}px`,
            backgroundColor: this.catcolors[this.props.eventstate.category % 9],
            margin: `${(this.props.eventstate.smin / 60) * 80}px 0px 0px 0px`,
            overflow: "scroll"
        }


        return (
            <div>
                <div style={event_style} className="box" onDoubleClick={this._toggleEventBox.bind(this)}>
                    <div className="level">
                        <div className="level-left">
                            <p className="has-text-left has-text-weight-semibold" style={{ fontSize: "15px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.name}</p>
                        </div>
                        <div className="level-right">
                            <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this._findHour(this.props.eventstate.start, this.props.eventstate.smin)} - {this._findHour(this.props.eventstate.end, this.props.eventstate.emin)}</p>
                        </div>
                    </div>
                    <hr className="hr" style={{ margin: "4px" }}></hr>
                    <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.location}</p>
                    <hr className="hr" style={{ margin: "4px" }}></hr>
                    <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.description}</p>

                </div>
                {this._createEventBox()}
            </div>


        )
    }
}

export default DayEvent;

// get check and x going on day, get default vals on week