import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import "react-p5-wrapper/node_modules/p5/lib/addons/p5.dom.js";
import AvCanvas from './AvCanvas';

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [
        { x: 50, y: 50, radius: 10, color:' #000', active: false },
        { x: 150, y: 50, radius: 10, color:' #000', active: false },
        { x: 250, y: 50, radius: 10, color:' #000', active: false },
        { x: 50, y: 150, radius: 5, color:' #F00', active: false },
        { x: 150, y: 150, radius: 5, color:' #F00', active: false },
        { x: 250, y: 150, radius: 5, color:' #F00', active: false }
      ],
    }
  }

  // setup = () => {
      // const canvas = p.createCanvas(0,0);
      // p.createCanvas(1000, 1000);
      // p.ellipseMode(p.RADIUS);
      // p.background(200);
      // video = p.createCapture({
      //   audio: false,
      //   video: {
      //     facingMode: "user"
      //   }
      // });
      // video.size(p.windowWidth, p.windowHeight);
  // }
  render() {
    console.log('yeet');

    return (
      <div className="Viewer">
        {/* <P5Wrapper sketch={sketch} /> */}
        <AvCanvas points={this.state.points} />
      </div>
    );
  }
};

// export function sketch (p) {
//   p.setup = () => {
//     // const canvas = p.createCanvas(0,0);
//     p.createCanvas(1000, 1000);
//     p.ellipseMode(p.RADIUS);
//     // p.background(200);
//     // video = p.createCapture({
//     //   audio: false,
//     //   video: {
//     //     facingMode: "user"
//     //   }
//     // });
//     // video.size(p.windowWidth, p.windowHeight);
//   }
//   p.draw = () => {
//     p.background('#fff');
//     for (let i = 0; i < this.state.points.length; i++) {
//        let circle = this.state.points[i];
//        p.noStroke();
//        p.fill(circle.color);
//        p.ellipse(circle.x, circle.y, circle.radius, circle.radius);
// 		}
//     // crosses.forEach(c => {
//     //   p.image(cross, c.x, c.y, 50, 50);
//     // });
//     // p.loadImage({crosshair}, img => {
//     //   p.image(img, 0, 0);
//     // });
//   }
//   p.mousePressed = () => {
//     if (this.state.points.length > 0) {
// 		for (let i = 0; i < this.state.points.length; i++) {
// 			let circle = this.state.points[i],
// 					distance = p.dist(p.mouseX, p.mouseY, circle.x, circle.y);
// 			if (distance < circle.radius) {
//         console.log("circle " + i + " is active");
//         circle.active = true;
// 				circle.color = '#f00';
// 			} else {
// 				circle.active = false;
// 				circle.color = '#000';
// 			}
// 		}
//     }
//     // Prevent default functionality.
//     return false;
//   }
//   p.mouseDragged = () => {
//     if (this.state.points.length > 0) {
//       for (var i = 0; i < this.state.points.length; i++) {
//         var circle = this.state.points[i];
//         if (circle.active) {
//           circle.x = p.mouseX;
//           circle.y = p.mouseY;
//           break;
//         }
//       }
//     }
//     // Prevent default functionality.
//     return false;
//   };
// };

export default Viewer;
