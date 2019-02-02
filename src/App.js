import React, { Component } from 'react';
// import P5Wrapper from 'react-p5-wrapper';
import logo from './logo.svg';
import './App.css';
import Viewer from './Viewer';
import { Noiser, jukebox } from './Noiser';

class App extends Component {
  render() {
	this.o = jukebox();
	this.o.start();
	console.log(this.o);
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
		  <button onClick={() => this.o.amp(0)}>F</button>
		  <button onClick={() => this.o.amp(1)}>Fnt</button>
        </header>
        <Viewer />
      </div>
    );
  }
}

export function sketch (p) {
  let rotation = 0;

  p.setup = function () {
    p.createCanvas(1000, 1000, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation){
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p.draw = function () {
    p.background(100);
    p.noStroke();
    p.push();
    p.rotateY(rotation);
    p.box(100);
    p.pop();
  };
};

export default App;
