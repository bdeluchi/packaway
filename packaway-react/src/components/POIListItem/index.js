import React, { Component } from "react";
import withDay from "../../helpers/withDay";
import withPOI from "../../helpers/withPOI";

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

  render() {
    const { poi, days } = this.props;
    const { open } = this.state;
    return (
      <div>
        <div
          className="dropdown-container"
          ref={this.container}
          onClick={this.handleDropdown}
        >
          <div className="poi-item">{poi.name}</div>
          {open && (
            <div className="dropdown">
              <ul>
                {days.map(ele => (
                  <li
                    onClick={() => this.handleMove(ele.dayId)}
                    key={ele.dayId}
                  >
                    Day {ele.dayId}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withPOI(withDay(POIListItem));
