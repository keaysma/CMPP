import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import * as p5 from 'p5';
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom.js";

class Viewer extends Component {
  render() {
    return (
      <div className="Viewer">
        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}

export function sketch (p) {
  let rotation = 0;

  let video;

  p.setup = function () {
    let canvas = p.createCanvas(0,0);
    //canvas.parent('root');
    video = p.createCapture({
      audio: false,
      video: {
        facingMode: "user"
      }
    });
    video.size(p.windowWidth, p.windowHeight);
  };

  /*p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation){
      rotation = props.rotation * Math.PI / 180;
    }
  };*/

  p.draw = function () {
    console.log(video.get(40,20));
  };
};
/*
export function sketch (p) {
  let rotation = 0;

  p.setup = function () {
    p.createCanvas(1000, 1000, p.WEBGL);
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
};*/

export default Viewer;
