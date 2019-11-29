import React, { useState, useEffect } from "react";
import mapstyle from "./mapstyle";
import BigDetail from "./BigDetail.jsx";
import AddBtn from "./AddBtn.jsx";

import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

function renderMap(props) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/events")
            .then(res => res.json())
            .then(res => {
                setData(res);
            });
    }, []);

    const handleMoreInfoClick = () => {
        props.setBigDetailOpen(selectedEvent);
        console.log("selectedEvent", selectedEvent)
        setSelectedEvent(null);
    };

    //star rating
    const emptyStar = "far fa-star";
    const fullStar = "fas fa-star full";
    const halfStar = "fas fa-star-half-alt full";
    
    const starRating = avgRating => {
        let remainingRating = avgRating;
        const stars = [];

        for (let i = 0; i < 5; i += 1) {
            if (remainingRating > 1) {
                stars.push(fullStar);
                remainingRating -= 1;
            } else if (remainingRating === 0.5) {
                stars.push(halfStar);
                remainingRating -= 0.5;
            } else {
                stars.push(emptyStar);
            }
        }

        return (
            <div className="star-rating">
                {stars.map((star, index) => {
                    return <i className={star} key={index}></i>;
                })}
            </div>
        );
    };

    return (
        <>
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
                    <div className="infobox-wrap">
                        <h2>{selectedEvent.title}</h2>
                        <p className="infobox-address">
                            {selectedEvent.address}
                        </p>
                        <hr />

                        <p className="infobox-eventdesc">
                            {selectedEvent.description}
                        </p>
                        <div className="infobox-ratingbtn-wrap">
                            <div className="event-rating">
                                Rating:{" "}
                                {selectedEvent.ratings.length !== 0
                                ? starRating(Math.round(selectedEvent.avg_rating * 2) / 2) //round to nearest .5
                                : "no ratings"}
                            </div>
                            <button
                                className="moreInfoBtn"
                                onClick={handleMoreInfoClick}
                            >
                                more info
                            </button>
                        </div>
                    </div>
                </InfoWindow>
            )}

            
        </GoogleMap>
        
        </>
    );
}

const MapWrapper =(props) => {

    const WrappedMap = withScriptjs(withGoogleMap(renderMap));

    return (
<WrappedMap     
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.MIX_REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: "100%" }}></div>}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                setBigDetailOpen={props.setBigDetailOpen}
            />
    )
}

export default function Map (props) {
    const [bigDetailOpen, setBigDetailOpen] = useState(null);

    
        
        return (
            <>
            <MapWrapper setBigDetailOpen={setBigDetailOpen}/>
            <AddBtn />
           
                    <BigDetail
                        setBigDetailOpen={setBigDetailOpen}
                        bigDetailOpen={bigDetailOpen}
                    />
          
            </>
        );

}
