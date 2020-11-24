import React, { Component } from 'react';
import AutoCompleteText from './autocomplete';
import AutoComplete from './autocomplete';
import axios from '../../node_modules/axios/index.js';

class NewEntry extends Component {
    state = {}
    autoinfo = ["", ""]

    constructor(props) {
        super(props)
        this.state = {
            view: "modal",
            style: { backgroundColor: "white" },
            category: 0
        }

        this.formFields = { name: React.createRef(), location: React.createRef(), description: React.createRef(), date: React.createRef(), start: React.createRef(), end: React.createRef() }
        this.colors = { color1: React.createRef(), color2: React.createRef(), color3: React.createRef(), color4: React.createRef(), color5: React.createRef(), color6: React.createRef(), color7: React.createRef(), color8: React.createRef(), color9: React.createRef() }
    }

    toggleNewEntry() {
        /// let edit_box = document.getElementById("login-box");
        let ev = this.state.event
        let loc = this.state.loc
        if (this.state.view === "modal is-active") {
            this.setState({ view: "modal" });
        } else {
            this.setState({ view: "modal is-active" });
        }
    }

    _getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        else return ""

    }

    async _handleSubmit(event) {
        // let name = this.formFields.name.current.state.text
        let name = this.autoinfo[0]
        // let loc = this.formFields.location.current.state.text
        let loc = this.autoinfo[1]
        let date = this.formFields.date.current.value
        let des = this.formFields.description.current.value
        let start = this.formFields.start.current.value
        let end = this.formFields.end.current.value
        let category = this.state.category


        // access event category through this.state.category
        console.log(this.state.category)

        // validate fields and process dates for entry
        // eventually needs recurring fields and category
        // let startdate = '2020-11-10 12:30:00'
        let startdate = date + " " + start + ":00"
        // let enddate = '2020-11-11 12:30:00'
        let enddate = date + " " + end + ":00"
        let recurring = 'weekly'
        let reccuringuntil = '2020-12-11 12:30:00'


        if (this._getCookie("token") === "") {

            console.log("not logged in")
        } else {
            let res = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/makeevent',
                data: {
                    token: this._getCookie("token"),
                    title: name,
                    location: loc,
                    description: des,
                    start: startdate,
                    end: enddate,
                    recurring: recurring,
                    recurringuntil: reccuringuntil,
                    category: category
                }
            });
        }



        this.toggleNewEntry()

        /*
        This code is necessary to handle the submit feature of a new entry form
         */
        if (this.props.submit) {
            this.props.submit({
                date: date,
                start: parseFloat(start.split(":")[0]),
                smin: parseFloat(start.split(":")[1]),
                end: parseFloat(end.split(":")[0]),
                emin: parseFloat(end.split(":")[1]),
                name: name,
                location: loc,
                description: des,
                category: category
            });
        }

    }

    updateAutoValsEvent(value) {
        this.autoinfo[0] = value;
        // console.log(this.autoinfo[0])
    }

    updateAutoValsLoc(value) {
        this.autoinfo[1] = value;
    }

    updateColor(color) {
        console.log(color)
    }

    render() {
        const header_style = {
            backgroundColor: "#b5e3f8",
            height: "75px"

        }
        const center = {
            marginLeft: "240px"
        }

        const inputval = {
            margin: "10px",
            width: "300px"
        }

        const sulabel = {
            margin: "10px",
            marginLeft: "55px",
            width: "100px"
        }


        // <input className="input" type="text" placeholder="426 final expo" style={inputval}></input>
        // <input className="input" type="text" placeholder="Virtual Sitterson" style={inputval}></input> 

        return (
            <div>
                <a className="button is-light" onClick={this.toggleNewEntry.bind(this)}>New Event</a>
                <div className={this.state.view}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head" style={header_style}>
                            <p className="modal-card-title">New Event:</p>
                            <button onClick={this.toggleNewEntry.bind(this)} className="delete" aria-label="close"></button>
                        </header>
                        <div className="form modal-card-body">
                            <div className="field is-horizontal">
                                <label className="label" style={sulabel}>Event Name:</label>
                                <div className="control">
                                    <AutoCompleteText ref={this.formFields.name} hold='426 Project Expo' triggerParentUpdate={this.updateAutoValsEvent.bind(this)}></AutoCompleteText>
                                </div>
                                <div className="dropdown" style={{ width: "75px", marginTop: "10px", marginLeft: "10px" }}>
                                    <button className="dropbtn button" style={this.state.style}>Category</button>
                                    <div className="dropdown-content" style={{ marginLeft: "10px", width: "75px", height: "200px", overflow: "scroll" }}>
                                        <div className="box" style={{ backgroundColor: "#ffd4d4", width: "75px" }} onClick={() => this.setState({ style: { backgroundColor: "#ffd4d4" }, category: 0 })}></div>
                                        <div className="box" style={{ backgroundColor: "#ffe6d4", width: "75px" }} onClick={() => this.setState({ style: { backgroundColor: "#ffe6d4" }, category: 1 })}></div>
                                        <div className="box" style={{ backgroundColor: "#fffbd4", width: "75px" }} onClick={() => this.setState({ style: { backgroundColor: "#fffbd4" }, category: 2 })}></div>
                                        <div className="box" style={{ backgroundColor: "#e2ffd4", width: "75px" }} onClick={() => this.setState({ style: { backgroundColor: "#e2ffd4" }, category: 3 })}></div>
                                        <div className="box" style={{ backgroundColor: "#d4ffec", width: "75px" }} onClick={() => this.setState({ style: { backgroundColor: "#d4ffec" }, category: 4 })}></div>
                                        <div className="box" style={{ backgroundColor: "#d4f6ff", width: "75px" }} onClick={() => this.setState({ style: { backgroundColor: "#d4f6ff" }, category: 5 })}></div>
                                        <div className="box" style={{ backgroundColor: "#d4dfff", width: "75px" }} onClick={() => this.setState({ style: { backgroundColor: "#d4dfff" }, category: 6 })}></div>
                                        <div className="box" style={{ backgroundColor: "#f0d4ff", width: "75px" }} onClick={() => this.setState({ style: { backgroundColor: "#f0d4ff" }, category: 7 })}></div>
                                        <div className="box" style={{ backgroundColor: "#ffd4ee", width: "75px" }} onClick={() => this.setState({ style: { backgroundColor: "#ffd4ee" }, category: 8 })}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <label className="label" style={sulabel}>Location:</label>
                                <div className="control">
                                    <AutoCompleteText ref={this.formFields.location} hold='Virtual Sitterson' triggerParentUpdate={this.updateAutoValsLoc.bind(this)}></AutoCompleteText>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <label className="label" style={sulabel}>Description:</label>
                                <div className="control">
                                    <textarea ref={this.formFields.description} class="textarea" style={inputval} placeholder="e.g. Hello world" placeholder="Present final project to class!"></textarea>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <label className="label" style={sulabel}>Date:</label>
                                <div className="control">
                                    <input ref={this.formFields.date} className="input" type="date" style={inputval} />
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <label className="label" style={sulabel}>Start Time:</label>
                                <div className="control">
                                    <input ref={this.formFields.start} className="input" type="time" style={inputval} />
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <label className="label" style={sulabel}>End Time:</label>
                                <div className="control">
                                    <input ref={this.formFields.end} className="input" type="time" style={inputval} />
                                </div>
                            </div>
                        </div>
                        <footer className="modal-card-foot" style={header_style}>
                            <button className="button login" onClick={this._handleSubmit.bind(this)} style={center}>Create Event</button>
                        </footer>

                    </div>
                </div>
            </div>


        )
    }
}

export default NewEntry

