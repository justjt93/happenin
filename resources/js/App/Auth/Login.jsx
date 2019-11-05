import React from 'react';
import Menu from "../Components/Menu.jsx";
import LoginForm from "./LoginForm.jsx";

export default class Login extends React.Component {
    
    render() {
      return (
          <>
              <Menu />
              <div className="form-container">
                <LoginForm />
              </div>
              
          </>
        )
    }
}