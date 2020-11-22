import React, { Component } from 'react';
import axios from '../../node_modules/axios/index.js';
import ReactDOM from 'react-dom'
class Article extends Component {

    constructor() {
        super()
        // window.alert("hello")
        this.state = {}
    }


    render() {
        return (
            <div>
                <p ref="breakingnews" style={{fontSize: "12px"}}>{this.props.title}</p>
                <a href={this.props.url} style={{fontSize: "12px"}}>Learn More</a> 
            </div>

        )
    }
}

export default Article