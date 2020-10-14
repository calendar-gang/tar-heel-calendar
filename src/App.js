import React from 'react';
import './App.css';
import Calendar from './components/calendar';
import Footer from './components/footer';
import NavBar from './components/navbar';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1 class="title is-1" >TAR HEEL CALENDAR</h1>
      </header> */}
      <NavBar />
      <div class="container">
        <div class="tabs is-centered">
          <ul>
            <li ><a>Day</a></li>
            <li class="is-active"><a>Week</a></li>
            <li><a>Month</a></li>
            <li><a>Year</a></li>
          </ul>
        </div>
      </div>
      <Calendar />
      <Footer />
    </div >

  );
}

export default App;
