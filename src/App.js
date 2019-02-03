import React, { Component } from 'react';
import Viewer from './Viewer';
import AvCanvas from './AvCanvas'

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
