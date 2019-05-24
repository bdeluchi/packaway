import React, { Component } from 'react'
import withPack from '../../helpers/withPack'

import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer
} from '@react-google-maps/api'

import './DirectionsItem.scss'


class DirectionsItem extends Component {
  state = {
    response: null,
    travelMode: 'WALKING',
    origin: '',
    destination: ''
  }

  directionsCallback = response => {
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  handleCalculateRoute = () => {
      this.setState(
        () => ({
          origin: this.props.location,
          destination: this.props.location
        })
      )
  }

  render() {    
    const {waypoints} = this.props
    return (
    <div className='map'>
      <div className='map-settings'>
        <button className='btn build-route-btn' type='button' onClick={this.handleCalculateRoute}>
          Build Route
        </button>
      </div>
      <div className='map-container'>
        <GoogleMap className="direction-container"
          id='direction-example'
          mapContainerStyle={{
            height: "90vw",
            width: "90vw"
          }}
          zoom={5}
          center={{
            lat: 40.404622,
            lng: -3.732098
          }}
        >
          {
            (
              this.state.destination !== '' &&
              this.state.origin !== ''
            ) && (
              <DirectionsService
                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  destination: this.state.destination,
                  origin: this.state.origin,
                  travelMode: this.state.travelMode,
                  waypoints: 
                   waypoints.map(function (location) {
                    return {location: location, stopover: false}
                  })
                  
               
                }}
                callback={this.directionsCallback}
              />
            )
          }

          {
            this.state.response !== null && (
              <DirectionsRenderer
                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  directions: this.state.response
                }}
              />
            )
          }
        </GoogleMap>
      </div>
    </div>
  )
}
}

export default withPack(DirectionsItem);