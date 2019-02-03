import React, { Component } from 'react';
import "p5/lib/addons/p5.sound";
import P5Wrapper from 'react-p5-wrapper';
import p5 from 'p5';

class Noiser extends Component {
  //let o;
  constructor(){
    super();
  	this.soundStateChange = this.soundStateChange.bind(this);
    this.freqChange = this.freqChange.bind(this);
    this.state = {
      freq: 440,
      vol: 1.0,
    };
    this.o = jukebox();
    this.o.start();
  }
  soundStateChange() {
    this.setState((state) => {
      return {vol: 1 - state.vol}
    });
    this.o.amp(this.state.vol);
  }
  freqChange(event) {
    event.preventDefault();
    console.log(event);
    this.setState({freq: event.target.valueAsNumber});
    this.o.freq(this.state.freq);
  }

  render() {
    return (
      <div className="App">
        <P5Wrapper sketch={sketch} />
	    <input id="typeinp" type="range" min="420" max="1567.98" value={this.state.freq} onChange={(e) => this.freqChange(e)} step="1"/>
      <button onClick={this.soundStateChange}>I/O</button>
      </div>
    );
  }
}


export function sketch (p) {
  let rotation = 0;

  p.setup = function () {
    p.createCanvas(1, 1, p.WEBGL);
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
    p.pop();
  };
};

export function jukebox(p){
	var o;
	o = new p5.Oscillator();
	o.setType('sawtooth');
	o.freq(440);
	o.amp(0.8);
	return o;
}

export default Noiser;
