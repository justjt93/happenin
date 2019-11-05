import React from 'react';
import Menu from "../Components/Menu.jsx";
import RegForm from "./RegForm.jsx";

export default class Register extends React.Component {
    
    render() {
      return (
          <>
              <Menu />
              <div className="form-container">
                <RegForm />
              </div>
              
          </>
        )
    }
}