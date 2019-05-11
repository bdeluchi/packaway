import React, { Component } from "react";
import withDay from "../../helpers/withDay";

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

  render() {
    const { poiName, poiId } = this.props;
    const { open } = this.state;
    console.log(this.props)

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
                {<li>Option1</li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withDay(POIListItem)