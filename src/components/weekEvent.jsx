import React, { Component } from 'react';

class WeekEvent extends Component {
    state = {}

    /*toggleEventBox(event) {
        // event.persist();
        let td = event.nativeEvent.path[0];
        let edit_box = document.getElementById("event-box");
        if (edit_box.className === "is-hidden") {
            edit_box.className = "";
        } else {
            edit_box.className = "is-hidden";
        }
    }

    createEventBox() {
        return (
            <div id="event-box" className="is-hidden">
                <div className="card">
                    <header className="card-head">
                        <p className="card-title">Here is this event!</p>
                        <button onClick={this.toggleEditBox} className="delete" aria-label="close"></button>
                    </header>
                    <section id="event-box-content" class="card-body">
                    </section>
                    <footer className="card-foot">
                        <button className="button is-warning">Edit</button>
                        <button className="button is-success">Save changes</button>
                        <button onClick={this.toggleEditBox} className="button">Cancel</button>
                    </footer>
                </div>
            </div>

        )
    }*/

    toggleEventEditBox(event) {
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

    createEventEditBox() {
        return (
            <div id="edit-box" className="modal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Edit this task!</p>
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
            <div style={event_style} className="box week-event" onDoubleClick={this.toggleEventEditBox} /*onClick={this.toggleEventBox*/>
                <p class="has-text-left">Event</p>
                { this.createEventEditBox()}
                { /*this.createEventBox()*/}
            </div>

        )
    }
}

export default WeekEvent;