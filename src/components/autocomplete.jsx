import React, { Component } from 'react';

class AutoCompleteText extends Component {

    constructor(props) {
        super(props)
        this.items = ['quiz', 'exam', 'test', 'paper', 'coffee', 'chapter', 'due', 'UNC', 'Sitterson', 'project', 'english', 'math', 'science', 'chemistry', 'biology']
        this.state = {
            suggestions: [],
            text: ""
        }
    }

    onTextChanged = (e) => {
        const value = e.target.value
        let suggestions = []
        if (value.length > 0 ) {
            const regex = new RegExp(`^${value}`);
            suggestions = this.items.sort().filter(value => regex.test(value))
            console.log(suggestions)
        }
        this.setState({suggestions: suggestions, text: value})
    }

    renderSuggestions() {
        const suggeststyle = {
            backgroundColor: "white", 
        }
        const suggestions = this.state.suggestions
        if (suggestions.length === 0 ) {
            return null
        }
        return (
            <div class="box" style={{position: "absolute", zIndex: "1"}}>
            <ul>
                 {suggestions.map((item => <li style= {suggeststyle} onClick= {() => this.suggestionSelected(item)}>{item}</li>))}
            </ul>
            </div>
        )
    }

    suggestionSelected (value) {
        this.setState({suggestions: [], text: value})
    }

    render() {
        const text = this.state.text
        const inputval = {
            margin: "10px",
            width: "300px"
        }
        return (
            <div>
               <input class= "input" value={text} placeholder= {this.props.hold} style={inputval} type="text" onChange={this.onTextChanged.bind(this)}/>
               {this.renderSuggestions()}
            </div>

        ) 
    }
}

export default AutoCompleteText