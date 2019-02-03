import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import * as p5 from 'p5';
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom.js";
import logo from './logo.svg';
import './App.css';
import Viewer from './Viewer';

class App extends Component {
  render() {
    return (
        <Viewer />
    );
  }
}

export default App;
