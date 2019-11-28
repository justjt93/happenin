import React from 'react';
import EventButtons from "./EventButtons.jsx"

const UserEvents = (props) => {

  const {user, userEvents} = props
  
  const events = userEvents.length === 0 ?
  <p>No events created by {user.name}</p>
  :
  
  userEvents.map(event =>(
    <div className="eventItem" key={event.id}>
      <h3 className="eventTitle">{event.title}</h3>
      <p className="eventAddress">{event.address}</p>
      <p className="eventDescription">{event.description}</p>
      <EventButtons
      event={event}
      />
    </div>
  ))
 
  
    
      return (
          <>
          
          <div className="userEvents">
            <h2>Your active events</h2>
            <div className="notice"><h5>You can edit or delete all events that you added</h5></div>
            {events}
          </div>
          </>
        )
}

export default UserEvents