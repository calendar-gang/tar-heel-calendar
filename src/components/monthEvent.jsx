import React, { Component } from 'react';

class MonthEvent extends Component {
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

        if (this.eventBox.current.className === "is-hidden box monthevent") {
            this.eventBox.current.className = "box monthevent";
        } else {
            this.eventBox.current.className = "is-hidden box monthevent";
        }
    }

    _findHour(time) {
        if (time < 12) { return time === 0 ? "12 AM" : time + " AM" }
        else { return (time % 12) === 0 ? "12 PM" : (time % 12) + " PM" }

    }

    _findTime(time) {
        return this._findHour(time)

    }

    _createEventBox() {
        const event_style = {
            width: "200px",
            position: "absolute",
            height: "200px",
            margin: "30px 0px 0px 50px",
            zIndex: "1",
        }


        // backgroundColor: this.catcolors[this.props.eventstate.category % 9],

        return (
            <div ref={this.eventBox} className="is-hidden box monthevent" style={event_style} >
                <header className="card-head">
                    <p className="has-text-left has-text-weight-semibold" style={{ fontSize: "15px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.name}</p>
                    <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this._findTime(this.props.eventstate.start)} - {this._findTime(this.props.eventstate.end)}</p>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.location}</p>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.description}</p>
                </header>
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

        return (
            <div>
                <div style={event_style} content={after_content} className="box" onClick={this._toggleEventBox.bind(this)}>
                    <p className="has-text-centered is-size-7">{this.props.eventstate.name}</p>
                </div>
                {this._createEventBox()}
            </div>


        )
    }
}

export default MonthEvent;