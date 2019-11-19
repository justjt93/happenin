import React, {useState} from 'react';
import { Button } from 'reactstrap';

const EventButtons = (props) => {
  const [displayDeletePopup, setDisplayDeletePopup] = useState("none")
      
  const {event} = props;

  const handleDeleteClick = () => {
    displayDeletePopup === "none" ? setDisplayDeletePopup("flex") : setDisplayDeletePopup("none");
  }

  const confirmDelete = () => {
    fetch(`/events/destroy/${event.id}`, {
      method: 'POST',
      headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
    })
    .then(response => console.log(response))
    .then(location.reload())
  }

  return (
      <>
      <div className="eventBtns">
        <Button color="success" href={`events/edit/${event.id}`}>Edit</Button>
        <Button color="danger" onClick={handleDeleteClick}>Delete</Button>
      </div>
      <div className="deleteEventPopup" style={{display: displayDeletePopup}}>
          <div className="closeDeletePopup" onClick={handleDeleteClick}>X</div>
          <p>Are you sure you want to delete this event?</p>
          <Button color="danger" onClick={confirmDelete}>Yes</Button>
          <Button color="success" onClick={handleDeleteClick}>No</Button>
      </div>
      </>
    )
}

export default EventButtons