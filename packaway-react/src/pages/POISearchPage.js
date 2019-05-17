import React, { Component } from 'react'
import SearchPanel from '../components/SearchPanel'
import CategoryPanel from '../components/CategoryPanel';
import {withRouter} from 'react-router-dom'

import './POISearchPage.scss'

class POISearchPage extends Component {

  render() {
    const city = this.props.match.params.cityId
    return (
      <div>
        <h1 className="search-city-name">{city}</h1>
        <CategoryPanel />
        <SearchPanel />
      </div>
    )
  }
}

export default withRouter(POISearchPage);