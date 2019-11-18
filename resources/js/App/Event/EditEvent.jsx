import React from 'react';
import Menu from "../Components/Menu.jsx";
import EditEventForm from "./EditEventForm";

 const EditEvent = () => {

  const event = (JSON.parse(document.querySelector('meta[name="edited-event"]').getAttribute('content')));

  return (
      <>
        <Menu />
        <div className="auth-container">
          <EditEventForm
          event={event}
          />
        </div>
      </>
  )
}

export default EditEvent