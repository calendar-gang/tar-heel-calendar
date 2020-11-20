import React, { Component } from 'react';

class WeekEvent extends Component {
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

        if (this.eventBox.current.className === "is-hidden box") {
            this.eventBox.current.className = "box";
        } else {
            this.eventBox.current.className = "is-hidden box";
        }
    }

    _createEventBox() {
        const event_style = {
            width: "200px",
            position: "absolute",
            height: "200px",
            margin: "60px 0px 0px 50px",
            zIndex: "1"
        }


        return (
            <div ref={this.eventBox} className="is-hidden box" style={event_style}>
                <header className="card-head">
                    <p className="card-title">Here is this event!</p>
                </header>

            </div>

        )
    }

    /*toggleEventEditBox(event) {
        event.persist();
        let td = event.nativeEvent.path[0];
        let edit_box = document.getElementById("edit-box");
        let content = document.getElementById("edit-box-content");
        if (edit_box.className === "modal is-active") {
            edit_box.className = "modal";
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
        } else {
            edit_box.className = "modal is-active";
            let task = document.createElement("p");
            task.innerHTML = td.innerHTML;
            content.append(task);
        }
    }
    
    createEventEditBox() {
        return (
            <div id="edit-box" className="modal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Edit this task!</p>
                        <button onClick={this.toggleEditBox} className="delete" aria-label="close"></button>
                    </header>
                    <section id="edit-box-content" className="modal-card-body">
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-warning">Edit</button>
                        <button className="button is-success">Save changes</button>
                        <button onClick={this.toggleEditBox} className="button">Cancel</button>
                    </footer>
                </div>
            </div>
    
        )
    }*/

    _findHour(time) {
        if (time < 12) { return time === 0 ? "12 AM" : time + " AM" }
        else { return (time % 12) === 0 ? "12 PM" : (time % 12) + " PM" }

    }

    _findTime(time) {
        return this._findHour(time)

    }


    render() {
        const event_style = {
            width: `${(this.state.windowWidth - 250) / 8}px`,
            position: "absolute",
            height: `${(this.props.eventstate.end - this.props.eventstate.start) * 80}px`,
            backgroundColor: this.catcolors[this.props.eventstate.category % 9],
            margin: "0px",
            padding: "10px"
        }

        return (
            <div>
                <div style={event_style} className="box week-event" /*onDoubleClick={this.toggleEventEditBox}*/ onClick={this._toggleEventBox.bind(this)}>
                    <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this._findTime(this.props.eventstate.start)} - {this._findTime(this.props.eventstate.end)}</p>
                    <p className="has-text-left has-text-weight-semibold" style={{ fontSize: "15px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this.props.eventstate.name}</p>
                </div>
                {this._createEventBox()}
            </div>


        )
    }
}

export default WeekEvent;