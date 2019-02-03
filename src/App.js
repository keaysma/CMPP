import React, { Component } from 'react';
import Viewer from './Viewer';
import Sidebar from './Sidebar';

export default class App extends Component {
  render() {
    return (
      <div>
        <Viewer />
				{/* <AvCanvas /> */}
				{/* <Sidebar /> */}
      </div>
    )
  }
}
