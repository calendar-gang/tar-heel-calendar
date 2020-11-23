import React, { Component } from 'react';
import logo from '../logo.svg';

class Footer extends Component {
    state = {}
    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>Tar Heel Calendar</strong> by Victoria Hoffmann, Ezri White, Eric Schneider, Alfred Mathew.
                    </p>
                </div>
            </footer>
        )
    }
}

export default Footer;
