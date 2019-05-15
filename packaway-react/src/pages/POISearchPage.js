import React, { Component } from 'react'
import SearchPanel from '../components/SearchPanel'
import CategoryPanel from '../components/CategoryPanel';

import './POISearchPage.scss'

export default class POISearchPage extends Component {

  render() {
    return (
      <div>
        <h1 className="search-city-name">City name</h1>
        <CategoryPanel />
        <SearchPanel />
      </div>
    )
  }
}