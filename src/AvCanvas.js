import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import p5 from 'p5';
import logo from './assets/logo.svg';
// import P5Wrapper from 'react-p5-wrapper';
// import logo from './assets/logo.svg';
import './static/App.css';
import Viewer from './Viewer';
import { Noiser, jukebox } from './Noiser';
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom";

var cam;

class AvCanvas extends Component {
  constructor(props){
    super(props);

    this.state = {
      x: 0,
      y: 0,
      x2: 150,
        y2: 150
    };

    this.o = jukebox();
    this.o2 = jukebox();
    this.o2.setType('sine');
    this.o.start();
    this.o2.start();
    this.updatePixels = this.updatePixels.bind(this);
    this.timer = setInterval(() =>
      this.updatePixels(), 0.01);
  }

  updatePixels(){
    if(cam){
      let p = cam.get(this.state.x,this.state.y,this.state.x+1,this.state.y+1);
      let x = 440 + (606.5*((p[0] + p[1] + p[2])/(3*255)));
      let p2 = cam.get(this.state.x2,this.state.y2,1,1);
      let x2 = 440 + (606.5*((p2[0] + p2[1] + p2[2])/(3*255)));
      this.setState((state) => {return {point: x}})
      console.log(p2);
      this.o.freq(x);
      this.o2.freq(x2);
    }
  }

  render() {
    console.log('yeet');
    console.log(this.props.points);
    return (
      <div>
          <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}

export function sketch (p) {
  let rotation = 0;
  let capture;

  p.setup = function () {
    p.createCanvas(1000, 1000);
    p.background(0);
    capture = p.createCapture(p.VIDEO);
    capture.size(1000,1000);
    capture.hide();
    // p.background(0);
    // cam = p.createCapture({
    //   audio: false,
    //   video: {
    //     facingMode: "user"
    //   }
    // });
    // cam.size(1000, 1000);
    // p.createCanvas(200,200);
    // capture = p.createCapture(p.VIDEO)
    // capture.size(200,200)
  };

  // p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
  //   if (props.rotation){
  //     rotation = props.rotation * Math.PI / 180;
  //   }
  // };

  p.draw = function () {
    // p.background(100);
    // p.noStroke();
    // p.push();
    // p.rotateY(rotation);
    //p.box(100);
    // p.pop();
    //Original video slides horizontally
    // capture.position(p.mouseX,p.mouseY);

    //pixels drawn on canvas using image function remains static and inverted(filter);
    p.image(capture,0,0,1200,1000);
    p.filter(p.INVERT);
  };
};

export default AvCanvas;
