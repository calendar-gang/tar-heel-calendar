import React, { Component } from 'react';

class MonthEvent extends Component {
    state = {}
    catcolors = ["#ffd4d4", "#ffe6d4", "#fffbd4", "#e2ffd4", "#d4ffec", "#d4f6ff", "#d4dfff", "#f0d4ff", "#ffd4ee"]

    constructor(props) {
        super(props);

        this.state = { windowWidth: window.innerWidth };

        this.eventBox = React.createRef()
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }


    _toggleEventBox(event) {

        if (this.eventBox.current.className === "is-hidden box monthevent") {
            this.eventBox.current.className = "box monthevent";
        } else {
            this.eventBox.current.className = "is-hidden box monthevent";
        }
    }

    _createEventBox() {
        const event_style = {
            width: "200px",
            position: "absolute",
            height: "200px",
            margin: "30px 0px 0px 50px",
            zIndex: "1",
        }


        // backgroundColor: this.catcolors[this.props.eventstate.category % 9],

        return (
            <div ref={this.eventBox} className="is-hidden box monthevent" style={event_style} >
                <header className="card-head">
                    <p className="card-title">Here is this event!</p>
                </header>
            </div>
        )
    }


    render() {
        const event_style = {
            width: `${(this.state.windowWidth - 250) / 8}px`,
            position: "relative",
            height: `20px`,
            backgroundColor: this.catcolors[this.props.eventstate.category % 9],
            margin: "0px 0px 0px 25px",
            padding: "1px"
        }

        const after_content = {
            "&::after": {
                width: "20px",
                height: "20px",
                transform: "rotate(-45deg)",
                background: "#fff",
                position: "absolute",
                boxShadow: "1px 4px 8px rgba(99, 99, 99, 0.5)",
                zIndex: "-1",
                top: "-10px",
                left: "calc(50% - 10px)"
            }
        }

        return (
            <div>
                <div style={event_style} content={after_content} className="box" onClick={this._toggleEventBox.bind(this)}>
                    <p className="has-text-centered is-size-7">{this.props.eventstate.name}</p>
                </div>
                {this._createEventBox()}
            </div>


        )
    }
}

export default MonthEvent;