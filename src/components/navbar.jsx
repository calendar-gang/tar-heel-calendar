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

    renderSignUp() {
        const header_style = {
            backgroundColor: "#b5e3f8",
            height: "75px"


        }
        const center = {
            left: "265px"
        }
        return (
            <div id="signup-box" class="modal">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head" style={header_style}>
                        <p class="modal-card-title">Welcome new user! Create an account below:</p>
                        <button onClick={this.toggleSUBox} class="delete" aria-label="close"></button>
                    </header>
                    <div class="form modal-card-body" style={{height: "200px"}}>
                        <label class="label">New Username</label>
                        <div class="control">
                            <input class="input" type="text"></input>
                        </div>
                        <label class="label">New Password</label>
                        <div class="control">
                            <input class="input" type="text"></input>
                        </div>
                    </div>
                    <footer class="modal-card-foot" style={header_style}>
                        <button class="button login" onClick={this.toggleSUBox} style={center}>Sign Up</button>
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

        return (
            <div id="login-box" class="modal">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head" style={header_style}>
                        <p class="modal-card-title">Let's Get Productive!</p>
                        <button onClick={this.toggleLoginBox} class="delete" aria-label="close"></button>
                    </header>
                    <div class="form modal-card-body" style={{height:"200px"}}>
                        <label class="label">Username</label>
                        <div class="control">
                            <input class="input" type="text"></input>
                        </div>
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="text"></input>
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