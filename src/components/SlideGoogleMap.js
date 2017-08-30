/* eslint-disable no-undef */

import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
var mapStyle = require('../assets/morningJson.json')

class SlideGoogleMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.loadData = this
            .loadData
            .bind(this)
    }

    loadData() {

        var url = "/report/carpp/all/status"

        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const data = response.data.Data

                    var indents = [];
                    for (var i = 0; i < data.length; i++) {
                        indents.push(<Marker
                            key={data[i].Code}
                            position={{
                            lat: data[i].Lat,
                            lng: data[i].Lng
                        }}/>);
                    }

                    this.setState({data: indents})
                } else {
                    this.setState({data: []})
                }

            })
            .catch((error) => {});
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        const {data} = this.state;
        return (
            <div>
                <Map
                    google={this.props.google}
                    styles={mapStyle}
                    initialCenter={{
                    lat: 21.021774,
                    lng: 105.849469
                }}
                    zoom={16}>
                    {this
                        .state
                        .data
                        .map(marker => (<Marker
                            {...marker.props}
                            label={{
                            text: marker.key,
                            color: "white"
                        }}
                            icon={{
                            url: process.env.PUBLIC_URL + '/assets/global/img/marker.png',
                            anchor: new google
                                .maps
                                .Point(37, 130),
                            scaledSize: new google
                                .maps
                                .Size(73, 130)
                        }}/>))}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({apiKey: "AIzaSyAQWAq_kPrTMQhW4-1jhupewiUC6XkCCLc"})(SlideGoogleMap)