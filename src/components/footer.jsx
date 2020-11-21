import React, { Component } from 'react';
import logo from '../logo.svg';

class Footer extends Component {
    state = {}
    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>Tar Heel Calendar</strong> by Victoria Hoffmanne, Ezri White, Eric Schneider, Alfred Mathew.
            </p>
                </div>

                <img src={logo} className="App-logo" alt="logo" />
                <p>This is a calendar. Very fancy.</p>
            </footer>
        )
    }
}

export default Footer;
