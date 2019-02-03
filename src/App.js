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
var firstSlider, secondSlider, thirdSlider, fourthSlider;
var sidebar;

class App extends Component {
  constructor(props){
    super(props);

	this.state = {
		x: 0,
		y: 0,
		x2: 200,
	    y2: 200
	};

	//Frequency modulation
	this.car = jukebox();
	this.car.setType('square');
	this.car.amp(0);
	this.car.freq(220);
	this.car.start();
	this.mod = jukebox();
	this.mod.setType('sawtooth');
	this.mod.freq(10);
	this.mod.amp(200);
	this.mod.start();
	this.mod.disconnect();
	this.car.freq(this.mod);
	this.car.amp(0.5);

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
	  let x = 98.00 + (294.00*((p[0] + p[1] + p[2])/(3*255)));
	  let p2 = cam.get(this.state.x2,this.state.y2,1,1);
	  let x2 = 130.81 + (130.82*((p2[0] + p2[1] + p2[2])/(3*255)));
	  this.setState((state) => {return {point: x}})
	  console.log(p2);
	  //For fancy modulation
	  this.mod.setType(((firstSlider.value() + secondSlider.value() + thirdSlider.value())/(3*255)) > 0.5 ? 'sine' : 'sawtooth');
	  this.mod.freq(10*((firstSlider.value()+secondSlider.value()+thirdSlider.value())/(3*255)));
	  this.car.freq(fourthSlider.value());
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
		sidebar = p.createGraphics(100,p.windowHeight);
    sidebar.position(0,0);
    //cam = p.createCapture(p5.VIDEO);
    cam = p.createCapture({
		audio: false,
		video: {
			facingMode: "user"
		}
	});
	cam.size(p.windowWidth, p.windowHeight);
	cam.position((p.windowWidth)/8,0);
  
  firstSlider = p.createSlider(-1000, 1000, 45);
  firstSlider.position(30,50);
  firstSlider.size(250);
  secondSlider = p.createSlider(-1000, 1000, 45);
  secondSlider.position(30,150);
  secondSlider.size(250);
  thirdSlider = p.createSlider(-1000, 1000, 45);
  thirdSlider.position(30,250);
  thirdSlider.size(250);
  fourthSlider = p.createSlider(-1000, 1000, 45);
  fourthSlider.position(30,350);
  fourthSlider.size(250);
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

		//p.text('AUX 1', p.displayWidth * 0.25, 100);
		
		// sidebar.background(255, 204, 0);
    // sidebar.noStroke();
    // p.image(sidebar, 50, 50);
    // p.image(sidebar, 0, 0, 50, 50);
  };
};

export default App;
