import React, { Component } from 'react';
import { useState } from 'react';
import Task from './task';
import StickyNote from './sticknotes'
import News from './news'
import NewEntry from './newentry'
import ReactDOM from 'react-dom'
import DayEvent from './dayEvent'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import axios from '../../node_modules/axios/index.js';

class Day extends Component {
    state = {}

    constructor(props) {
        super(props);

        this.scrollBox = React.createRef()

        this.timeRef = {}
        this.display = "first"

        for (let i = 0; i < 24; i++) {
            this.timeRef[`${i}`] = React.createRef()
        }

        /*
        var now = new Date();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var day = days[now.getDay()];
        var month = months[now.getMonth()];

        let writtendate = day + ", " + month + " " + now.getDate() + "th"
        */
        this.state = {
            eventlist: [],
            tasklist: [],
            date: this.props.date,
            loggedIn: this._getCookie("token").length === 60,
            display: "first"
        }
        console.log(this.state.date)

    }

    componentDidMount() {
        this.scrollBox.current.scrollTop = 800
        this._getcurrentevents()
        this._getcurrenttasks()
    }

    async _getcurrenttasks() {
        if (!this.state.loggedIn) {
            this.setState({ tasklist: [] });
        } else {
            const results = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/viewtasks',
                data: {
                    token: this._getCookie("token")
                }
            });
            let tasks = results.data.results // this should hold our tasks results data !
            let tlist = []
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].isshown === 1) {
                    tlist.push({
                        content: tasks[i].description,
                        iscompleted: tasks[i].iscompleted,
                        id: tasks[i].iscompleted.id
                    })
                }
            }
            this.setState({ tasklist: tlist });

        }
        this.rendercurrenttasks()

    }

    async _getcurrentevents() {
        if (!this.state.loggedIn) {
            this.setState({ eventlist: [] });
        } else {
            const results = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
                data: {
                    token: this._getCookie("token"),
                    earliest: '2020-11-22 00:00:00',
                    latest: '2020-11-22 23:59:00'
                }
            });
            let events = results.data.results // this should hold our events results data !
            let elist = []
            for (let i = 0; i < events.length; i++) {
                let starttime = events[i].start
                let endtime = events[i].end
                let day = starttime.split("T")[0].split("-")[2] - 22 // 22 should be whatever the beginning of the week date is
                let start = starttime.split("T")[1].split(":")[0]
                let minspaststart = starttime.split("T")[1].split(":")[1]
                let end = endtime.split("T")[1].split(":")[0]
                let minspastend = endtime.split("T")[1].split(":")[1]
                elist.push({
                    id: events[i].id,
                    date: starttime.split("T")[0],
                    day: parseFloat(day),
                    start: parseFloat(start),
                    smin: parseFloat(minspaststart),
                    end: parseFloat(end),
                    emin: parseFloat(minspastend),
                    name: events[i].title,
                    location: events[i].location,
                    description: events[i].description,
                    category: i % 9
                })
            }
            this.setState({ eventlist: elist });

        }
        this._rendercurrentevents()
    }


    _rendercurrentevents() {
        for (let i = 0; i < this.state.eventlist.length; i++) {
            let evt = this.state.eventlist[i]
            ReactDOM.render(<DayEvent eventstate={evt}></DayEvent>, this.timeRef[`${evt.start}`].current)
        }
    }

    rendercurrenttasks() {
        for (let i = 0; i < this.state.tasklist.length; i++) {
            const d = document.createElement("div")
            const id = Math.random()
            d.id = id
            document.getElementById('newtasks').appendChild(d)
            ReactDOM.render(<Task text={this.state.tasklist[i].content} complete={this.state.tasklist[i].iscompleted} id={this.state.tasklist[i].id}></Task>, document.getElementById(id));
        }
    }

    _getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        else return ""

    }

    getWrittenDate() {
        var now = this.state.date;
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var day = days[now.getDay()];
        var month = months[now.getMonth()];

        let writtendate = day + ", " + month + " " + now.getDate() + "th"
        return writtendate;
    }

    handleSubmit(obj) {
        let current_events = [...this.state.eventlist];
        current_events.push(obj);
        this.setState({ eventlist: current_events });
        if (parseInt(obj.start) < 10) {
            obj.start = obj.start.slice(1);
        }
        ReactDOM.render(<DayEvent eventstate={obj}></DayEvent>, this.timeRef[`${obj.start}`].current)
    }


    _findHour(time) {
        if (time < 12) { return time === 0 ? "12 AM" : time + " AM" }
        else { return (time % 12) === 0 ? "12 PM" : (time % 12) + " PM" }

    }

    _renderRowByHour(time) {
        return (
            <tr style={{ width: "100px" }}>
                <th className="has-text-grey-light has-text-left is-narrow">{this._findHour(time)}</th>
                <td ref={this.timeRef[`${time}`]} style={{ padding: "0px" }}></td>
            </tr>
        )
    }

    _renderBody() {
        let rows = [];
        for (let i = 0; i < 24; i++) {
            rows.push(this._renderRowByHour(i));
        }
        return (
            <tbody style={{ width: "50px" }}>
                {rows}
            </tbody>
        )
    }

    toggletaskform(event) {
        event.persist();
        // let name = event.target.id;
        let edit_box = document.getElementById("newtask");

        if (edit_box.className === "modal is-active") {
            edit_box.className = "modal";
        } else {
            edit_box.className = "modal is-active";
        }
    }

    async createTask(event) {
        let tasktext = this.refs.tasktext.value;
        this.toggletaskform(event)

        if (this.state.loggedIn) {
            const results = await axios({
                method: 'post',
                url: 'https://tar-heel-calendar.herokuapp.com/maketask',
                data: {
                    token: this._getCookie("token"),
                    description: tasktext
                }
            });

            if (results.data.message === "Task made.") {
                console.log("success!!")
                this.state.tasklist.push(tasktext)
                // window.alert(tasktext)

                const d = document.createElement("div")
                const id = Math.random()
                d.id = id
                document.getElementById('newtasks').appendChild(d)
                // ReactDOM.render((<div className="box" style={{margin: "10px"}}>
                // <input type="checkbox"/>
                // <label className="task" style={{marginLeft: "5px"}}>{tasktext}</label><br/>
                // </div>), document.getElementById(id));
                ReactDOM.render(<Task text={tasktext} complete={false} id={results.data.id}></Task>, document.getElementById(id));
            }
        }



    }

    // strikeTask(event) {
    //     ReactDOM.render((<div><label for="task2" className="task" id="task2text" style={{textDecoration: 'line-through'}}> start adding data!!</label>
    //                             <p>Task Complete!</p></div>), document.getElementById("task2text"));
    // }

    rendertaskform() {
        return (<div id="newtask" className="modal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head" >
                    <p className="modal-card-title">Create a new task:</p>
                    <button onClick={this.toggletaskform} className="delete" aria-label="close"></button>
                </header>
                <div className="control is-horizontal">
                    <input className="input" ref="tasktext" type="text" placeholder="New Task" />
                </div>
                <section id="login-box-content" className="modal-card-body">
                </section>
                <footer className="modal-card-foot">
                    <button className="button create" id="createtask" onClick={this.createTask.bind(this)}>Create</button>
                </footer>

            </div>
        </div>)
    }




    // updateDate(dir) {
    //     // just for funzies so we can see it update, feel free to remove once we have backend if necessary :)
    //     // this does NOT work month to month lol 
    //     var now = new Date();
    //     var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    //     var arrayver = this.state.day.split(',')
    //     var dayindex = days.indexOf(arrayver[0])


    //     if (dir == 1) {
    //         if (dayindex < 6) {
    //             dayindex = dayindex + 1
    //         } else {
    //             dayindex = 0
    //         }
    //     } else {
    //         if (dayindex > 0) {
    //             dayindex = dayindex - 1
    //         } else {
    //             dayindex = 6
    //         }
    //     }

    //     var num = parseInt(arrayver[1].split(" ")[2].substring(0, 2)) + dir

    //     var day = days[dayindex];
    //     var month = months[now.getMonth()];

    //     let writtendate = day + ", " + month + " " + num + "th"
    //     this.setState({ day: writtendate })

    // }

    getCurrentDate() {
        var now = this.state.date;
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var day = days[now.getDay()];
        var month = months[now.getMonth()];

        let writtendate = day + ", " + month + " " + now.getDate() + "th"
        return writtendate
    }

    changeDay(direction) {
        // method to change the date
        let new_date_object = new Date(this.state.date.getTime());
        if (direction == 1) {
            // move forward one day
            new_date_object.setDate(new_date_object.getDate() + 1);
        } else {
            // move backwards one day
            new_date_object.setDate(new_date_object.getDate() - 1);
        }
        this.setState({ date: new_date_object })
    }

    toggletools() {
        if (this.state.display === "first") {
            // this.display = "second"
            this.setState({
                date: this.props.date,
                display: "second"
            })
        } else {
            this.setState({
                date: this.props.date,
                display: "first"
            })
        }
        console.log(this.display)
    }

    rendertools() {
        if (this.state.display === 'first') {
            return <StickyNote />
        } else if (this.state.display === 'second') {
            return <News />
        }
    }

    render() {
        let header_style = { position: "sticky", top: "0px", zIndex: "2", backgroundColor: "#fff" }

        return (

            <div className="daysview columns" style={{ margin: "0px" }}>
                <div className="calendar column is-half">
                    <div className="container is-half">
                        <section className="level" style={{ backgroundColor: "#b5e3f8", height: "50px" }}>
                            <div className="level-left">
                                <h1 className="has-text-light" style={{ fontSize: "60px", marginTop: "10px" }} onClick={() => this.changeDay(0)}><BiChevronLeft /></h1>
                                <h1 className="title has-text-light" style={{ fontSize: "25px", margin: "20px" }}>{this.getWrittenDate(this.state.date)} </h1>
                            </div>
                            <div className="level-right">
                                <NewEntry submit={(obj) => { this.handleSubmit(obj) }}></NewEntry>
                                <h1 className="has-text-light" style={{ fontSize: "60px", marginTop: "10px" }} onClick={() => this.changeDay(1)}><BiChevronRight /></h1>
                            </div>

                        </section>
                    </div>
                    <div className="container box" ref={this.scrollBox} style={{ margin: "10px", height: "575px", overflow: "scroll", padding: "0px" }}>
                        <table className="table is-bordered is-narrow is-hoverable is-fullwidth">
                            <thead style={header_style}>
                                <tr className="is-bordered" style={header_style}>
                                    <th style={header_style}></th>
                                    <th className="has-text-grey-light is-4" style={header_style}>Events</th>
                                </tr>
                            </thead>
                            {this._renderBody()}
                        </table>
                    </div>
                    <div style={{ height: "30px" }}></div>

                </div>
                <div className="dailytodo container column is-half" style={{ backgroundColor: "#0b1846" }}>
                    <section className="level" style={{ backgroundColor: "#0b1846", height: "50px", marginBottom: "8px" }}>
                        <h1 className="title has-text-light" style={{ margin: "10px" }}>My Daily To-Do:</h1>
                        <button class="button is-small is-rounded" style={{ backgroundColor: "#606163", color: "white", border: "none" }} onClick={this.toggletools.bind(this)}>Toggle Tools</button>
                    </section>
                    <div class="columns" style={{ height: "100%" }}>
                        <div className="container tasklist box column" id="tasklist" style={{ backgroundColor: "white", height: "575px", overflow: "scroll", margin: "15px" }}>
                            <button className="button create is-rounded" style={{ backgroundColor: "#606163", color: "white" }} onClick={this.toggletaskform.bind(this)}>New Task</button>
                            <div id="newtasks"></div>
                            {this.rendertaskform()}
                        </div>
                        <div class="column is-half stickynotes">
                            {this.rendertools()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Day;

