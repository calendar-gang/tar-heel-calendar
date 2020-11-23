import React, { Component } from 'react';
import '../App.css'
import axios from '../../node_modules/axios/index.js';
import { BiUserCircle } from 'react-icons/bi';

class NavBar extends Component {
    // state = {};
    // messagefield = "Successfully logged in!"

    constructor(props) {
        super(props);
        console.log(this._getCookie("token"))
        console.log(this._getCookie("token").length)
        this.state = { messagefield: "Successfully logged in!", loggedIn: this._getCookie("token").length === 60 }
        this.user = React.createRef()
        this.SUBfields = { fname: React.createRef(), lname: React.createRef(), email: React.createRef(), username: React.createRef(), password: React.createRef() };
        this.SIfields = { username: React.createRef(), password: React.createRef() }
    }

    async componentDidMount() {
        if (this.state.loggedIn) {
            let username = await this._getUserName()
            this.user.current.innerHTML = username
        }
    }

    checkpassword(pword) {
        // checks to make sure passowrd is between 8 and 100 chars, 
        // contains at least one lowercase letter, one uppercase letter, 
        // one numeric digit, and one special character
        console.log(pword)
        let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/;
        if (decimal.test(pword)) {
            return true;
        } else {
            return false;
        }
    }

    _getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        else return ""

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

    toggleLoginBox(event) {
        event.persist();
        let edit_box = document.getElementById("login-box");
        if (edit_box.className === "modal is-active") {
            edit_box.className = "modal";
        } else {
            edit_box.className = "modal is-active";
        }
    }

    _submitPress(event) {
        console.log(this.SUBfields)
        let pword = this.SUBfields.password.current.value
        console.log(this.SUBfields.password.current)
        let valid = this.checkpassword(pword)
        console.log(valid)
        let fname = this.SUBfields.fname.current.value
        let lname = this.SUBfields.lname.current.value
        let uname = this.SUBfields.username.current.value
        let email = this.SUBfields.email.current.value
        if (valid && fname.length > 0 && lname.length > 0 && uname.length > 0 && email.length > 4) {
            this._submitValidatedNewUser(uname, email, fname, lname, pword)
            this.toggleSUBox(event)
        } else {
            window.alert("Invalid input field, please try again.")
        }
    }

    _loginPress(event) {
        console.log(this.SIfields)
        let pword = this.SIfields.password.current.value
        let uname = this.SIfields.username.current.value
        let valid = this.checkpassword(pword)
        if (valid && uname.length > 0) {
            this._submitValidatedLogin(uname, pword)
            this.toggleLoginBox(event)
        } else {
            window.alert("Invalid input field, please try again.")
        }
    }

    async _logoutPress(event) {

        const result = await axios({
            method: 'post',
            url: 'https://tar-heel-calendar.herokuapp.com/logout',
            data: {
                token: this._getCookie("token")
            }
        });

        if (result.data.message === "Deleted token.") {
            this.setState((state, props) => { return { loggedIn: false } })
            document.cookie = "token="
        }


    }

    async _submitValidatedNewUser(uname, email, fname, lname, pword) {
        const result = await axios({
            method: 'post',
            url: 'https://tar-heel-calendar.herokuapp.com/register',
            data: {
                username: uname,
                email: email,
                firstname: fname,
                lastname: lname,
                password: pword
            }
        });
        console.log(result.data)
        if (result.data.message === "Registration complete.") {
            this.setState({ messagefield: "Successfully registered!" })
            this.toggleMessage()

        } else {
            window.alert(result["message"])
        }
    }

    async _submitValidatedLogin(uname, pword) {
        const result = await axios({
            method: 'post',
            url: 'https://tar-heel-calendar.herokuapp.com/login',
            data: {
                username: uname,
                password: pword
            }
        });
        console.log(result.data)
        if (result.data.message === "Logged in.") {
            document.cookie = `token=${result.data.token}`
            this.toggleMessage()
            this.setState((state, props) => { return { messagefield: "Successfully logged in!", loggedIn: true } })
            this.user.current.innerHTML = uname

        }

    }

    async _getUserName() {
        const result = await axios({
            method: 'post',
            url: 'https://tar-heel-calendar.herokuapp.com/getinfo',
            data: {
                token: this._getCookie("token")
            }
        });

        if (result.data.message === "Information found.") {
            return result.data.username
        } else {
            return ""
        }

    }

    toggleMessage() {
        let edit_box = document.getElementById("successmessage");
        edit_box.className = "modal is-active"
        setTimeout(function () { edit_box.className = "modal" }, 500);
    }

    renderMessage() {
        return (<div className="modal" id="successmessage">
            <div className="modal-background"></div>
            <div className="modal-card">
                <p style={{ color: "#60f542" }}>{this.state.messagefield}</p>
            </div>
        </div>)
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
                                <input className="input" ref={this.SUBfields.password} type="text" placeholder="SuperSecretP@ssw0rd" style={inputval}></input>
                            </div>
                        </div>
                        <p>Note: Passwords must be at least 8 characters long and include at least one of each of the following:
                        uppercase letter, lowercase letter, special character, and a number!
                            </p>
                    </div>
                    <footer className="modal-card-foot" style={header_style}>
                        <button className="button signup" id="signupbutton" onClick={this._submitPress.bind(this)} style={center}>Sign Up</button>
                    </footer>
                </div>
            </div>


        )
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
                                <input className="input" ref={this.SIfields.password} type="password" placeholder="SuperSecretP@ssw0rd" style={inputval}></input>
                            </div>
                        </div>
                    </div>
                    <footer className="modal-card-foot" style={header_style}>
                        <button className="button login" onClick={this._loginPress.bind(this)} style={center}>Log in</button>
                    </footer>

                </div>
            </div>


        )
    }

    render() {
        let buttons;
        if (this.state.loggedIn) {
            buttons = <div className="navbar-item">
                <div className="buttons">
                    <div>
                        <p ref={this.user} style={{ fontSize: "20px", color: "#b5e3f8", margin: "0px 10px 10px 0px" }} ></p>
                    </div>
                    <div>
                        <p style={{ fontSize: "45px", color: "#b5e3f8", margin: "0px 10px 0px 0px" }} ><BiUserCircle /></p>
                    </div>
                    <div>
                        <a className="button is-light" id="loginbutton" onClick={this._logoutPress.bind(this)}><p id="logintext">Log Out</p></a>
                    </div>

                </div>
            </div>
        } else {
            buttons = <div className="navbar-item">
                {this.renderMessage()}
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
        }
        return (
            <nav id="top-nav" className="navbar" aria-label="main-navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <h1 className="title is-1" >TAR HEEL CALENDAR</h1>
                    </a>
                </div>
                <div className="navbar-end" id="navbarend">
                    {buttons}
                </div>

            </nav>
        );
    }
}

export default NavBar;