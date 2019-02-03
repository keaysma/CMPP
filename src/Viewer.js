import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import p5 from 'p5';
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom";
// import "./Draggable";
// import Draggable from './Draggable';

class Viewer extends Component {
  render() {
    return (
      <div className="Viewer">
        <P5Wrapper sketch={sketch} />
        {/* <img src={crosshair} height="50" width="50" alt='X' /> */}
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
  let circles = [
	{ x: 50, y: 50, radius: 20, color:' #000',},
	{ x: 150, y: 50, radius: 20, color:' #000',},
	{ x: 250, y: 50, radius: 20, color:' #000',},
	{ x: 50, y: 150, radius: 20, color:' #000',},
	{ x: 150, y: 150, radius: 20, color:' #000',},
	{ x: 250, y: 150, radius: 20, color:' #000',}
];

  // p.preload = () => {
    // cross = p.loadImage({crosshair});
  // };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.ellipseMode(p.RADIUS);
  };

  p.draw = () => {
    p.background('#fff');
    for (let i = 0; i < circles.length; i++) {
			let circle = circles[i];
			p.noStroke();
			p.fill(circle.color);
			p.ellipse(circle.x, circle.y, circle.radius, circle.radius);
		}
    // crosses.forEach(c => {
    //   p.image(cross, c.x, c.y, 50, 50);
    // });
    // p.loadImage({crosshair}, img => {
    //   p.image(img, 0, 0);
    // });
  };

  p.mousePressed = () => {
    if (circles.length > 0) {
		for (var i = 0; i < circles.length; i++) {
			var circle = circles[i],
					distance = p.dist(p.mouseX, p.mouseY, circle.x, circle.y);
			if (distance < circle.radius) {
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
  };

  p.mouseDragged = () => {
    if (circles.length > 0) {
      for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
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
};*/

export default Viewer;
