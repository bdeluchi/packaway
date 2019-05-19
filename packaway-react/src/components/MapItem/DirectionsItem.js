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
    destination: '',
    waypoints: []
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

  // handleCalculateRoute = () => {
  //     this.setState(
  //       () => ({
  //         origin: point1,
  //         destination: point2
  //       })
  //     )
  // }

  render() {
    console.log(this.props.waypoints)
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
          zoom={13}
          center={{
            lat: 41.4024661,
            lng: 2.1481763
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
                  travelMode: this.state.travelMode
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