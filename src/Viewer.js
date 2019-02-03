import React, { Component } from 'react';
import crosshair from './assets/crosshair.png';
import P5Wrapper from 'react-p5-wrapper';
// const crosshair = require('./assets/crosshair.png');
// import p5 from 'p5';

class Viewer extends Component {
  render() {
    return (
      <div className="Viewer">
        <P5Wrapper sketch={sketch} />
        <img src={crosshair} height="50" width="50" alt='X' />
      </div>
    );
  }
};

export function sketch (p) {
  let crosses = [
    { x: 50, y: 50},
    { x: 100, y: 100},
    { x: 150, y: 150},
    { x: 200, y: 200},
    { x: 250, y: 250},
    { x: 300, y: 300},
  ];
  let cross;

  p.preload = () => {
    cross = p.loadImage({crosshair});
  };

  p.setup = () => {
    p.createCanvas(700, 700);
  };

  p.draw = () => {
    crosses.forEach(c => {
      p.image(cross, c.x, c.y, 50, 50);
    });
  };

  p.mousePressed = () => {

  };

  p.mouseDragged = () => {

  };
}

export default Viewer;