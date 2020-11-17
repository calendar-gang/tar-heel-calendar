import React, { Component } from 'react';
import '../App.css'

class NavBar extends Component {
    state = {};

    toggleSUBox(event) {
        event.persist();
        let edit_box = document.getElementById("signup-box");
        if (edit_box.className == "modal is-active") {
            edit_box.className = "modal";
        } else {
            edit_box.className = "modal is-active";
        }
    }

    checkpassword(pword) {
        // checks to make sure passowrd is between 8 and 100 chars, 
        // contains at least one lowercase letter, one uppercase letter, 
        // one numeric digit, and one special character
        var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/;
        if(decimal.test(pword)) { 
            return true;
        } else { 
            return false;
        }
    }

    clickMe(event) {
        let valid = this.checkpassword(this.refs.pword.value)
        let flen = this.refs.fname.value.length
        let llen = this.refs.lname.value.length
        let ulen = this.refs.uname.value.length
        let elen = this.refs.email.value.length
        if ( valid && flen > 0 && llen > 0 && ulen > 0 && elen > 4 ) {
            this.toggleSUBox(event)
        } else {
            window.alert("Invalid input field, please try again.")
        }
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
            <div id="signup-box" class="modal">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head" style={header_style}>
                        <p class="modal-card-title">Welcome new user! Create an account below:</p>
                        <button onClick={this.toggleSUBox} class="delete" aria-label="close"></button>
                    </header>
                    <div class="form modal-card-body">
                    <div class="field is-horizontal">
                        <label class="label sulabel" style={sulabel}>First Name:</label>
                        <div class="control">
                            <input class="input"  id= "fninput" ref="fname" type="text" placeholder="John" style={inputval}></input>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <label class="label sulabel" style={sulabel}>Last Name:</label>
                        <div class="control">
                            <input class="input" type="text" ref="lname" placeholder="Doe" style={inputval}></input>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <label class="label sulabel" style={sulabel}>Email:</label>
                        <div class="control">
                            <input class="input" type="text" ref="email" placeholder="johndoe@live.unc.edu" style={inputval}></input>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <label class="label sulabel" style={sulabel}>Username:</label>
                        <div class="control">
                            <input class="input" ref="uname" type="text" placeholder="johndoughboy33" style={inputval}></input>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <label class="label sulabel" style={sulabel}>Password:</label>
                        <div class="control">
                            <input class="input" ref="pword" type="text" placeholder="SuperSecretP@ssw0rd" style={inputval}></input>
                        </div>
                    </div>
                    <p>Note: Passwords must be at least 8 characters long and include at least one of each of the following: 
                        uppercase letter, lowercase letter, special character, and a number!
                            </p>
                    </div>
                    <footer class="modal-card-foot" style={header_style}>
                        <button class="button signup" id="signupbutton" onClick={this.clickMe.bind(this)} style={center}>Sign Up</button>
                    </footer>
                </div>
            </div>


        )
    }

    toggleLoginBox(event) {
        event.persist();
        let edit_box = document.getElementById("login-box");
        if (edit_box.className == "modal is-active") {
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
            <div id="login-box" class="modal">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head" style={header_style}>
                        <p class="modal-card-title">Let's Get Productive!</p>
                        <button onClick={this.toggleLoginBox} class="delete" aria-label="close"></button>
                    </header>
                    <div class="form modal-card-body" style={{height:"200px"}}>
                        <div class="field is-horizontal">
                            <label class="label" style={sulabel}>Username:</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="johndoughboy33" style={inputval}></input>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <label class="label" style={sulabel}>Password:</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="SuperSecretP@ssw0rd" style={inputval}></input>
                            </div>
                        </div>
                    </div>
                    <footer class="modal-card-foot" style={header_style}>
                        <button class="button login" onClick={this.toggleLoginBox} style={center}>Log in</button>
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
                            <div className= "signup">
                                <a className="button" id="signupbutton" style={{ backgroundColor: "#b5e3f8" }} onClick={this.toggleSUBox}>
                                    Sign Up
                                </a>
                                { this.renderSignUp()}
                            </div>
                            <div className= "login">
                                <a className="button is-light" id="loginbutton" onClick={this.toggleLoginBox}>
                                    <p id="logintext">Log in</p>

                                </a>
                            </div>
                            { this.renderLogin()}
                        </div>
                        
                    </div>
                </div>

            </nav>
        );
    }
}

export default NavBar;