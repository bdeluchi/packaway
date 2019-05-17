import React, { Component } from "react";
import withDay from "../../helpers/withDay";
import withPOI from "../../helpers/withPOI";

import './index.scss'

class POIListItem extends Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();

    this.state = {
      open: false
    };
  }

  handleDropdown = () => {
    this.setState(state => {
      return {
        open: !state.open
      };
    });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false
      });
    }
  };

  handleMove = day => {
    const { days } = this.props;
    const { poi } = this.props;
    const selectedDay = Object.values(days).filter(ele => ele.dayId === day)[0];
    this.props.addPoiToDay(selectedDay.dayId, poi);
  };

  handleMoveToList = () => {
    const { poi, dayId } = this.props;
    this.props.returnPoiToUnassigned(poi);
    this.props.removePoiFromDay(poi, dayId)
  }

  render() {
    const { poi, unassignedPois, days } = this.props;
    const { open } = this.state;
    return (
      <div>
        <div
          className="dropdown-container"
          ref={this.container}
          onClick={this.handleDropdown}
        >
          <div className="poi-item">{poi.name}
          {/* TODO: should fix days issue in css due to padding */}
          {days.length !== 0 && open && (
              <div className="ref-dropdown">
              <ul className="days-dropdown">
                {days.map(ele => (
                  <li 
                    className="days-dropdown-item"
                    onClick={() => this.handleMove(ele.dayId)}
                    key={ele.dayId}
                  >
                    Day {ele.dayId}
                  </li>
                ))}
                  {!Object.keys(unassignedPois).includes(poi.id) && 
                  <li 
                    className="days-dropdown-item" 
                    onClick={() => this.handleMoveToList()}>Return to List</li>}
              </ul>
              </div>
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default withPOI(withDay(POIListItem));
