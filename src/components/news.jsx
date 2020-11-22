import React, { Component } from 'react';
import axios from '../../node_modules/axios/index.js';
import ReactDOM from 'react-dom'
import Article from './article'
class News extends Component {

    constructor() {
        super()
        // window.alert("hello")
        this.state = {}
        // this.myRef = React.createRef();
        this.inputRef = {}
        for (let i = 0; i < 10; i++) {
            this.inputRef[i] = React.createRef();
        }
    }

    async componentDidMount() {
        var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=a50bcbb32f2048089bc9eb4b093acf48';
        const res = await axios({
            method: 'get',
            url: url,
        });
        console.log(res.data.articles)
        this.renderArticles(res.data.articles)

    }

    renderArticles(data) {
        for (let i = 0; i < 10; i++) {
            ReactDOM.render(<Article title={data[i].title} url={data[i].url}></Article>, this.inputRef[i].current)
        }
        // ReactDOM.render(articles, "breakingnews")
    }


    render() {
        let articles = []
        for (let i=0; i<10; i++) {
            articles.push(<div class="box is-hoverable" style={{margin: "5px"}} ref = {this.inputRef[i]}></div>)
        }
        return (<div className="box" style={{backgroundColor: "#ffd4d4", padding: "10px", height: "575px", overflow: "scroll"}}>{articles}</div>)
    }
}

export default News