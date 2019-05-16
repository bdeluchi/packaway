import React, { Component } from "react";
import withPack from "../../helpers/withPack";
import withPOI from "../../helpers/withPOI";
import withDay from "../../helpers/withDay";
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
    const { packId } = this.props.match.params;
    if (packId) {
      const pack = await DataService.getPack(packId);
      const { unassignedPois, days } = pack;
      // if (Object.keys(this.props.pois).length === 0) {
      //   console.log("my pois", unassignedPois)
        Object.values(unassignedPois).forEach(poi => {
          this.props.addUnassignedPois(poi);
          this.props.setPoiInfo(poi)
          }
        );
      // }
      if (days) {
        Object.values(days).map(day => this.props.addDays(day));
        this.props.updateNumberOfDays(days.length);
      }
      this.setState({ pack });
    }
  } 

  async componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.props.resetDayStatus();
  }

  render() {
    const { pack } = this.state;
    const { unassignedPois } = this.props;
    return (
      <div>
        {pack && unassignedPois && (
          <div>
            <InfoPanel packName={pack.name} packCity={pack.city} />
            <h2>My list of POIs</h2>
            <div>
              {Object.entries(unassignedPois).map(([key, value]) => (
                <POIListItem key={value.id} poi={value} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withDay(withPOI(withRouter(withPack(MyPOIList))));
