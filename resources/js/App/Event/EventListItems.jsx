import React, { useEffect } from "react";
import { Spinner } from "reactstrap";
import EventItem from "./EventItem.jsx";

const EventListItems = props => {
    const { data } = props;


    return (
        <>
            {data ? (
                data.data.map((event, index) => {
                    return (
                        <EventItem
                        event={event}
                        key={index}
                        />
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
