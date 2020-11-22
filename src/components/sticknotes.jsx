import React, { Component } from 'react';
class StickyNote extends Component {

    constructor() {
        super()
        // window.alert("hello")
        this.state = {}
    }


    render() {
        return (<div>
            <div className="box" style={{ backgroundColor: "lightyellow" }}>
                <textarea class="textarea" style={{ backgroundColor: "lightyellow", border: "none", height: "135px" }}></textarea>
            </div>
            <div className="box" style={{ backgroundColor: "lightpink" }}>
                <textarea class="textarea" style={{ backgroundColor: "lightpink", border: "none", height: "135px" }}></textarea>
            </div>
            <div className="box" style={{ backgroundColor: "lightblue" }}>
                <textarea class="textarea" style={{ backgroundColor: "lightblue", border: "none", height: "135px" }}></textarea>
            </div>
            </div>

        )
    }
}

export default StickyNote