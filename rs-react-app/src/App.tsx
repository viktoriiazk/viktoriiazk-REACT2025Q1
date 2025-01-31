import React, { Component } from 'react';
import TopControls from './components/TopControls';
import Results from './components/Results';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <TopControls />
        <Results />
      </div>
    );
  }
}

export default App;
