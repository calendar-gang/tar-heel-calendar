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
            height: `${(this.props.eventstate.end - this.props.eventstate.start) * 80}px`,
            backgroundColor: this.catcolors[this.props.eventstate.category % 9],
            zIndex: "1"
        }

        return (
            <div ref={this.eventBox} className="is-hidden box" style={event_style}>
                <div className="level">
                    <div className="level-left">
                        <input className="input" type="text" placeholder={`${this.props.eventstate.name}`} style={{ fontSize: "15px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}></input>
                    </div>
                    <div className="level-right">
                        <button style={{ fontSize: "10px" }}><BiCheck /></button>
                        <button style={{ fontSize: "10px" }}><BiX /></button>

                    </div>
                </div>
                <input className="input" type="text" placeholder={`${this._findHour(this.props.eventstate.start)} - ${this._findHour(this.props.eventstate.end)}`} style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}></input>
                <hr className="hr" style={{ margin: "4px" }}></hr>
                <input className="input" type="text" placeholder={`${this.props.eventstate.location}`} style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}></input>
                <hr className="hr" style={{ margin: "4px" }}></hr>
                <input className="input" type="text" placeholder={`${this.props.eventstate.description}`} style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}></input>


            </div>

        )
    }

    _findHour(time) {
        if (time < 12) { return time === 0 ? "12 AM" : time + " AM" }
        else { return (time % 12) === 0 ? "12 PM" : (time % 12) + " PM" }

    }


    render() {
        const event_style = {
            width: `${(this.state.windowWidth / 2.5)}px`,
            position: "absolute",
            height: `${(this.props.eventstate.end - this.props.eventstate.start) * 80}px`,
            backgroundColor: this.catcolors[this.props.eventstate.category % 9],
            margin: "0px",
        }

        return (
            <div>
                <div style={event_style} className="box" onDoubleClick={this._toggleEventBox.bind(this)}>
                    <div className="level">
                        <div className="level-left">
                            <p className="has-text-left has-text-weight-semibold" style={{ fontSize: "15px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.name}</p>
                        </div>
                        <div className="level-right">
                            <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this._findHour(this.props.eventstate.start)} - {this._findHour(this.props.eventstate.end)}</p>
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