import React, { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { BiCheck, BiX } from 'react-icons/bi';
import axios from '../../node_modules/axios/index.js';

class MonthEvent extends Component {
    state = {}
    catcolors = ["#ffd4d4", "#ffe6d4", "#fffbd4", "#e2ffd4", "#d4ffec", "#d4f6ff", "#d4dfff", "#f0d4ff", "#ffd4ee"]
    darkcatcolors = ["#cf4c4c", "#de813e", "#9e8600", "#54b027", "#2fa36f", "#3aa0bd", "#4d6fd6", "#9c52c4", "#bf5a97"]

    constructor(props) {
        super(props);

        this.state = {
            windowWidth: window.innerWidth,
            showEvent: true,
            loggedIn: this._getCookie("token").length === 60
        };

        this.eventBox = React.createRef()   // reference for hidden event details pop-up
        this.editBox = React.createRef()    // reference for hidden event edit pop-up
        this.formFields = { name: React.createRef(), location: React.createRef(), description: React.createRef(), date: React.createRef(), start: React.createRef(), end: React.createRef() }
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth, viewState: "normal" });
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
        if (this.state.viewState != "edit") {
            if (this.state.viewState === "normal") {
                this.eventBox.current.className = "box monthevent is-hidden";
                this.state.viewState = "details";
            } else {
                this.eventBox.current.className = "box monthevent";
                this.state.viewState = "normal";
            }
        }
    }

    _editMode(event) {
        this.state.viewState = "edit";

        this.eventBox.current.className = "is-hidden box monthevent"
        this.editBox.current.className = "box monthevent"
    }


    _toggleEdit(event) {
        event.preventDefault()
        this.state.viewState = "details";
        this.eventBox.current.className = "box monthevent";
        this.editBox.current.className = "is-hidden box monthevent"
    }

    async _submitEdit(event) {
        this._toggleEdit(event)
        window.alert("submitting")
        // all info for submit: 
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
            console.log(results)

            if (results.data.message === "Event edited.") {
                console.log("success!!")
                // this.render()
            }
        }

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

    _createEventBox() {
        const event_style = {
            width: "200px",
            position: "absolute",
            height: "200px",
            margin: "5px 0px 0px 50px",
            zIndex: "1",
        }

        return (
            <div ref={this.eventBox} className="is-hidden box monthevent" style={event_style} >
                <header className="card-head">
                    <p className="has-text-left has-text-weight-semibold" style={{ fontSize: "15px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.name}</p>
                    <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this._findHour(this.props.eventstate.start, this.props.eventstate.smin)} - {this._findHour(this.props.eventstate.end, this.props.eventstate.emin)}</p>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.location}</p>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.description}</p>
                </header>
            </div>
        )
    }

    _createEditBox() {
        const event_style = {
            width: "200px",
            position: "absolute",
            margin: "10px 0px 0px 50px",
            zIndex: "1",
        }
        let defaultstart = this.props.eventstate.start + ":" + this.props.eventstate.smin
        // console.log(defaultstart)
        let defaultend = this.props.eventstate.end + ":" + this.props.eventstate.emin
        // console.log(this.props.eventstate.start + ":" + this.props.eventstate.smin)
        let defaultdate = this.props.eventstate.date.split("-")[2] + "-" + this.props.eventstate.date.split("-")[0] + "-" + this.props.eventstate.date.split("-")[1]

        if (defaultstart.length == 4) {
            defaultstart = 0 + defaultstart
        }
        if (defaultend.length == 4) {
            defaultend = 0 + defaultend
        }



        return (
            <div ref={this.editBox} className="is-hidden box monthevent" style={event_style}>
                <form>

                    <input className="input" ref={this.formFields.name} defaultValue={`${this.props.eventstate.name}`} type="text" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}></input>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <input className="input" ref={this.formFields.location} defaultValue={`${this.props.eventstate.location}`} type="text" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}></input>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <textarea className="input" ref={this.formFields.description} type="text" style={{ fontSize: "13px", height: "75px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{`${this.props.eventstate.description}`}</textarea>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <input ref={this.formFields.date} className="input" defaultValue={`${defaultdate}`} type="date" style={{ fontSize: "13px", height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9] }} />
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <input className="input" ref={this.formFields.start} type="time" defaultValue={`${defaultstart}`} style={{ fontSize: "13px", height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9] }} />
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <input className="input" ref={this.formFields.end} defaultValue={`${defaultend}`} type="time" style={{ fontSize: "13px", height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9] }} />
                    <button className="button" style={{ fontSize: "10px", marginTop: "5px" }} onClick={this._submitEdit.bind(this)}><BiCheck /></button>
                    <button className="button" style={{ fontSize: "10px", marginTop: "5px" }} onClick={this._toggleEdit.bind(this)}><BiX /></button>
                </form>
            </div>
        )
    }

    render() {
        const event_style = {
            width: `${(this.state.windowWidth - 250) / 8}px`,
            position: "relative",
            height: `20px`,
            backgroundColor: this.catcolors[this.props.eventstate.category % 9],
            margin: "0px 0px 0px 25px",
            padding: "1px"
        }

        const after_content = {
            "&::after": {
                width: "20px",
                height: "20px",
                transform: "rotate(-45deg)",
                background: "#fff",
                position: "absolute",
                boxShadow: "1px 4px 8px rgba(99, 99, 99, 0.5)",
                zIndex: "-1",
                top: "-10px",
                left: "calc(50% - 10px)"
            }
        }

        if (this.state.showEvent) {
            return (
                <div>
                    <div style={event_style} content={after_content} className="box" onMouseEnter={this._toggleEventBox.bind(this)} onMouseLeave={this._toggleEventBox.bind(this)} onDoubleClick={this._editMode.bind(this)}>
                        <p className="has-text-centered is-size-7">{this.props.eventstate.name} <a onClick={() => { this.setState({ showEvent: !this.state.showEvent }) }} style={{ float: "right" }} class="delete is-small"></a> </p>

                    </div>

                    {this._createEventBox()}
                    {this._createEditBox()}
                </div>


            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default MonthEvent;