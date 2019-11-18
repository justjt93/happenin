import React from 'react';
import EventButtons from "./EventButtons.jsx"

const UserEvents = (props) => {

  const {user, userEvents} = props
  
  const events = userEvents.length === 0 ?
  <p>no events created by {user.name}</p>
  :
  userEvents.map(event =>(
    <div className="eventItem" key={event.id}>
      <p className="eventTitle">{event.title}</p>
      <p className="eventDescription">{event.description}</p>
      <EventButtons
      event={event}
      />
    </div>
  ))
  
    
      return (
          <>
          
          <div className="userEvents">
            <h2>Your active events:</h2>
            {events}
          </div>
          </>
        )
}

export default UserEvents