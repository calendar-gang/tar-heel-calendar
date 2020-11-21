import React, { Component } from 'react';
import '../App.css'
import axios from '../../node_modules/axios/index.js';

class NavBar extends Component {
    state = {};

    constructor(props) {
        super(props);

        this.SUBfields = { fname: React.createRef(), lname: React.createRef(), email: React.createRef(), username: React.createRef(), password: React.createRef() };
        this.SIfields = { username: React.createRef(), password: React.createRef() }
    }

    toggleSUBox(event) {
        event.persist();
        let edit_box = document.getElementById("signup-box");
        if (edit_box.className === "modal is-active") {
            edit_box.className = "modal";
        } else {
            edit_box.className = "modal is-active";
        }
    }

    checkpassword(pword) {
        // checks to make sure passowrd is between 8 and 100 chars, 
        // contains at least one lowercase letter, one uppercase letter, 
        // one numeric digit, and one special character
        let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/;
        if (decimal.test(pword)) {
            return true;
        } else {
            return false;
        }
    }

    clickMe(event) {
        let pword = this.SUBfields.password.value
        let valid = this.checkpassword(pword)
        let fname = this.SUBfields.fname.value
        let lname = this.SUBfields.lname.value
        let uname = this.SUBfields.username.value
        let email = this.SUBfields.email.value
        if (valid && fname.length > 0 && lname.length > 0 && uname.length > 0 && email.length > 4) {
            console.log("made it to submit valid")
            this._submitValidatedNewUser(uname, email, fname, lname, pword)
            this.toggleSUBox(event)
        } else {
            window.alert("Invalid input field, please try again.")
        }
    }

    async _submitValidatedNewUser(uname, email, fname, lname, pword) {
        console.log("made it in submit valid")
        let res = await axios.post('tar-heel-calendar.herokuapp.com/register', {
            username: uname,
            email: email,
            firstname: fname,
            lastname: lname,
            password: pword
        });
        console.log(res)
    }

    renderSignUp() {
        const header_style = {
            backgroundColor: "#b5e3f8",
            height: "75px"
        }
        const center = {
            left: "265px"
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

        return (
            <div id="signup-box" className="modal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head" style={header_style}>
                        <p className="modal-card-title">Welcome new user! Create an account below:</p>
                        <button onClick={this.toggleSUBox} className="delete" aria-label="close"></button>
                    </header>
                    <div className="form modal-card-body">
                        <div className="field is-horizontal">
                            <label className="label sulabel" style={sulabel}>First Name:</label>
                            <div className="control">
                                <input className="input" id="fninput" ref={this.SUBfields.fname} type="text" placeholder="John" style={inputval}></input>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <label className="label sulabel" style={sulabel}>Last Name:</label>
                            <div className="control">
                                <input className="input" type="text" ref={this.SUBfields.lname} placeholder="Doe" style={inputval}></input>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <label className="label sulabel" style={sulabel}>Email:</label>
                            <div className="control">
                                <input className="input" type="text" ref={this.SUBfields.email} placeholder="johndoe@live.unc.edu" style={inputval}></input>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <label className="label sulabel" style={sulabel}>Username:</label>
                            <div className="control">
                                <input className="input" ref={this.SUBfields.username} type="text" placeholder="johndoughboy33" style={inputval}></input>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <label className="label sulabel" style={sulabel}>Password:</label>
                            <div className="control">
                                <input className="input" ref={this.SUBfields.passname} type="text" placeholder="SuperSecretP@ssw0rd" style={inputval}></input>
                            </div>
                        </div>
                        <p>Note: Passwords must be at least 8 characters long and include at least one of each of the following:
                        uppercase letter, lowercase letter, special character, and a number!
                            </p>
                    </div>
                    <footer className="modal-card-foot" style={header_style}>
                        <button className="button signup" id="signupbutton" onClick={this.clickMe.bind(this)} style={center}>Sign Up</button>
                    </footer>
                </div>
            </div>


        )
    }

    toggleLoginBox(event) {
        event.persist();
        let edit_box = document.getElementById("login-box");
        if (edit_box.className === "modal is-active") {
            edit_box.className = "modal";
        } else {
            edit_box.className = "modal is-active";
        }
    }

    renderLogin() {
        const header_style = {
            backgroundColor: "#b5e3f8",
            height: "75px"

        }
        const center = {
            left: "275px"
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

        return (

            <div id="login-box" className="modal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head" style={header_style}>
                        <p className="modal-card-title">Let's Get Productive!</p>
                        <button onClick={this.toggleLoginBox} className="delete" aria-label="close"></button>
                    </header>
                    <div className="form modal-card-body" style={{ height: "200px" }}>
                        <div className="field is-horizontal">
                            <label className="label" style={sulabel}>Username:</label>
                            <div className="control">
                                <input className="input" ref={this.SIfields.username} type="text" placeholder="johndoughboy33" style={inputval}></input>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <label className="label" style={sulabel}>Password:</label>
                            <div className="control">
                                <input className="input" ref={this.SIfields.password} type="text" placeholder="SuperSecretP@ssw0rd" style={inputval}></input>
                            </div>
                        </div>
                    </div>
                    <footer className="modal-card-foot" style={header_style}>
                        <button className="button login" onClick={this.toggleLoginBox} style={center}>Log in</button>
                    </footer>

                </div>
            </div>


        )
    }

    render() {
        return (
            <nav id="top-nav" className="navbar" aria-label="main-navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <h1 className="title is-1" >TAR HEEL CALENDAR</h1>
                    </a>
                </div>
                <div className="navbar-end" id="navbarend">
                    <div className="navbar-item">
                        <div className="buttons">
                            <div className="signup">
                                <a className="button" id="signupbutton" style={{ backgroundColor: "#b5e3f8" }} onClick={this.toggleSUBox}>
                                    Sign Up
                                </a>
                                {this.renderSignUp()}
                            </div>
                            <div className="login">
                                <a className="button is-light" id="loginbutton" onClick={this.toggleLoginBox}>
                                    <p id="logintext">Log in</p>

                                </a>
                            </div>
                            {this.renderLogin()}
                        </div>

                    </div>
                </div>

            </nav>
        );
    }
}

export default NavBar;