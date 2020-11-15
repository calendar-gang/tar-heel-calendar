import React, { Component } from 'react';
import './App.css';
import Week from './components/week';
import Footer from './components/footer';
import NavBar from './components/navbar';
import ViewSelector from './components/viewSelector';
import Day from './components/day';

class App extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <NavBar />
        <ViewSelector />
        <Footer />
      </div >
    );
  }
}

export default App;
