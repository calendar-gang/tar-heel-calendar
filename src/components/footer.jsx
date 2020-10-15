import React, {Component} from 'react';
import logo from '../logo.svg';

class Footer extends Component {
    state = {}
    render() {
        return (
            <footer className="footer">
            <div className="content has-text-centered">
                <p>
                <strong>Tar Heel Calendar</strong> by Victoria Helenae Hoffmanne IV, Ezri White, Eric Schneider, Alfred Mathew.
            </p>
            </div>

            <img src={logo} className="App-logo" alt="logo" />

            <p>Edit <code>src/App.js</code> and save to reload.</p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            <p>This is a calendar. Very fancy.</p>
            </footer>
        )
    }
}

export default Footer;
