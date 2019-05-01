import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <h2>Pick a city and start packing!</h2>
        <ul>
          <li>
            <Link to="/poisearch">Barcelona</Link>
          </li>
          <li>Madrid</li>
          <li>Salamanca</li>
        </ul>
      </div>
    );
  }
}
