import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import * as p5 from 'p5';
import "p5/lib/addons/p5.dom";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}

export function sketch (p) {
  let rotation = 0;

  p.setup = function () {
    p.createCanvas(300,300,);
    p.createCapture(p5.VIDEO);
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
