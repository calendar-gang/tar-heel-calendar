import React, { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { BiCheck, BiX } from 'react-icons/bi';

class MonthEvent extends Component {
    state = {}
    catcolors = ["#ffd4d4", "#ffe6d4", "#fffbd4", "#e2ffd4", "#d4ffec", "#d4f6ff", "#d4dfff", "#f0d4ff", "#ffd4ee"]
    darkcatcolors = ["#cf4c4c", "#de813e", "#9e8600", "#54b027", "#2fa36f", "#3aa0bd", "#4d6fd6", "#9c52c4", "#bf5a97"]

    constructor(props) {
        super(props);

        this.state = { 
            windowWidth: window.innerWidth,
            showEvent: true 
        };

        this.eventBox = React.createRef()   // reference for hidden event details pop-up
        this.editBox = React.createRef()    // reference for hidden event edit pop-up
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth, viewState: "normal" });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
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

    _findHour(time) {
        if (time < 12) { return time === 0 ? "12 AM" : time + " AM" }
        else { return (time % 12) === 0 ? "12 PM" : (time % 12) + " PM" }
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
                    <p className="has-text-left" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{this._findHour(this.props.eventstate.start)} - {this._findHour(this.props.eventstate.end)}</p>
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
        return (
            <div ref={this.editBox} className="is-hidden box monthevent" style={event_style}>
                <form>
                    <textarea className="input" type="text" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{`${this.props.eventstate.name}`}</textarea>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <textarea className="input" type="text" style={{  fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{`${this._findHour(this.props.eventstate.start)} - ${this._findHour(this.props.eventstate.end)}`}</textarea>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <textarea className="input" type="text" style={{ fontSize: "13px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{`${this.props.eventstate.location}`}</textarea>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <textarea className="input" type="text" style={{fontSize: "13px", height: "75px", color: this.darkcatcolors[this.props.eventstate.category % 9] }}>{`${this.props.eventstate.description}`}</textarea>
                    <hr className="hr" style={{ margin: "2px" }}></hr>
                    <input className="input" type="time" style={{height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9]}}/>
                    <hr className="hr" style={{ margin: "2px"}}></hr>
                    <input className="input" type="time" style={{height: "30px", color: this.darkcatcolors[this.props.eventstate.category % 9]}}/>
                    <button className="button" style={{ fontSize: "10px", marginTop: "5px"}}><BiCheck /></button>
                    <button className="button" style={{ fontSize: "10px" , marginTop: "5px"}}><BiX /></button>
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
                        <p className="has-text-centered is-size-7">{this.props.eventstate.name} <a onClick={() => {this.setState({showEvent: !this.state.showEvent})}} style={{float: "right"}} class="delete is-small"></a> </p>
                        
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