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
    // (le paso el pack completo así si se hace clic esté disponible en state y pueda enviarlo a redux para actualizar)
    //cuadno se hace click, el clickado es el nuevo currentPack en redux por lo que tendré que actualizar todo redux
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
          {packIds.map(packId => <PackItem key={packId} packId={packId}/>)}
        </div>}
      </div>
    )
  }
}

export default withUser(PackOverviewPage)