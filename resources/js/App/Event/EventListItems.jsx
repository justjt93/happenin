import React, {useEffect} from 'react';
import { Spinner } from 'reactstrap';

 const EventListItems = (props) => {
    const {data} = props;
  
    useEffect(() => {
      // console.log(data);
    });

  return (
      <>
        {data ? data.data.map(event => {
          return (

            <div className={`event-list-item type-${event.type_id}`} key={event.id}>
              <div className={`event-cover event-cover-${event.type_id}`}>
                <div className="event-cover-title">{event.title}</div>
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
              <div className="event-image" style={{backgroundImage: `url(${event.images.length !== 0 ? event.images[0].url : "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"})`}}></div>
              <div className="event-title">
                {event.title}
              </div>
              <div className="event-rating">
                Rating: {event.ratings.length !== 0 ? 
                "yes ratings"
                : 
                "no ratings"}
              </div>
              <div className="event-address">
                {event.address}
              </div> 
            </div>
            
          )
        }) : <div><Spinner color="dark" /><br/></div>}
      </>
  )
}

export default EventListItems