import React, { Component } from "react";
import withPack from "../../helpers/withPack";
import DataService from "../../services/data";

class EditPackPage extends Component {
  async getData() {
    const { currentPack } = this.props;
    if (currentPack) {
      const pack = await DataService.getPack(currentPack);
      console.log(pack);
    }
  }

  async componentDidMount() {
    console.log(this.props);
    this.getData();
  }

  //no está ejecutándose
  async componentDidUpdate(prevProps) {
    const { currentPack } = this.props;
    console.log("componentdidupdate");
    if (!prevProps.currentPack && currentPack) {
      this.getData();
    }
  }

  render() {
    console.log("primer render", this.props);
    return (
      <div>
        <h1>Your list of POIs</h1>
      </div>
    );
  }
}

export default withPack(EditPackPage);
