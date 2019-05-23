import React, { Component } from 'react'
import PackItem from '../../components/PackItem';
import withUser from '../../helpers/withUser'
import DataService from '../../services/data'
import "./PackOverviewPage.scss";


class PackOverviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packIds: null
    }
  }
  

  async getPacks() {
    const {userInfo} = this.props
    if (userInfo !== null) {
      const userId = userInfo.uid
      const user = await DataService.getObjectDetail("users", userId);
      const packIds = user.packs
      this.setState({packIds})
    }
  }

  deletePackId = (packId) => {
    let {packIds} = this.state;
    packIds = packIds.filter(pack => packId !== pack);
    this.setState({packIds})
  }
  
  
  async componentDidMount() {
    if (this.props.userInfo){
      this.getPacks();
    }
  }
  
  componentDidUpdate(prevProps){
    if (prevProps.userInfo === null && this.props.userInfo !== null) {
      this.getPacks()
    }
  }



  render() {
    const {packIds} = this.state;
    return (
      <div className="my-packs-container">
        <h1 className="page-title">My Packs</h1>
        {packIds && <div className="my-packs-content">
          {packIds.map(packId => <PackItem key={packId} packId={packId} deletePackId={this.deletePackId}/>)}
        </div>}
      </div>
    )
  }
}

export default withUser(PackOverviewPage)