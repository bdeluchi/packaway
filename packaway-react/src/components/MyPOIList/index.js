import React, { Component } from "react";
import withPack from "../../helpers/withPack";
import withPOI from "../../helpers/withPOI";
import DataService from "../../services/data";
import POIListItem from "../POIListItem";
import InfoPanel from "../InfoPanel";
import { withRouter } from "react-router-dom";

class MyPOIList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pack: null
    };
  }

  async getData() {
    const { packId } = this.props.match.params
    if (packId) {
      const pack = await DataService.getPack(packId);
      const pois = pack.days.unassignedPois
      if (Object.keys(this.props.pois).length === 0) {
        Object.values(pois).forEach(poi => this.props.setPoiInfo(poi))
      }
      this.setState({ pack });
    }
  }

  async componentDidMount() {
    this.getData();
  }

  // async componentDidUpdate(prevProps) {
  //   const { currentPack } = this.props;
  //   if (!prevProps.currentPack && currentPack) {
  //     this.getData();
  //   }
  // }

  render() {
    const { pack } = this.state;
    return (
      <div>
        {pack && (
          <div>
            <InfoPanel packName={pack.name} />
            <h2>My list of POIs</h2>
            <div>
              {Object.entries(pack.days.unassignedPois).map(([key, value]) => (
                <POIListItem
                  key={value.id}
                  poiName={value.name}
                  poiId={value.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withPOI(withRouter(withPack(MyPOIList)));
