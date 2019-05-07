import React, { Component } from 'react'
import SearchPanel from '../components/SearchPanel'
import CategoryPanel from '../components/CategoryPanel';

export default class POISearchPage extends Component {

  render() {
    return (
      <div>
        <CategoryPanel />
        <SearchPanel />
      </div>
    )
  }
}