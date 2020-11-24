import React, { Component } from 'react';
import axios from '../../node_modules/axios/index.js';

class AutoCompleteText extends Component {

    constructor(props) {
        super(props)
        this.items = ['Quiz', 'Exam', 'Test', 'Paper', 'Coffee', 'Chapter', 'Due', 'UNC', 'Sitterson', 'Project',
            'English', 'Math', 'Science', 'Chemistry', 'Biology', 'Lecture', 'Virtual Sitterson']

        this.state = {
            suggestions: [],
            loggedIn: this._getCookie("token").length === 60,
            text: ""
        }
        this.addeventandtasklist()
        // this.myRef =  React.createRef()
    }

    async addeventandtasklist() {
        if (this.state.loggedIn) {
            const eventresults = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
                data: {
                    token: this._getCookie("token")
                }
            });
            let events = eventresults.data.results // this should hold our events results data !
            for (let i = 0; i < events.length; i++) {
                if (!this.items.includes(events[i].title)) {
                    this.items.push(events[i].title)
                }
            }
            const taskresults = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/viewtasks',
                data: {
                    token: this._getCookie("token")
                }
            });
            let tasks = taskresults.data.results // this should hold our events results data !
            for (let i = 0; i < tasks.length; i++) {
                if (!this.items.includes(tasks[i].title)) {
                    this.items.push(tasks[i].description)
                }

            }

        }
    }

    _getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        else return ""

    }

    debounce = (func) => {
        let delay = 1000
        let debounceTimer
        return function () {
            const context = this
            const args = arguments
            clearTimeout(debounceTimer)
            debounceTimer
                = setTimeout(() => func.apply(context, args), delay)
        }
    }

    helper(e) {
        this.debounce(this.onTextChanged(e))
    }

    onTextChanged = (e) => {
        const value = e.target.value
        let suggestions = []
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(value => regex.test(value))
        }
        this.setState({ suggestions: suggestions, text: value })
        this.props.triggerParentUpdate(value)
    }

    renderSuggestions() {
        const suggestStyle = {
            backgroundColor: "white",
            width: "300px"
        }
        const suggestions = this.state.suggestions
        if (suggestions.length === 0) {
            return null
        }
        return (
            <div className="box" style={{ position: "absolute", zIndex: "1" }}>
                <ul>
                    {suggestions.map((item => <li className="ishoverable" style={suggestStyle} onClick={() => this.suggestionSelected(item)}>{item}</li>))}
                </ul>
            </div>
        )
    }

    suggestionSelected(value) {
        this.setState({ suggestions: [], text: value })
        this.props.triggerParentUpdate(value)
    }

    render() {
        const text = this.state.text
        const inputval = {
            margin: "10px",
            width: "300px"
        }
        return (
            <div>
                <input class="input" value={text} placeholder={this.props.hold} style={inputval} type="text" onChange={this.helper.bind(this)} />
                {this.renderSuggestions()}
            </div>

        )
    }
}

export default AutoCompleteText

// <input class= "input" value={text} placeholder= {this.props.hold} style={inputval} type="text" onChange={this.onTextChanged.bind(this)}/>