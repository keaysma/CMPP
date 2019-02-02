import React, { Component } from 'react';
import crosshair from './assets/crosshair.png';

class Viewer extends Component {
  render() {
    return (
      <div className="Viewer">
        <img src={crosshair} height="50" width="50" alt='X' />
      </div>
    );
  }
};

export default Viewer;