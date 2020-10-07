import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>This is a calendar. Very fancy.</p>
      </header>
      <table>
        <tr>
          <th>Sunday</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
        </tr>
        <tr>
          <td>Sleep all day</td>
          <td>Prepare for exam</td>
          <td>Fail 521 exam</td>
          <td>Move on with life</td>
          <td>Anticipate future</td>
          <td>Who cares about future, it's Friday!</td>
          <td>Sleep</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
