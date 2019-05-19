import React, { Component } from 'react'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer
} from '@react-google-maps/api'

class DirectionsItem extends Component {
  state = {
    response: null,
    travelMode: 'WALKING',
    origin: '',
    destination: ''
  }

  directionsCallback = response => {
    console.log(response)

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
          origin: {lat: 40.4209517, lng: -3.7080847},
          destination: {lat: 40.4209517, lng: -3.7080847}
        })
      )
  }

  render() {    
    const {waypoints} = this.props
    return (
    <div className='map'>
      <div className='map-settings'>
        <button className='btn btn-primary' type='button' onClick={this.handleCalculateRoute}>
          Build Route
        </button>
      </div>

      <div className='map-container'>
        <GoogleMap
          id='direction-example'
          mapContainerStyle={{
            height: "500px",
            width: "500px"
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

export default DirectionsItem