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
var points;

class AvCanvas extends Component {
  constructor(props){
    super(props);
    points = this.props.points;

    this.state = {
      x: 0,
      y: 0,
      x2: 150,
      y2: 150,
      points: [
        { x: 50, y: 50, radius: 10, color:' #000', active: false },
        { x: 150, y: 50, radius: 10, color:' #000', active: false },
        { x: 250, y: 50, radius: 10, color:' #000', active: false },
        { x: 50, y: 150, radius: 10, color:' #000', active: false },
        { x: 150, y: 150, radius: 10, color:' #000', active: false },
        { x: 250, y: 150, radius: 10, color:' #000', active: false }
      ],
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
    console.log(this.state.points);
    return (
      <div>
          <P5Wrapper sketch={sketch} points={this.state.points} />
      </div>
    );
  }
}

export function sketch (p) {
  // let rotation = 0;
  let capture;

  p.setup = function () {
    p.createCanvas(1000, 1000);
    // p.background(0);
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

  p.draw = function (props) {
    console.log(capture.get(points[0].x, points[0].y));
    
    //Original video slides horizontally
    // capture.position(p.mouseX,p.mouseY);
    // console.log(capture.get(p.mouseX,p.mouseY));

    //pixels drawn on canvas using image function remains static and inverted(filter);
    p.image(capture,0,0,1200,1000);
    // p.ellipse(100,100,200,200);
    // p.ellipse(400,400,200,200);
    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      p.ellipse(point.x, point.y, point.radius, point.radius)
    }
    p.filter(p.INVERT);
  };
  p.mousePressed = () => {
    if (points.length > 0) {
		for (let i = 0; i < points.length; i++) {
			let circle = points[i],
					distance = p.dist(p.mouseX, p.mouseY, circle.x, circle.y);
			if (distance < circle.radius) {
        console.log("circle " + i + " is active");
        circle.active = true;
				circle.color = '#f00';
			} else {
				circle.active = false;
				circle.color = '#000';
			}
		}
    }
    // Prevent default functionality.
    return false;
  }
  p.mouseDragged = () => {
    if (points.length > 0) {
      for (var i = 0; i < points.length; i++) {
        var circle = points[i];
        if (circle.active) {
          circle.x = p.mouseX;
          circle.y = p.mouseY;
          break;
        }
      }
    }
    // Prevent default functionality.
    return false;
  };
};

export default AvCanvas;
