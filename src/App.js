import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import p5 from 'p5';
import logo from './assets/logo.svg';
import './static/App.css';
import Viewer from './Viewer';
import { Noiser, jukebox } from './Noiser';
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom";

var cam;

class App extends Component {
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
	  this.updatePixels()
	, 0.01);
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
    return (
		<div>
		<P5Wrapper sketch={sketch} />
		</div>
    );
  }
}

export function sketch (p) {
  let rotation = 0;

  p.setup = function () {
    p.createCanvas(0, 0);
    //cam = p.createCapture(p5.VIDEO);
    cam = p.createCapture({
		audio: false,
		video: {
			facingMode: "user"
		}
	});
	cam.size(p.windowWidth, p.windowHeight);
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
    //p.box(100);
    p.pop();
  };
};

export default App;
