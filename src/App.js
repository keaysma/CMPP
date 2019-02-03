import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom.js";
import logo from './assets/logo.svg';
import './static/App.css';
import Viewer from './Viewer';

class App extends Component {
  render() {
    return (
        <Viewer />
    );
  }
}

export default App;
