import React, { Component } from 'react'

import {
    Autocomplete
} from '@react-google-maps/api'


class HotelSearch extends Component {
    constructor(props) {
        super(props)
        this.onLoad = this.onLoad.bind(this)
        this.onPlaceChanged = this.onPlaceChanged.bind(this)
    }

    onLoad(autocomplete) {
        console.log('autocomplete: ', autocomplete)

        this.autocomplete = autocomplete

        this.autocomplete.addListener('place_changed', this.onPlaceChanged);

    }

    onPlaceChanged() {
        console.log("holi!")
        if (this.autocomplete !== null) {
            console.log(this.autocomplete.getPlace())
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }


    render() {
        return (
                <Autocomplete
                    onLoad={this.onLoad}
                    onPlacesChanged={this.onPlaceChanged}
                >
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "absolute",
                            left: "50%",
                            marginLeft: "-120px"
                        }}
                    />
                </Autocomplete>
        )
    }

}
export default HotelSearch