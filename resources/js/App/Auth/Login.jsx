import React from 'react';
import Menu from "../Components/Menu.jsx";
import LoginForm from "./LoginForm.jsx";

export default class Login extends React.Component {
    
    render() {
      return (
          <>
            <div className="auth-container">
              <Menu />
              <LoginForm />
            </div>
          </>
        )
    }
}