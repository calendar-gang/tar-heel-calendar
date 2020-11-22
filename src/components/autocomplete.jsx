import React, { Component } from 'react';

class AutoCompleteText extends Component {

    constructor(props) {
        super(props)
        this.items = ['quiz', 'exam', 'test', 'paper', 'coffee', 'chapter', 'due', 'UNC', 'Sitterson', 'project', 'english', 'math', 'science', 'chemistry', 'biology', 'lecture']
        this.state = {
            suggestions: [],
            text: ""
        }
        // this.myRef =  React.createRef()
    }

    debounce = (func) => { 
        let delay = 1000
        let debounceTimer 
        return function() { 
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
        if (value.length > 0 ) {
            const regex = new RegExp(`^${value}`);
            suggestions = this.items.sort().filter(value => regex.test(value))
        }
        this.setState({suggestions: suggestions, text: value})
        this.props.triggerParentUpdate(value)
    }

    renderSuggestions() {
        const suggeststyle = {
            backgroundColor: "white", 
            width: "300px"
        }
        const suggestions = this.state.suggestions
        if (suggestions.length === 0 ) {
            return null
        }
        return (
            <div class="box" style={{position: "absolute", zIndex: "1"}}>
            <ul>
                 {suggestions.map((item => <li class="ishoverable" style= {suggeststyle} onClick= {() => this.suggestionSelected(item)}>{item}</li>))}
            </ul>
            </div>
        )
    }

    suggestionSelected (value) {
        this.setState({suggestions: [], text: value})
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
               <input class= "input" value={text} placeholder= {this.props.hold} style={inputval} type="text" onChange={this.helper.bind(this)}/>
               {this.renderSuggestions()}
            </div>

        ) 
    }
}

export default AutoCompleteText

// <input class= "input" value={text} placeholder= {this.props.hold} style={inputval} type="text" onChange={this.onTextChanged.bind(this)}/>