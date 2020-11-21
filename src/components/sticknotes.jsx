import React, { Component } from 'react';
class StickyNote extends Component {

    constructor() {
        super()
        // window.alert("hello")
        this.state = {}
    }


    render() {
        return (
            <div className="box" style={{ backgroundColor: this.props.color }}>
                <textarea class="textarea" style={{ backgroundColor: this.props.color, border: "none", height: "135px" }}></textarea>
            </div>

        )
    }
}

export default StickyNote