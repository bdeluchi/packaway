import React, { Component } from "react";
import { Link } from "react-router-dom";

import withPack from '../helpers/withPack'
import withDay from '../helpers/withDay'
import withPOI from '../helpers/withPOI'

import "./HomePage.scss"

class HomePage extends Component {

  
  resetCity = () => {
    this.props.resetDayStatus();
    this.props.resetUnassigned();
    this.props.resetCurrentPack();
    this.props.resetCart()
  }

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
            }} onClick={this.resetCity}>Barcelona</Link>
          </li>
          <li className="city-btn"><Link to={{
              pathname: '/poisearch/madrid'
            }} onClick={this.resetCity}>Madrid</Link></li>
          <li className="city-btn"><Link to={{
              pathname: '/poisearch/salamanca'
            }} onClick={this.resetCity}>Salamanca</Link></li>
           <li className="city-btn"><Link to={{
              pathname: '/poisearch/amsterdam'
            }} onClick={this.resetCity}>Amsterdam</Link></li>
           <li className="city-btn"><Link to={{
              pathname: '/poisearch/tokyo'
            }} onClick={this.resetCity}>Tokyo</Link></li>
        </ul>
      </div>
    );
  }
}


export default withPOI(withPack(withDay(HomePage)));