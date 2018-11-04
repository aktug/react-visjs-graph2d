import React, { Component } from 'react';
import './App.css';
import VisGraph2dContainer from './VisGraph2dContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          React Vis.js Graph2d
        </header>
        <content>
          <VisGraph2dContainer />
        </content>
      </div>
    );
  }
}

export default App;
