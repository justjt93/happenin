import React from 'react';
import { Button } from 'reactstrap';

const UserEvents = (props) => {

  const {user, userEvents} = props

  console.log(userEvents);
  

  const events = userEvents.length === 0 ?
  <p>no events created by {user.name}</p>
  :
  userEvents.map(event =>(
    <div className="eventItem" key={event.id}>
      <p className="eventTitle">{event.title}</p>
      <p className="eventDescription">{event.description}</p>
      <div className="eventBtns">
        <Button color="success">Edit</Button>
        <Button color="danger">Delete</Button>
      </div>
      
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