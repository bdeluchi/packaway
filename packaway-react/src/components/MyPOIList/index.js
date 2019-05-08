import React, { Component } from "react";
import withPack from "../../helpers/withPack";
import DataService from "../../services/data";
import POIListItem from "../POIListItem";

class MyPOIList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pack: null
    };
  }

  async getData() {
    const { currentPack } = this.props;
    if (currentPack) {
      const pack = await DataService.getPack(currentPack);
      this.setState({ pack });
    }
  }

  async componentDidMount() {
    this.getData();
  }

  async componentDidUpdate(prevProps) {
    const { currentPack } = this.props;
    if (!prevProps.currentPack && currentPack) {
      this.getData();
    }
  }

  render() {
    const { pack } = this.state;
    pack && console.log("this my pack");
    return (
      <div>
        <h1>My list of POIs</h1>
        <div>
          {pack &&
            Object.entries(pack.poiList).map(([key, value]) => (
              <POIListItem key={value.id} poiName={value.name} poiId={value.id} />
            ))}
        </div>
      </div>
    );
  }
}

export default withPack(MyPOIList);
