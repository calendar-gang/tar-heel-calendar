import React, {Component} from 'react';

class Week extends Component {
    state = {};

    toggleEditBox(event) {
        event.persist();
        console.log(event);
        let td = event.nativeEvent.path[0];
        let edit_box = document.getElementById("edit-box");
        let content = document.getElementById("edit-box-content");
        if(edit_box.className == "modal is-active") {
            edit_box.className = "modal";
            while(content.firstChild) {
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
            <div id="edit-box" class="modal">
                <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                        <p class="modal-card-title">Here Are Your Tasks!</p>
                        <button onClick={this.toggleEditBox} class="delete" aria-label="close"></button>
                        </header>
                        <section id="edit-box-content" class="modal-card-body">
                        </section>
                        <footer class="modal-card-foot">
                        <button class="button is-warning">Edit</button>
                        <button class="button is-success">Save changes</button>
                        <button onClick={this.toggleEditBox} class="button">Cancel</button>
                        </footer>
                    </div>
                </div>
                
        )
    }

    _renderRowByHour(time) {
        let messages = ["Prepare for exam", "Fail 521 exam", "Move on with life", "Anticipate future",
                        "Who cares about future, it's Friday!", "Sleep", "Hello"];
        let rows = [];
        messages.forEach((task) => {
            rows.push(
            <td onClick={this.toggleEditBox}>{task}</td>
            );
        })
        return (
            <tr>
                <th>{time}</th>
                {rows}
            </tr>
        )
    }

    _renderBody() {
        let rows = [];
        for(let i = 0; i < 24; i++) {
            rows.push(this._renderRowByHour(i));
        }
        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    render() {
        return (
            <div className="calendar">
                <div className="container">
                <table className="table is-bordered is-narrow is-hoverable is-fullwidth">
                    <thead>
                    <tr className="is-bordered">
                        <th></th>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                    </thead>
                    {this._renderBody()}
                </table>
                {this.createEditBox()}
            </div>
            </div>
        )
    }
}

export default Week;
