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
var tune = [
	{base: 82.41, max: 82.40},		//E2
	{base: 196.00, max: 196.00},	//G3
	{base: 130.81, max: 130.80},	//C3
	{base: 0, max: 10},
	{base: 0, max: 10},
	{base: 0, max: 10}
];

class AvCanvas extends Component {
  constructor(props){
    super(props);
	this.initiateBoxes = this.initiateBoxes.bind(this);

    points = this.props.points;
    this.state = {
      jukeboxes: []
    };
    this.initiateBoxes();
    this.updatePixels = this.updatePixels.bind(this);
    this.timer = setInterval(() => this.updatePixels(), 0.01);
  }

  initiateBoxes() {
    const waveTypes = ['sine', 'triangle', 'sawtooth'];
    let boxes = []
    for (let index = 0; index < 3/*this.state.jukeboxes.length*/; index++) {
      let currbox = {box: jukebox(), rgba: points[index]}
      currbox.box.setType = waveTypes[Math.floor(Math.random()*waveTypes.length)];
      currbox.box.start();
      boxes.push(currbox);
    }
	/*for (let index = 3; index < 6; index ++){
      let currbox = {box: jukebox(), rgba: points[index]}
      currbox.box.setType = waveTypes[Math.floor(Math.random()*waveTypes.length)];
      currbox.box.freq(10);
	  currbox.box.amp(200);
	  currbox.box.disconnect();
	  currbox.box.start();
	  boxes[index-3].box.freq(currbox.box);
      boxes.push(currbox);
	}*/
	this.state = {jukeboxes : boxes};
	console.log(this.state);
  }

  updatePixels(){
    if(cam){
      // let p = cam.get(this.state.x,this.state.y,this.state.x+1,this.state.y+1);
      // let x = 440 + (606.5*((p[0] + p[1] + p[2])/(3*255)));
      // let p2 = cam.get(this.state.x2,this.state.y2,1,1);
      // let x2 = 440 + (606.5*((p2[0] + p2[1] + p2[2])/(3*255)));

      // this.jukeboxes.forEach(box => {
      //   box.rgba = cam.get(points[index].x, points[index].y, points[index].x + 1, points[index].y + 1);
      //   box.tuning.freq(440 + (606.5*((box.rgba[0] + box.rgba[1] + box.rgba[2])/(3*255))));
      // });
      for (let index = 0; index < this.state.jukeboxes.length; index++) {
        const box = this.state.jukeboxes[index];
        box.rgba = cam.get(points[index].x, points[index].y, 1, 1);
        let x = tune[index]['base'] + (tune[index]['max']*((box.rgba[0] + box.rgba[1] + box.rgba[2])/(3*255)));
        box.box.freq(x);
      }
      //console.log(this.state.jukeboxes);
      
      // this.setState((state) => {return {point: x}})
      // console.log(p2);
      // this.o.freq(x);
      // this.o2.freq(x2);
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
  // let capture;

  p.setup = function () {
    p.createCanvas(1000, 1000);
    // p.background(0);
    cam = p.createCapture(p.VIDEO);
    cam.size(1000,1000);
    cam.hide();
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
    // console.log(cam.get(points[0].x, points[0].y));
    
    //Original video slides horizontally
    // capture.position(p.mouseX,p.mouseY);
    // console.log(capture.get(p.mouseX,p.mouseY));

    //pixels drawn on canvas using image function remains static and inverted(filter);
    p.image(cam,0,0,1200,1000);
    // p.ellipse(400,400,200,200);
    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      p.ellipse(point.x, point.y, point.radius, point.radius)
    }
    //p.filter(p.INVERT);
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
