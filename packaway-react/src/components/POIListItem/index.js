import React, { Component } from "react";
import withDay from "../../helpers/withDay";
import { addDays } from "../../redux/actions/dayActions";

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
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        open: false,
      });
    }
  };

  handleMove = (day) => {
    console.log(day)
  }

  render() {
    const { poiName, poiId, days } = this.props;
    const { open } = this.state;

    return (
      <div>
        <div
          className="dropdown-container"
          ref={this.container}
          onClick={this.handleDropdown}
        >
          {poiName}
          {open && (
            <div className="dropdown">
              <ul>
                {days.map(ele => <li onClick={() => this.handleMove(ele.day)} key={ele.day} >Day {ele.day}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withDay(POIListItem)