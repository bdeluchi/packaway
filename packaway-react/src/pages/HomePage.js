import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./HomePage.scss"

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="main-image-container">
          <img className="main-image" src ={process.env.PUBLIC_URL + "/assets/image_cover.jpg"} alt="sagrada familia main" />
        </div>
          <div className="home-title-container"><h1 className="home-title">Planning a trip?</h1></div>
        <h2 className="home-subtitle">Pick a city and start packing!</h2>
        <ul className="city-btn-container">
          <li className="city-btn">
            <Link to={{
              pathname: '/poisearch/barcelona'
            }}>Barcelona</Link>
          </li>
          <li className="city-btn"><Link to='#'>Madrid</Link></li>
          <li className="city-btn"><Link to='#'>Salamanca</Link></li>
        </ul>
      </div>
    );
  }
}
