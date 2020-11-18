import React, { Component } from 'react';
// import './Menu.css';

class WeekEvent extends Component {
    state = {}

    toggleEditBox(event) {
        event.persist();
        let td = event.nativeEvent.path[0];
        let edit_box = document.getElementById("edit-box");
        let content = document.getElementById("edit-box-content");
        if (edit_box.className === "modal is-active") {
            edit_box.className = "modal";
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
        } else {
            edit_box.className = "modal is-active";
            let task = document.createElement("p");
            task.innerHTML = td.innerHTML;
            content.append(task);
        }
    }

    createEditBox() {
        return (
            <div id="edit-box" className="modal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Here Are Your Tasks!</p>
                        <button onClick={this.toggleEditBox} className="delete" aria-label="close"></button>
                    </header>
                    <section id="edit-box-content" class="modal-card-body">
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-warning">Edit</button>
                        <button className="button is-success">Save changes</button>
                        <button onClick={this.toggleEditBox} className="button">Cancel</button>
                    </footer>
                </div>
            </div>

        )
    }

    render() {
        const event_style = {
            width: "150px",
            position: "absolute",
            height: "70px",
            backgroundColor: "#f0d4ff",
            margin: "80px 0px",

        }

        return (
            <div style={event_style} className="box week-event" onClick={this.toggleEditBox}>
                <p class="has-text-left">Event</p>
                { this.createEditBox()}
            </div>

        ) 
    }
}

export default WeekEvent;