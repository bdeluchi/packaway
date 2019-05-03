// coger todos los poiitem que son true
import React, { Component } from 'react';

export default class PackCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
  }
  
  render() {
    return (
      <div>
        My Pack
      </div>
    );
  }
}

