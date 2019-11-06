import React from 'react';
import Menu from "../Components/Menu.jsx";
import RegForm from "./RegForm.jsx";

export default class Register extends React.Component {
    
    render() {
      return (
          <>
            <div className="auth-container">
              <Menu />
              <RegForm />
            </div>
              
              
          </>
        )
    }
}