import React, { useState, useEffect } from "react";
import mapstyle from "./mapstyle";
import BigDetail from "./BigDetail.jsx";

import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

function renderMap() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [bigDetailOpen, setBigDetailOpen] = useState(null);
    const [data, setData] = useState([]);

    // async function fetchData() {
    //     const res = await fetch("/api/events");
    //     res.json().then(dataResponse => {
    //         setData(dataResponse);
    //     });
    // }

    useEffect(() => {
        fetch("/api/events")
            .then(res => res.json())
            .then(res => {
                setData(res);
            });
    }, []);

    const handleMoreInfoClick = () => {
        setBigDetailOpen(selectedEvent);
        setSelectedEvent(null);
        // console.log("more info", selectedEvent.id);
    };

    return (
        <GoogleMap
            defaultZoom={13}
            maxZoom={14}
            defaultCenter={{ lat: 50.094758, lng: 14.415807 }}
            defaultOptions={{
                styles: mapstyle,
                streetViewControl: false,
                maxZoom: 18,
                minZoom: 12
            }}
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
                        scaledSize: new window.google.maps.Size(43, 55)
                    }}
                />
            ))}

            {selectedEvent && (
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedEvent.latitude),
                        lng: parseFloat(selectedEvent.longitude)
                    }}
                    onCloseClick={() => {
                        setSelectedEvent(null);
                    }}
                    defaultOptions={{ disableAutoPan: true }}
                    options={{ pixelOffset: new google.maps.Size(0, -55) }}
                >
                    <div className='infobox-wrap'>
                        <h2>{selectedEvent.title}</h2>
                        <p className='infobox-address'>
                            {selectedEvent.address}
                        </p>
                        <hr />

                        <p className='infobox-eventdesc'>
                            {selectedEvent.description}
                        </p>
                        <div className='infobox-ratingbtn-wrap'>
                            <p>10/10 bus drivers recommend</p>
                            <button
                                className='moreInfoBtn'
                                onClick={handleMoreInfoClick}
                            >
                                more info
                            </button>
                        </div>
                    </div>
                </InfoWindow>
            )}

            {bigDetailOpen && (
                <>
                    <BigDetail
                        setBigDetailOpen={setBigDetailOpen}
                        bigDetailOpen={bigDetailOpen}
                    />
                </>
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
