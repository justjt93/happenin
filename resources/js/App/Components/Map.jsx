import React from "react";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from "react-google-maps";

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.renderMap = this.renderMap.bind(this);
        this.state = {
            data: [
                {
                    id: 1
                }
            ]
        };
    }
    renderMap = () => {
        // console.log(this.state.data[0].latitude);
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: 50.095593, lng: 14.358506 }}
            >
                {this.state.data.map(event => (
                    <Marker
                        key={event.id}
                        position={{
                            lat: event.latitude,
                            lng: event.longitude
                        }}
                    />
                ))}
            </GoogleMap>
        );
    }

    componentDidMount() {
        fetch("/api/events")
            .then(response => response.json())
            .then(dataResponse => this.setState({ data: dataResponse }));
    }

    render() {
        const WrappedMap = withScriptjs(withGoogleMap(this.renderMap));

        return (
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.MIX_REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: "100%" }}></div>}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}
