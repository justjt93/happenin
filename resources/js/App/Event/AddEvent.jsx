import React from 'react';
import Menu from "../Components/Menu.jsx";
import AddEventForm from "./AddEventForm";

export default class AddEvent extends React.Component {
    
    render() {
      return (
          <>
              <Menu />
              <div className="auth-container">
                <AddEventForm />
              </div>
              
          </>
        )
    }
}