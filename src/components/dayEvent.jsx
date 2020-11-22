import React, { Component } from 'react';
import { BiCheck, BiX } from 'react-icons/bi';

class DayEvent extends Component {
    state = {}
    catcolors = ["#ffd4d4", "#ffe6d4", "#fffbd4", "#e2ffd4", "#d4ffec", "#d4f6ff", "#d4dfff", "#f0d4ff", "#ffd4ee"]
    darkcatcolors = ["#cf4c4c", "#de813e", "#9e8600", "#54b027", "#2fa36f", "#3aa0bd", "#4d6fd6", "#9c52c4", "#bf5a97"]

    constructor(props) {
        super(props);

        this.state = { windowWidth: window.innerWidth };

        this.eventBox = React.createRef()
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }


    _toggleEventBox(event) {
        // I think we may just want to display all event info on a day event since it is pretty big?

        if (this.eventBox.current.className === "is-hidden box") {
            this.eventBox.current.className = "box";
        } else {
            this.eventBox.current.className = "is-hidden box";
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
        // console.log(defaultstart)
        let defaultend = this.props.eventstate.end + ":" + this.props.eventstate.emin
        // console.log(this.props.eventstate.start + ":" + this.props.eventstate.smin)
        // let defaultdate = this.props.eventstate.date.split("-")[2] + "-" + this.props.eventstate.date.split("-")[0] + "-" + this.props.eventstate.date.split("-")[1]

        if (defaultstart.length == 4) {
            defaultstart = 0 + defaultstart
        }
        if (defaultend.length == 4) {
            defaultend = 0 + defaultend
        }

        return (
            <div ref={this.eventBox} className="is-hidden box" style={event_style}>
                <div className="level">
                    <div className="level-left">
                        <input className="input" defaultValue={`${this.props.eventstate.name}`} type="text" style={{ fontSize: "15px", fontWeight: "bolder", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }}></input>
                    </div>
                    <div className="level-right">
                        <button className="button" style={{ fontSize: "10px" }}><BiCheck /></button>
                        <button className="button" style={{ fontSize: "10px" }}><BiX /></button>

                    </div>
                </div>
                <hr className="hr" style={{ margin: "4px" }}></hr>
                <input className="input" defaultValue={`${this.props.eventstate.location}`} type="text" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }}></input>
                <hr className="hr" style={{ margin: "4px" }}></hr>
                <textarea className="input" defaultValue={`${this.props.eventstate.description}`} type="text" style={{ height: "75px", fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }}></textarea>
                <hr className="hr" style={{ margin: "4px" }}></hr>
                <input className="input" ref={this.formFields.end} defaultValue={`${this.props.eventstate.date}`} type="time" style={{ height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }}/>
                <hr className="hr" style={{ margin: "2px"}}></hr>
                <input className="input" type="time" defaultValue={`${defaultstart}`}  style={{ height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }} />
                <hr className="hr" style={{ margin: "2px" }}></hr>
                <input className="input" type="time" defaultValue={`${defaultend}`} style={{ height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9], backgroundColor: this.catcolors[this.props.eventstate.category % 9] }} />         
                
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