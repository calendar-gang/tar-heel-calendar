import React, { Component } from 'react';
import AutoCompleteText from './autocomplete';
import AutoComplete from './autocomplete';
import axios from '../../node_modules/axios/index.js';

class NewEntry extends Component {

    constructor() {
        super()
        this.state = {
            view: "modal"
        }

        this.formFields = { name: React.createRef(), location: React.createRef(), description: React.createRef(), date: React.createRef(), start: React.createRef(), end: React.createRef() }
    }

    toggleNewEntry() {
        /// let edit_box = document.getElementById("login-box");
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
        let name = this.formFields.name.current.state.text
        let loc = this.formFields.location.current.state.text
        let date = this.formFields.date.current.value
        let des = this.formFields.description.current.value
        let start = this.formFields.start.current.value
        let end = this.formFields.end.current.value

        // validate fields and process dates for entry
        // eventually needs recurring fields and category
        let startdate = '2020-11-10 12:30:00'
        let enddate = '2020-11-11 12:30:00'
        let recurring = 'weekly'
        let reccuringuntil = '2020-12-11 12:30:00'
        let category = 'school'

        // will then query here

        /*if (this._getCookie("token") == "") {
            console.log("not logged in")
        } else {
            let tok = this._getCookie("token")
            let res = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/makeevent',
                data: {
                    token: tok,
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


    }*/



        this.toggleNewEntry()
        this.props.submit({ 
                date: date,
                start: 2, 
                end: 4, 
                name: name, 
                location: loc, 
                description: des, 
                category: 1 
            });
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
                                    <AutoCompleteText ref={this.formFields.name} hold='426 Project Expo'></AutoCompleteText>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <label className="label" style={sulabel}>Location:</label>
                                <div className="control">
                                    <AutoCompleteText ref={this.formFields.location} hold='Virtual Sitterson'></AutoCompleteText>
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

// Name
// Description 
// Start time 
// End time 
// Date 
// Category