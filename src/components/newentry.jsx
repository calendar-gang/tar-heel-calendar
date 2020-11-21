import React, { Component } from 'react';
import AutoCompleteText from './autocomplete';
import AutoComplete from './autocomplete';
class NewEntry extends Component {

    constructor() {
        super()
        this.state = {
            view: "modal"
        }
    }

    toggleNewEntry(event) {
        event.persist();
        /// let edit_box = document.getElementById("login-box");
        if (this.state.view === "modal is-active") {
            this.setState({view: "modal"});
        } else {
            this.setState({view: "modal is-active"});
        }
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
                                <AutoCompleteText hold='426 Project Expo'></AutoCompleteText>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <label className="label" style={sulabel}>Location:</label>
                            <div className="control">
                            <AutoCompleteText hold='Virtual Sitterson'></AutoCompleteText>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <label className="label" style={sulabel}>Description:</label>
                            <div className="control">
                                <textarea class="textarea" style={inputval} placeholder="e.g. Hello world" placeholder="Present final project to class!"></textarea>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <label className="label" style={sulabel}>Date:</label>
                            <div className="control">
                                <input className="input" type="date" style={inputval}/>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <label className="label" style={sulabel}>Start Time:</label>
                            <div className="control">
                                <input className="input" type="time" style={inputval}/>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <label className="label" style={sulabel}>End Time:</label>
                            <div className="control">
                                <input className="input" type="time" style={inputval}/>
                            </div>
                        </div>
                    </div>
                    <footer className="modal-card-foot" style={header_style}>
                        <button className="button login" onClick={this.toggleNewEntry.bind(this)} style={center}>Create Event</button>
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