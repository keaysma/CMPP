import React, { Component } from 'react';
import Viewer from './Viewer';
import { Noiser, jukebox } from './Noiser';
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom";
import AvCanvas from './AvCanvas'

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
};

export default class App extends Component {
  render() {
    return (
      <div>
        <Viewer />
        {/* <AvCanvas /> */}
      </div>
    )
  }
}
