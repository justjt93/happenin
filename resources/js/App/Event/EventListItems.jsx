import React, { useEffect } from "react";
import { Spinner } from "reactstrap";

const EventListItems = props => {
    const { data } = props;

    //star rating constants
    const emptyStar =  "far fa-star";
    const fullStar = "fas fa-star full";
    const halfStar = "fas fa-star-half-alt full";

    useEffect(() => {
        // console.log(data);
    });

   //logic for adding star ratings
    const starRating = (avgRating) => {
        let remainingRating = avgRating;
        const stars = [];
        
        for (let i = 0; i < 5; i+= 1) {
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
    }

    return (
        <>
            {data ? (
                data.data.map(event => {
                    return (
                        <div
                            className={`event-list-item type-${event.type_id}`}
                            key={event.id}
                        >
                            <div
                                className={`event-cover event-cover-${event.type_id}`}
                            >
                                <div className="event-cover-title">
                                    {event.title}
                                </div>
                                <div className="event-cover-address">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div>{event.address}</div>
                                </div>
                                <div className="event-timeframe">
                                    <i className="fas fa-clock"></i>
                                    <div>{event.starts_at}</div>
                                    <div>-</div>
                                    <div>{event.ends_at}</div>
                                </div>
                            </div>
                            <div
                                className="event-image"
                                style={{
                                    backgroundImage: `url(${
                                        event.images.length !== 0
                                            ? event.images[0].url
                                            : "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"
                                    })`
                                }}
                            ></div>
                            <div className="event-title">{event.title}</div>
                            <div className="event-rating">
                                Rating:{" "}
                                {event.ratings.length !== 0
                                    ? starRating(Math.round(event.avg_rating * 2) / 2) //round to nearest .5
                                    : "no ratings"}
                            </div>
                            <div className="event-address">{event.address}</div>
                        </div>
                    );
                })
            ) : (
                <div>
                    <Spinner color="dark" />
                    <br />
                </div>
            )}
        </>
    );
};

export default EventListItems;
