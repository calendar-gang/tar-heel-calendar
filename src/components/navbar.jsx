import React, {Component} from 'react';
import '../App.css'

class NavBar extends Component {
    state = {};

    render() {
        return (
            <nav id="top-nav" class="navbar" aria-label="main-navigation">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <h1 class="title is-1" >TAR HEEL CALENDAR</h1>
                    </a>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary">
                                Sign Up
                            </a>
                            <a class="button is-light">
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