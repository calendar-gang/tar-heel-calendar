import React, { Component } from 'react';
import '../App.css'

class NavBar extends Component {
    state = {};

    render() {
        return (
            <nav id="top-nav" className="navbar" aria-label="main-navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <h1 className="title is-1" >TAR HEEL CALENDAR</h1>
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button" style={{ backgroundColor: "#b5e3f8" }}>
                                Sign Up
                            </a>
                            <a className="button is-light">
                                Log in
                            </a>
                        </div>

                    </div>
                </div>

            </nav>
        );
    }
}

export default NavBar;