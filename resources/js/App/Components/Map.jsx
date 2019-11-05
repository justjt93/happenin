import React, { useState, useEffect } from "react";
import mapstyle from './mapstyle';
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

function renderMap() {
 
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [data, setData] = useState([]);

    async function fetchData() {
        const res = await fetch("/api/events");
        res.json().then(dataResponse => {
            setData(dataResponse);
        });
    }

    useEffect(() => {
        if(data.length < 2) {
            fetchData();
        }
    }, [data]);

    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: 50.094758, lng: 14.415807 }}
            defaultOptions={{styles: mapstyle}}
        >
            {data.map(event => (
                <Marker
                    key={event.id}
                    position={{
                        lat: parseFloat(event.latitude),
                        lng: parseFloat(event.longitude)
                    }}
                    onClick={() => {
                        setSelectedEvent(event);
                    }}
                    icon={{
                        url: `./images/${event.type_id}.png`,
                        scaledSize: new window.google.maps.Size(25,25)
                    }}
                />
            ))}

            {selectedEvent && (
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedEvent.latitude),
                        lng: parseFloat(selectedEvent.longitude)
                    }
                }
                onCloseClick={() => {
                    setSelectedEvent(null);
                }}
                >
                    <div>
                        <h2>{selectedEvent.title}</h2>
                        <p>{selectedEvent.address}</p>
                        <hr/>
                        <p>{selectedEvent.description}</p>
                        <button>more info</button>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

export default class Map extends React.Component {
    render() {
        const WrappedMap = withScriptjs(withGoogleMap(renderMap));

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
