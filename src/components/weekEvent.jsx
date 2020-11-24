import React, { Component } from 'react';
import { BiCheck, BiX } from 'react-icons/bi';
import axios from '../../node_modules/axios/index.js';

class WeekEvent extends Component {
    state = {}
    catcolors = ["#ffd4d4", "#ffe6d4", "#fffbd4", "#e2ffd4", "#d4ffec", "#d4f6ff", "#d4dfff", "#f0d4ff", "#ffd4ee"]
    darkcatcolors = ["#cf4c4c", "#de813e", "#9e8600", "#54b027", "#2fa36f", "#3aa0bd", "#4d6fd6", "#9c52c4", "#bf5a97"]

    constructor(props) {
        super(props);

        this.state = {
            eventstate: this.props.eventstate,
            windowWidth: window.innerWidth,
            viewState: "normal",
            loggedIn: this._getCookie("token").length === 60,
            showEvent: true
        };

        this.eventBox = React.createRef()   // reference for hidden event details pop-up
        this.editBox = React.createRef()    // reference for hidden event edit pop-up
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

    // if in edit mode, will not toggle details box
    _toggleEventBox(event) {
        if (this.state.viewState !== "edit") {
            if (this.state.viewState === "normal") {
                this.eventBox.current.className = "box";
                this.state.viewState = "details";
            } else {
                this.eventBox.current.className = "is-hidden box";
                this.state.viewState = "normal";
            }
        }

    }

    _editMode(event) {
        this.state.viewState = "edit";

        this.eventBox.current.className = "is-hidden box"
        this.editBox.current.className = "box"
    }

    _toggleEdit(event) {
        event.preventDefault()
        this.state.viewState = "normal";
        this.eventBox.current.className = "box";
        this.editBox.current.className = "is-hidden box"
    }

    async _submitDelete() {

        if (this.state.loggedIn) {
            const results = await axios({
                method: 'delete',
                url: 'https://tar-heel-calendar.herokuapp.com/deleteevent',
                data: {
                    token: this._getCookie("token"),
                    id: this.state.eventstate.id
                }
            });

            if (results.data.message === "Deleted event.") {
                this.setState({ showEvent: !this.state.showEvent })

            }
        }

    }

    async _submitEdit(event) {
        this._toggleEdit(event)
        //window.alert("submitting")
        // all info for submit: 
        let name = this.formFields.name.current.value
        let loc = this.formFields.location.current.value
        let des = this.formFields.description.current.value
        let date = this.formFields.date.current.value
        let start = this.formFields.start.current.value
        let end = this.formFields.end.current.value

        let startdate = date + " " + start + ":00"
        let enddate = date + " " + end + ":00"

        if (this.state.loggedIn) {
            const results = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/editevent',
                data: {
                    token: this._getCookie("token"),
                    id: this.state.eventstate.id,
                    title: name,
                    location: loc,
                    description: des,
                    start: startdate,
                    end: enddate
                }
            });

            if (results.data.message === "Event edited.") {
                this.setState({
                    eventstate: {
                        id: this.state.eventstate.id,
                        date: date,
                        start: parseFloat(start.split(":")[0]),
                        smin: parseFloat(start.split(":")[1]),
                        end: parseFloat(end.split(":")[0]),
                        emin: parseFloat(end.split(":")[1]),
                        name: name,
                        location: loc,
                        description: des,
                        category: this.state.eventstate.category
                    }
                })
            }
        }

    }

    _getEventLength() {
        let start = this.state.eventstate.start
        let end = this.state.eventstate.end
        if (this.state.eventstate.start > 12) {
            start = start - 12
        }
        if (this.state.eventstate.end > 12) {
            end = end - 12
        }
        let ending = end + (this.state.eventstate.emin / 60)
        let starting = start + (this.state.eventstate.smin / 60)
        return ending - starting
    }


    _createEventBox() {
        let depth = `${60 + (this.state.eventstate.smin / 60) * 80}px`
        let marg = this.state.eventstate.day === 6 ? `${depth} 0px -50px 0px` : `${depth} 0px 0px 50px`;

        const event_style = {
            width: "200px",
            position: "absolute",
            height: "200px",
            margin: `${marg}`,
            zIndex: "1",
            padding: "10px"
        }
        return (
            <div ref={this.eventBox} className="is-hidden box" style={event_style}>
                <p className="has-text-left has-text-weight-semibold" style={{ fontSize: "15px", color: this.darkcatcolors[this.state.eventstate.category % 9] }}>{this.state.eventstate.name}</p>
                <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.state.eventstate.category % 9] }}>{this._findHour(this.state.eventstate.start, this.state.eventstate.smin)} - {this._findHour(this.state.eventstate.end, this.state.eventstate.emin)}</p>
                <hr className="hr" style={{ margin: "2px" }}></hr>
                <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.state.eventstate.category % 9] }}>{this.state.eventstate.location}</p>
                <hr className="hr" style={{ margin: "2px" }}></hr>
                <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.state.eventstate.category % 9] }}>{this.state.eventstate.description}</p>
            </div>

        )
    }

    _getTime(hour, mins) {
        if (hour < 10) {
            hour = "0" + hour
        }
        if (mins < 10) {
            mins = "0" + mins
        }
        return hour + ":" + mins
    }

    _createEditBox() {
        let depth = `${60 + (this.state.eventstate.smin / 60) * 80}px`
        let marg = this.state.eventstate.day === 6 ? `${depth} 0px -50px 0px` : `${depth} 0px 0px 50px`;

        const event_style = {
            width: "200px",
            position: "absolute",
            margin: `${marg}`,
            zIndex: "1",
            padding: "10px"
        }

        let defaultstart = this._getTime(this.state.eventstate.start, this.state.eventstate.smin)
        let defaultend = this._getTime(this.state.eventstate.end, this.state.eventstate.emin)


        return (
            <div ref={this.editBox} className="is-hidden box" style={event_style}>
                <form>
                    <input className="input" ref={this.formFields.name} defaultValue={`${this.state.eventstate.name}`} type="text" style={{ fontSize: "13px", color: this.darkcatcolors[this.state.eventstate.category % 9] }}></input>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <input className="input" ref={this.formFields.location} defaultValue={`${this.state.eventstate.location}`} type="text" style={{ fontSize: "13px", color: this.darkcatcolors[this.state.eventstate.category % 9] }}></input>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <textarea className="input" ref={this.formFields.description} type="text" style={{ fontSize: "13px", height: "75px", color: this.darkcatcolors[this.state.eventstate.category % 9] }}>{`${this.state.eventstate.description}`}</textarea>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <input ref={this.formFields.date} className="input" defaultValue={`${this.state.eventstate.date}`} type="date" style={{ fontSize: "13px", height: "30px", color: this.darkcatcolors[this.state.eventstate.category % 9] }} />
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <input className="input" ref={this.formFields.start} defaultValue={`${defaultstart}`} type="time" style={{ height: "30px", color: this.darkcatcolors[this.state.eventstate.category % 9] }} />
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <input className="input" ref={this.formFields.end} defaultValue={`${defaultend}`} type="time" style={{ height: "30px", color: this.darkcatcolors[this.state.eventstate.category % 9] }} />
                    <button className="button" style={{ fontSize: "10px", marginTop: "5px" }} onClick={this._submitEdit.bind(this)}><BiCheck /></button>
                    <button className="button" style={{ fontSize: "10px", marginTop: "5px" }} onClick={this._toggleEdit.bind(this)}><BiX /></button>

                </form>
            </div>
        )
    }

    _findHour(hour, minutes) {
        if (hour < 12) {
            if (hour === 0) {
                return minutes === 0 ? "12 AM" : `12:${minutes < 10 ? `0${minutes}` : minutes} AM`
            } else {
                return minutes === 0 ? `${hour} AM` : `${hour}:${minutes < 10 ? `0${minutes}` : minutes} AM`
            }
        } else {
            if (hour % 12 === 0) {
                return minutes === 0 ? "12 PM" : `12:${minutes < 10 ? `0${minutes}` : minutes} PM`
            } else {
                return minutes === 0 ? `${hour % 12} PM` : `${hour % 12}:${minutes < 10 ? `0${minutes}` : minutes} PM`
            }

        }
    }

    render() {
        const event_style = {
            width: `${(this.state.windowWidth - 250) / 8}px`,
            position: "absolute",
            height: `${(this._getEventLength()) * 80}px`,
            backgroundColor: this.catcolors[this.state.eventstate.category % 9],
            margin: `${(this.state.eventstate.smin / 60) * 80}px 0px 0px 0px`,
            padding: "10px"
        }



        if (this.state.showEvent) {
            return (
                <div>
                    <div style={event_style} className="box week-event" onMouseEnter={this._toggleEventBox.bind(this)} onMouseLeave={this._toggleEventBox.bind(this)} onDoubleClick={this._editMode.bind(this)}>
                        <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.state.eventstate.category % 9] }}>{this._findHour(this.state.eventstate.start, this.state.eventstate.smin)} - {this._findHour(this.state.eventstate.end, this.state.eventstate.emin)}<a onClick={this._submitDelete.bind(this)} style={{ float: "right" }} class="delete is-small"></a></p>
                        <p className="has-text-left has-text-weight-semibold" style={{ fontSize: "15px", color: this.darkcatcolors[this.state.eventstate.category % 9] }}>{this.state.eventstate.name}</p>
                    </div>
                    { this._createEventBox()}
                    {this._createEditBox()}
                </div >


            )
        } else {
            return (
                <div></div>
            )
        }


    }
}

export default WeekEvent;